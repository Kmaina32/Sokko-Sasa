

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
  getCountFromServer,
} from "firebase/firestore";
import type { Listing, User, Advertisement, Conversation, Message, Event, TicketType, Restaurant, MenuItem, Property, ServiceProvider, Clinic, InsuranceProvider } from "@/lib/types";
import { placeholderImages } from "@/lib/placeholder-images";
import type { User as FirebaseUser } from "firebase/auth";
import { mockPropertyData, mockProviderData, mockClinicData, mockInsuranceData, mockDriverData } from './mock-data';

// Helper function to convert a File to a Base64 data URI
const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}


// Seed the database
export async function seedDatabase() {
    const listingsRef = collection(db, "listings");
    const listingsSnapshot = await getDocs(query(listingsRef, firestoreLimit(4)));
  
    if (listingsSnapshot.docs.length >= 4) {
        console.log("Database already has sufficient listings. Skipping seed.");
        return;
    }
  
    console.log("Seeding database with new data for gmaina424@gmail.com...");
    const batch = writeBatch(db);
    const adminUserId = "SeederAdminID"; // A placeholder ID for the admin user

    // Create a mock admin user doc for relationships
    const userRef = doc(db, "users", adminUserId);
    batch.set(userRef, {
        email: "gmaina424@gmail.com",
        name: "G Maina (Admin)",
        photoURL: `https://picsum.photos/seed/${adminUserId}/100/100`,
        memberSince: serverTimestamp(),
        status: 'Active',
        type: 'Admin'
    });
    
    // Seed Listings
    const listingsToSeed = [
        { title: "Hand-carved Wooden Elephant", price: 2500, image: placeholderImages.product1 },
        { title: "Sisal Kiondo Basket", price: 1500, image: placeholderImages.product2 },
        { title: "Maasai Shuka Blanket", price: 1800, image: placeholderImages.product3 },
        { title: "Beaded Leather Sandals", price: 2200, image: placeholderImages.product4 },
    ];

    listingsToSeed.forEach((listing) => {
      const docRef = doc(collection(db, "listings"));
      batch.set(docRef, {
        title: listing.title,
        description: `A high-quality, authentic ${listing.title.toLowerCase()}. Perfect as a gift or for personal use. Handcrafted with care by local artisans.`,
        price: listing.price,
        category: "Product",
        location: "Nairobi",
        imageUrl: listing.image.imageUrl,
        imageHint: listing.image.imageHint,
        sellerId: adminUserId, // Link to the admin seeder ID
        postedAt: serverTimestamp(),
      });
    });

    // Seed Services
    Object.values(mockProviderData).forEach(provider => {
        const docRef = doc(collection(db, "services"));
         batch.set(docRef, provider);
    });

    // Seed a Driver user
    const driverRef = doc(collection(db, 'users'));
    batch.set(driverRef, mockDriverData);
  
    await batch.commit();
    console.log(`Seeded ${listingsToSeed.length} listings and other data.`);
}

