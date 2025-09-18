
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  limit as firestoreLimit,
  addDoc,
  where,
  onSnapshot,
  updateDoc,
  increment,
  deleteDoc,
  serverTimestamp,
  writeBatch,
  Timestamp,
  orderBy,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Listing, User, Advertisement, Conversation, Message } from "@/lib/types";
import { placeholderImages } from "@/lib/placeholder-images";
import type { User as FirebaseUser } from "firebase/auth";
import { mockEvents, mockRestaurantsData, mockPropertyData, mockProviderData, mockClinicData, mockInsuranceData } from './mock-data';


// Seed the database
export async function seedDatabase() {
    const listingsRef = collection(db, "listings");
    const listingsSnapshot = await getDocs(query(listingsRef, firestoreLimit(1)));
  
    if (!listingsSnapshot.empty) {
        return;
    }
  
    console.log("Seeding database with new product data...");
    const batch = writeBatch(db);
    
    // Placeholder for new seed data if any
    const newSeedData: any[] = [];

    newSeedData.forEach((product, index) => {
      const docRef = doc(listingsRef);
      batch.set(docRef, {
        title: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category: "Product",
        location: "Nairobi",
        imageUrl: `https://picsum.photos/seed/seed${index}/600/400`,
        imageHint: "product image",
        sellerId: "gmaina424@gmail.com",
        postedAt: serverTimestamp(),
      });
    });
  
    await batch.commit();
    console.log(`Seeded ${newSeedData.length} listings.`);
}

export async function getListings(options: { limit?: number; category?: string; sellerId?: string } = {}): Promise<Listing[]> {
  const listingsCol = collection(db, "listings");
  const queries = [];
  if (options.limit) {
    queries.push(firestoreLimit(options.limit));
  }
  if (options.category) {
    queries.push(where("category", "==", options.category));
  }
   if (options.sellerId) {
    queries.push(where("sellerId", "==", options.sellerId));
  }

  const q = query(listingsCol, ...queries, orderBy("postedAt", "desc"));
  const listingsSnapshot = await getDocs(q);
  const listingsList = await Promise.all(
    listingsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const seller = await getUserData(data.sellerId);
      
      const postedAt = data.postedAt;
      let postedAtString: string;
      if (postedAt instanceof Timestamp) {
        postedAtString = postedAt.toDate().toISOString();
      } else if (typeof postedAt === 'string') {
        postedAtString = postedAt;
      }
      else {
        postedAtString = new Date().toISOString();
      }

      return {
        id: doc.id,
        ...data,
        postedAt: postedAtString,
        seller,
      } as Listing;
    })
  );
  return listingsList;
}

export async function getListingById(id: string): Promise<Listing | null> {
    if (!id) return null;
    const listingDocRef = doc(db, "listings", id);
    const listingDoc = await getDoc(listingDocRef);

    if (!listingDoc.exists()) {
        return null;
    }
    const data = listingDoc.data();
    const seller = await getUserData(data.sellerId);
    
    let postedAtString: string;
    const postedAt = data.postedAt;
    if (postedAt instanceof Timestamp) {
        postedAtString = postedAt.toDate().toISOString();
    } else if (typeof postedAt === 'string') {
        postedAtString = postedAt;
    } else {
        postedAtString = new Date().toISOString();
    }

    return { 
        id: listingDoc.id, 
        ...data, 
        postedAt: postedAtString,
        seller 
    } as Listing;
}


export async function createListing(data: Partial<Listing>, userId: string, imageFile: File | null): Promise<string> {
    const storage = getStorage();
    let imageUrl = placeholderImages.product1.imageUrl;
    let imageHint = placeholderImages.product1.imageHint;

    if (imageFile) {
        const storageRef = ref(storage, `listings/${userId}/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
        imageHint = "product image";
    }

    const docRef = await addDoc(collection(db, 'listings'), {
        ...data,
        sellerId: userId,
        imageUrl,
        imageHint,
        postedAt: serverTimestamp()
    });
    return docRef.id;
}

export async function updateListing(listingId: string, data: Partial<Listing>, imageFile: File | null) {
    const listingRef = doc(db, "listings", listingId);
    let updateData: Partial<Listing> = { ...data };

    if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `listings/${listingId}/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        updateData.imageUrl = await getDownloadURL(snapshot.ref);
    }
    await updateDoc(listingRef, updateData);
}

export async function deleteListing(listingId: string): Promise<void> {
    await deleteDoc(doc(db, "listings", listingId));
}

// User Functions
export async function getAllUsers(): Promise<User[]> {
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);
    return Promise.all(usersSnapshot.docs.map(async (doc) => {
        const userData = await getUserData(doc.id);
        return userData as User;
    }));
}