export async function getListings(options: { limit?: number; category?: string; sellerId?: string } = {}): Promise<Listing[]> {
  const listingsCol = collection(db, "listings");
  const queries = [];
  
  if (options.category) {
    queries.push(where("category", "==", options.category));
  }
  if (options.sellerId) {
    queries.push(where("sellerId", "==", options.sellerId));
  }
  
  // Combine all queries
  let combinedQuery = query(listingsCol, ...queries);
  
  // Add sorting if not filtering by sellerId, as that requires a different approach
  if (!options.sellerId) {
      combinedQuery = query(combinedQuery, orderBy("postedAt", "desc"));
  }

  const listingsSnapshot = await getDocs(combinedQuery);
  
  let listingsList = await Promise.all(
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

  // Manually sort by date after fetching if we filtered by sellerId
  if (options.sellerId) {
    listingsList.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }

  // Manually apply limit after fetching and sorting
  if (options.limit) {
    listingsList = listingsList.slice(0, options.limit);
  }

  return listingsList;
}

export async function getListingById(id: string): Promise<Listing | null> {
    if (!id) return null;
    const listingDocRef = doc(db, "listings", id);
    const listingDoc = await getDoc(listingDocRef);

    if (!listingDoc.exists()) {
        const foodListingId = Object.keys(placeholderImages).find(key => key.startsWith('food') && id.includes(placeholderImages[key].description.replace(/\s+/g, '-')));
        if (foodListingId) {
             const foodItem = placeholderImages[foodListingId];
             return {
                id,
                title: foodItem.description,
                price: Math.floor(Math.random() * 500) + 200,
                category: "Product",
                imageUrl: foodItem.imageUrl,
                imageHint: foodItem.imageHint,
                description: `A delicious ${foodItem.description}.`,
                location: 'Nairobi',
                sellerId: 'system',
                postedAt: new Date().toISOString(),
             } as Listing;
        }
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
    let imageUrl = placeholderImages.product1.imageUrl;
    let imageHint = placeholderImages.product1.imageHint;

    if (imageFile) {
        imageUrl = await fileToDataUri(imageFile);
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
        updateData.imageUrl = await fileToDataUri(imageFile);
    }
    await updateDoc(listingRef, updateData as any);
}

export async function deleteListing(listingId: string): Promise<void> {
    await deleteDoc(doc(db, "listings", listingId));
}

// User Functions
export async function getAllUsers(): Promise<User[]> {
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);
    return usersSnapshot.docs.map((doc) => {
        const data = doc.data();
        let memberSince: string;
        const memberSinceData = data.memberSince;

        if (memberSinceData && typeof memberSinceData.toDate === 'function') {
            memberSince = memberSinceData.toDate().toISOString();
        } else if (typeof memberSinceData === 'string') {
            memberSince = memberSinceData;
        } else {
            memberSince = new Date().toISOString();
        }

        return {
            id: doc.id,
            name: data.name || 'Anonymous',
            email: data.email,
            avatarUrl: data.photoURL || `https://picsum.photos/seed/${doc.id}/100/100`,
            location: data.location || 'Kenya',
            memberSince: memberSince,
            rating: data.rating || 0,
            reviews: data.reviews || 0,
            status: data.status || 'Active',
            type: data.type || 'Client',
        } as User;
    });
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

            if (memberSinceData && typeof memberSinceData.toDate === 'function') {
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
    await updateDoc(userRef, data as any);
}

export async function deleteUserAccount(userId: string): Promise<void> {
    await deleteDoc(doc(db, "users", userId));
}


// Advertisement functions
export async function getAdvertisements(options: { activeOnly?: boolean } = {}): Promise<Advertisement[]> {
    const adsCol = collection(db, "advertisements");
    const q = query(adsCol, orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    
    let ads = snapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt;
        return { 
            id: doc.id, 
            ...data,
            createdAt: createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : new Date().toISOString(),
        } as Advertisement;
    });

    if (options.activeOnly) {
        ads = ads.filter(ad => ad.isActive);
    }

    return ads;
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
    const imageUrl = await fileToDataUri(imageFile);

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
        updateData.imageUrl = await fileToDataUri(imageFile);
    }
    
    await updateDoc(adRef, updateData as any);
}

export async function updateAdvertisementStatus(adId: string, isActive: boolean) {
    const adRef = doc(db, "advertisements", adId);
    await updateDoc(adRef, { isActive });
}

export async function deleteAdvertisement(adId: string) {
    await deleteDoc(doc(db, "advertisements", adId));
}

// Event Functions
export async function getEvents(): Promise<Event[]> {
  const eventsCol = collection(db, "events");
  const q = query(eventsCol, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = data.createdAt;
      const date = data.date;
      return { 
          id: doc.id,
          ...data,
          createdAt: createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : new Date().toISOString(),
          date: date instanceof Timestamp ? date.toDate().toISOString() : date,
      } as Event;
  });
}

export async function getEventById(id: string): Promise<Event | null> {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    const createdAt = data.createdAt;
    const date = data.date;
    return {
        id: docSnap.id,
        ...data,
        createdAt: createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : new Date().toISOString(),
        date: date instanceof Timestamp ? date.toDate().toISOString() : date,
    } as Event;
}

export async function createEvent(data: Omit<Event, 'id' | 'createdAt' | 'imageUrl' | 'imageHint'>, imageFile: File): Promise<string> {
    const imageUrl = await fileToDataUri(imageFile);

    const eventData = {
        ...data,
        date: new Date(data.date), // Ensure date is a Timestamp
        imageUrl,
        imageHint: 'event promotion',
        createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "events"), eventData);
    return docRef.id;
}

export async function updateEvent(eventId: string, data: Partial<Omit<Event, 'id'>>, imageFile: File | null) {
    const eventRef = doc(db, "events", eventId);
    let updateData: any = { ...data };

    if (imageFile) {
        updateData.imageUrl = await fileToDataUri(imageFile);
    }
    
    if (data.date) {
        updateData.date = new Date(data.date);
    }

    await updateDoc(eventRef, updateData);
}

export async function deleteEvent(eventId: string): Promise<void> {
    await deleteDoc(doc(db, "events", eventId));
}

// Restaurant Functions
export async function getRestaurants(): Promise<Restaurant[]> {
    const col = collection(db, "restaurants");
    const q = query(col, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt;
        return {
            id: doc.id,
            ...data,
            createdAt: createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : new Date().toISOString(),
        } as Restaurant;
    });
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
    const docRef = doc(db, "restaurants", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    const createdAt = data.createdAt;
    return {
        id: docSnap.id,
        ...data,
        createdAt: createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : new Date().toISOString(),
    } as Restaurant;
}

export async function createRestaurant(data: Omit<Restaurant, 'id' | 'createdAt' | 'imageUrl' | 'imageHint' | 'rating'>, imageFile: File): Promise<string> {
    const imageUrl = await fileToDataUri(imageFile);

    const restaurantData = {
        ...data,
        imageUrl,
        imageHint: 'restaurant food',
        rating: Math.round((Math.random() * (5 - 3.5) + 3.5) * 10) / 10, // Random rating between 3.5 and 5
        createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "restaurants"), restaurantData);
    return docRef.id;
}

export async function updateRestaurant(restaurantId: string, data: Partial<Omit<Restaurant, 'id'>>, imageFile: File | null) {
    const restaurantRef = doc(db, "restaurants", restaurantId);
    let updateData: any = { ...data };

    if (imageFile) {
        updateData.imageUrl = await fileToDataUri(imageFile);
    }

    await updateDoc(restaurantRef, updateData);
}

export async function deleteRestaurant(restaurantId: string): Promise<void> {
    await deleteDoc(doc(db, "restaurants", restaurantId));
}

// REAL DATA FETCHERS
export async function getProperties(): Promise<Property[]> { return Object.values(mockPropertyData) }
export async function getPropertyById(id: string): Promise<Property | null> { return mockPropertyData[id] || null; }

export async function getServices(): Promise<ServiceProvider[]> { 
    const servicesCol = collection(db, "services");
    const snapshot = await getDocs(servicesCol);
    if (snapshot.empty) {
        return Object.values(mockProviderData);
    }
    return snapshot.docs.map(doc => doc.data() as ServiceProvider);
}
export async function getServiceById(id: string): Promise<ServiceProvider | null> { 
    const serviceDoc = await getDoc(doc(db, "services", id));
    if (serviceDoc.exists()) {
        return serviceDoc.data() as ServiceProvider;
    }
    return mockProviderData[id] || null;
}

export async function getClinics(): Promise<Clinic[]> { return Object.values(mockClinicData); }
export async function getClinicById(id: string): Promise<Clinic | null> { return mockClinicData[id] || null; }

export async function getInsurances(): Promise<InsuranceProvider[]> { return Object.values(mockInsuranceData); }

// Cart Functions
export function getCartItems(userId: string, callback: (items: (Listing & { quantity: number })[]) => void) {
    const cartRef = collection(db, "users", userId, "cart");
    
    return onSnapshot(cartRef, async (snapshot) => {
        const items: (Listing & { quantity: number })[] = [];
        for (const cartDoc of snapshot.docs) {
            // This is a temporary ID for a food item that is not a real listing
            if (cartDoc.id.includes('-')) {
                 items.push({
                    id: cartDoc.id,
                    ...cartDoc.data().itemDetails,
                    quantity: cartDoc.data().quantity,
                 } as Listing & { quantity: number });
            } else {
                const listing = await getListingById(cartDoc.id);
                if (listing) {
                    items.push({ ...listing, quantity: cartDoc.data().quantity });
                }
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

export async function updateCartItemQuantity(userId: string, listingId: string, quantity: number, itemDetails?: Partial<Listing>) {
    const cartItemRef = doc(db, "users", userId, "cart", listingId);
    if (quantity > 0) {
        const docSnap = await getDoc(cartItemRef);
        if (docSnap.exists()) {
            await updateDoc(cartItemRef, { quantity });
        } else {
             await setDoc(cartItemRef, { 
                quantity, 
                itemDetails, // Store details for non-listing items
                addedAt: serverTimestamp()
            });
        }
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
    where('participantIds', 'array-contains', userId)
  );

  return onSnapshot(q, async (querySnapshot) => {
    let convos: Conversation[] = [];
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
    
    // Sort conversations by updatedAt client-side
    convos.sort((a, b) => (b.updatedAt?.toMillis() ?? 0) - (a.updatedAt?.toMillis() ?? 0));
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


// Admin Dashboard Functions
export async function getAdminDashboardStats() {
    try {
        const usersCol = collection(db, "users");
        const listingsCol = collection(db, "listings");
        const eventsCol = collection(db, "events");
        const restaurantsCol = collection(db, "restaurants");

        const [userCount, listingCount, eventCount, restaurantCount] = await Promise.all([
            getCountFromServer(usersCol),
            getCountFromServer(listingsCol),
            getCountFromServer(eventsCol),
            getCountFromServer(restaurantsCol),
        ]);

        return {
            users: userCount.data().count,
            listings: listingCount.data().count,
            events: eventCount.data().count,
            restaurants: restaurantCount.data().count,
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return {
            users: 0,
            listings: 0,
            events: 0,
            restaurants: 0,
        };
    }
}