export async function getUserData(userId: string): Promise<User | null> {
    if (!userId) return null;
    const userDocRef = doc(db, "users", userId);
    try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
            let memberSince: string;
            const memberSinceData = data.memberSince;

            if (memberSinceData instanceof Timestamp) {
                memberSince = memberSinceData.toDate().toISOString();
            } else if (typeof memberSinceData === 'string') {
                memberSince = memberSinceData;
            } else {
                memberSince = new Date().toISOString();
            }

            return {
                id: userId,
                name: data.name || 'Anonymous',
                email: data.email,
                avatarUrl: data.photoURL || `https://picsum.photos/seed/${userId}/100/100`,
                location: data.location || 'Kenya',
                memberSince: memberSince,
                rating: data.rating || 0,
                reviews: data.reviews || 0,
                status: data.status || 'Active',
                type: data.type || 'Client',
            } as User;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user data for ID:", userId, error);
        return null;
    }
}


export async function addUserData(user: FirebaseUser, additionalData: { name?: string | null }) {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        await setDoc(userRef, {
            email: user.email,
            name: additionalData.name || user.displayName || 'Anonymous',
            photoURL: user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
            memberSince: serverTimestamp(),
            status: 'Active',
            type: 'Client'
        });
    }
}

export async function updateUserData(userId: string, data: Partial<User>) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, data);
}

export async function deleteUserAccount(userId: string): Promise<void> {
    await deleteDoc(doc(db, "users", userId));
}


// Advertisement functions
export async function getAdvertisements(options: { activeOnly?: boolean } = {}): Promise<Advertisement[]> {
    const adsCol = collection(db, "advertisements");
    const queries = [];
    if(options.activeOnly) {
        queries.push(where("isActive", "==", true));
    }
    const q = query(adsCol, ...queries, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Advertisement));
}

export async function getAdvertisementById(id: string): Promise<Advertisement | null> {
    const docRef = doc(db, 'advertisements', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        } as Advertisement;
    }
    return null;
}

export async function createAdvertisement(data: Pick<Advertisement, 'title' | 'description' | 'isActive'>, imageFile: File) {
    const storage = getStorage();
    const storageRef = ref(storage, `advertisements/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, 'advertisements'), {
        ...data,
        imageUrl,
        imageHint: 'promotional banner',
        createdAt: serverTimestamp()
    });
}

export async function updateAdvertisement(adId: string, data: Partial<Advertisement>, imageFile: File | null) {
    const adRef = doc(db, 'advertisements', adId);
    let updateData: Partial<Advertisement> = { ...data };

    if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `advertisements/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        updateData.imageUrl = await getDownloadURL(snapshot.ref);
    }
    
    await updateDoc(adRef, updateData);
}

export async function updateAdvertisementStatus(adId: string, isActive: boolean) {
    const adRef = doc(db, "advertisements", adId);
    await updateDoc(adRef, { isActive });
}

export async function deleteAdvertisement(adId: string) {
    await deleteDoc(doc(db, "advertisements", adId));
}

// MOCK DATA FETCHERS
export async function getEvents() { return mockEvents; }
export async function getEventById(id: string) { return mockEvents.find(e => e.id === id) || null; }

export async function getRestaurants() { 
    return Object.values(mockRestaurantsData); 
}
export async function getRestaurantById(id: string) { return mockRestaurantsData[id] || null; }

export async function getProperties() { return Object.values(mockPropertyData) }
export async function getPropertyById(id: string) { return mockPropertyData[id] || null; }

export async function getServices() { return Object.values(mockProviderData) }
export async function getServiceById(id: string) { return mockProviderData[id] || null; }

export async function getClinics() { return Object.values(mockClinicData); }
export async function getClinicById(id: string) { return mockClinicData[id] || null; }

export async function getInsurances() { return Object.values(mockInsuranceData); }

// Cart Functions
export function getCartItems(userId: string, callback: (items: (Listing & { quantity: number })[]) => void) {
    const cartRef = collection(db, "users", userId, "cart");
    
    return onSnapshot(cartRef, async (snapshot) => {
        const items: (Listing & { quantity: number })[] = [];
        for (const cartDoc of snapshot.docs) {
            const listing = await getListingById(cartDoc.id);
            if (listing) {
                items.push({ ...listing, quantity: cartDoc.data().quantity });
            }
        }
        callback(items);
    });
}

export async function addToCart(userId: string, listingId: string) {
    const cartItemRef = doc(db, "users", userId, "cart", listingId);
    const docSnap = await getDoc(cartItemRef);

    if (docSnap.exists()) {
        await updateDoc(cartItemRef, {
            quantity: increment(1)
        });
    } else {
        await setDoc(cartItemRef, {
            quantity: 1,
            addedAt: serverTimestamp()
        });
    }
}

export async function updateCartItemQuantity(userId: string, listingId: string, quantity: number) {
    const cartItemRef = doc(db, "users", userId, "cart", listingId);
    if (quantity > 0) {
        await updateDoc(cartItemRef, { quantity });
    } else {
        await deleteDoc(cartItemRef);
    }
}

export async function removeCartItem(userId: string, listingId: string) {
    const cartItemRef = doc(db, "users", userId, "cart", listingId);
    await deleteDoc(cartItemRef);
}

export async function clearCart(userId: string) {
    const cartRef = collection(db, "users", userId, "cart");
    const snapshot = await getDocs(cartRef);
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
}


// Order Functions
export async function createOrder(userId: string, items: (Listing & { quantity: number})[], total: number) {
    const ordersRef = collection(db, "users", userId, "orders");
    await addDoc(ordersRef, {
        createdAt: serverTimestamp(),
        items: items.map(item => ({ id: item.id, title: item.title, price: item.price, quantity: item.quantity })),
        total,
        status: 'Pending'
    });
}


// Wishlist Functions
export function getWishlistItems(userId: string, callback: (itemIds: Set<string>) => void) {
    const userRef = doc(db, "users", userId);
    return onSnapshot(userRef, (doc) => {
        const userData = doc.data();
        callback(new Set(userData?.wishlist || []));
    });
}

export async function addToWishlist(userId: string, listingId: string) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        wishlist: arrayUnion(listingId)
    });
}

export async function removeFromWishlist(userId: string, listingId: string) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        wishlist: arrayRemove(listingId)
    });
}

// Conversation and Message Functions
export function getConversations(userId: string, callback: (conversations: Conversation[]) => void) {
  const q = query(
    collection(db, 'conversations'),
    where('participantIds', 'array-contains', userId),
    orderBy('updatedAt', 'desc')
  );

  return onSnapshot(q, async (querySnapshot) => {
    const convos: Conversation[] = [];
    for (const convDoc of querySnapshot.docs) {
      const data = convDoc.data();
      
      const participants: { [key: string]: Pick<User, 'name' | 'avatarUrl'> } = {};
      for (const pId of data.participantIds) {
        const user = await getUserData(pId);
        if (user) {
          participants[pId] = { name: user.name, avatarUrl: user.avatarUrl };
        }
      }

      const listing = await getListingById(data.listingId);

      const lastMessage = data.lastMessage ? {
          ...data.lastMessage,
          createdAt: data.lastMessage.createdAt instanceof Timestamp ? data.lastMessage.createdAt : Timestamp.now()
      } : null;

      convos.push({
        id: convDoc.id,
        participantIds: data.participantIds,
        listingId: data.listingId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        listing: { title: listing?.title || 'Unknown Listing' },
        participants,
        lastMessage,
      } as Conversation);
    }
    callback(convos);
  });
}


export function getMessages(conversationId: string, callback: (messages: Message[]) => void) {
  const messagesCol = collection(db, 'conversations', conversationId, 'messages');
  const q = query(messagesCol, orderBy('createdAt', 'asc'));

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt || Timestamp.now(),
      } as Message
    });
    callback(messages);
  });
}

export async function sendMessage(conversationId: string, senderId: string, text: string, participantIds: string[]) {
  const messagesCol = collection(db, 'conversations', conversationId, 'messages');
  const now = serverTimestamp();
  await addDoc(messagesCol, {
    senderId,
    text,
    createdAt: now,
  });

  const convoRef = doc(db, 'conversations', conversationId);
  await updateDoc(convoRef, {
    lastMessage: {
      text,
      senderId,
      createdAt: now,
    },
    updatedAt: now,
  });
}
