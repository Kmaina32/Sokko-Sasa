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
  serverTimestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Listing, User } from "@/lib/types";
import { placeholderImages } from "@/lib/placeholder-images";
import type { User as FirebaseUser } from "firebase/auth";

// Seed data if the listings collection is empty
const seedDatabase = async () => {
  const listingsCollection = collection(db, "listings");
  const snapshot = await getDocs(query(listingsCollection, firestoreLimit(1)));
  if (snapshot.empty) {
    console.log("No listings found, seeding database...");
    const mockListings: Omit<Listing, "id" | "seller">[] = [
      {
        title: "Hand-carved Wooden Elephant",
        price: 2500,
        category: "Product",
        location: "Nairobi",
        imageUrl: placeholderImages.product1.imageUrl,
        imageHint: placeholderImages.product1.imageHint,
        description: `This beautiful hand-carved wooden elephant is a masterpiece of craftsmanship. Made from sustainably sourced jacaranda wood by skilled artisans in Kenya.`,
        sellerId: "seller1",
      },
      {
        title: "Sisal Kiondo Basket",
        price: 1200,
        category: "Product",
        location: "Mombasa",
        imageUrl: placeholderImages.product2.imageUrl,
        imageHint: placeholderImages.product2.imageHint,
        description: "A traditional sisal basket, handwoven by artisans. Perfect for shopping or as a decorative item.",
        sellerId: "seller2",
      },
      {
        title: "Maasai Shuka Blanket",
        price: 800,
        category: "Product",
        location: "Nakuru",
        imageUrl: placeholderImages.product3.imageUrl,
        imageHint: placeholderImages.product3.imageHint,
        description: "Authentic Maasai shuka, a versatile and vibrant piece of cloth.",
        sellerId: "seller1",
      },
      {
        title: "Beaded Leather Sandals",
        price: 1800,
        category: "Product",
        location: "Diani",
        imageUrl: placeholderImages.product4.imageUrl,
        imageHint: placeholderImages.product4.imageHint,
        description: "Handcrafted leather sandals with intricate beadwork, perfect for summer.",
        sellerId: "seller2",
      },
    ];

     const seedPromises = mockListings.map(async (listingData) => {
        const docRef = doc(collection(db, 'listings'));
        await setDoc(docRef, { ...listingData, id: docRef.id, createdAt: serverTimestamp() });
     });

     const mockUsers = [
         { id: 'seller1', name: 'Artisan Co.', email: 'artisan.co@example.com', avatarUrl: 'https://picsum.photos/seed/seller1/100/100', location: 'Nairobi, Kenya', memberSince: '2023-05-15', rating: 4.9, reviews: 213, type: 'Vendor', status: 'Active' },
         { id: 'seller2', name: 'Coastal Weavers', email: 'coastal.weavers@example.com', avatarUrl: 'https://picsum.photos/seed/seller2/100/100', location: 'Mombasa, Kenya', memberSince: '2022-11-20', rating: 4.7, reviews: 154, type: 'Vendor', status: 'Active' },
     ];
     
     const userPromises = mockUsers.map(user => {
         const userRef = doc(db, "users", user.id);
         return setDoc(userRef, {
             uid: user.id,
             displayName: user.name,
             email: user.email,
             photoURL: user.avatarUrl,
             location: user.location,
             memberSince: user.memberSince,
             rating: user.rating,
             reviews: user.reviews,
             type: user.type,
             status: user.status
         }, { merge: true });
     })

     await Promise.all([...seedPromises, ...userPromises]);
    console.log("Database seeded.");
  }
};

seedDatabase();


// USERS
export const addUserData = async (user: FirebaseUser, additionalData: any) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: additionalData.name,
    photoURL: user.photoURL,
    memberSince: new Date().toISOString(),
    status: 'Active',
    type: 'Client',
    ...additionalData,
  }, { merge: true });
};

export const getUserData = async (uid: string): Promise<User | null> => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists()){
        const userData = userSnap.data();
        return {
            id: userData.uid,
            name: userData.displayName,
            email: userData.email,
            avatarUrl: userData.photoURL ?? `https://picsum.photos/seed/${userData.uid}/100/100`,
            location: userData.location,
            memberSince: userData.memberSince,
            rating: userData.rating,
            reviews: userData.reviews,
            type: userData.type,
            status: userData.status,
        }
    }
    return null;
}

export const getAllUsers = async (): Promise<User[]> => {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);
    if(snapshot.empty) {
        return [];
    }
    const users = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: data.uid,
            name: data.displayName,
            email: data.email,
            avatarUrl: data.photoURL ?? `https://picsum.photos/seed/${data.uid}/100/100`,
            location: data.location,
            memberSince: data.memberSince,
            rating: data.rating,
            reviews: data.reviews,
            type: data.type,
            status: data.status,
        }
    });
    return users;
};


// LISTINGS
const uploadImage = async (file: File, path: string): Promise<string> => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

export const createListing = async (listingData: Omit<Listing, 'id' | 'sellerId' | 'imageUrl' | 'imageHint'>, userId: string, imageFile: File | null): Promise<string> => {
    const docRef = doc(collection(db, 'listings'));
    
    let imageUrl = 'https://picsum.photos/seed/placeholder/600/400';
    if (imageFile) {
        imageUrl = await uploadImage(imageFile, `listings/${docRef.id}/${imageFile.name}`);
    }

    await setDoc(docRef, {
        ...listingData,
        id: docRef.id,
        sellerId: userId,
        imageUrl: imageUrl,
        imageHint: 'user-uploaded product',
        createdAt: serverTimestamp(),
    });

    return docRef.id;
};

interface GetListingsOptions {
  limit?: number;
  sellerId?: string;
}

export const getListings = async (options: GetListingsOptions = {}): Promise<Listing[]> => {
  let q = query(collection(db, "listings"));

  if (options.sellerId) {
    q = query(q, where("sellerId", "==", options.sellerId));
  }
  
  if (options.limit) {
    q = query(q, firestoreLimit(options.limit));
  }
  
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return [];
  }

  const listings = await Promise.all(snapshot.docs.map(async (doc) => {
    const data = doc.data() as Listing;
    let seller;
    if(data.sellerId) {
       seller = await getUserData(data.sellerId);
    }
    return { ...data, id: doc.id, seller: seller ?? undefined };
  }));

  return listings;
};

export const getListingById = async (id: string): Promise<Listing | null> => {
  const docRef = doc(db, "listings", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data() as Listing;
    let seller;
    if(data.sellerId) {
       seller = await getUserData(data.sellerId);
    }
    return { ...data, id: docSnap.id, seller: seller ?? undefined };
  } else {
    return null;
  }
};


// CART
export const addToCart = async (userId: string, listingId: string) => {
    const cartRef = collection(db, 'users', userId, 'cart');
    const cartItemRef = doc(cartRef, listingId);
    const cartItemSnap = await getDoc(cartItemRef);

    if(cartItemSnap.exists()){
        await updateDoc(cartItemRef, {
            quantity: increment(1)
        });
    } else {
        await setDoc(cartItemRef, {
            listingId: listingId,
            quantity: 1,
            addedAt: serverTimestamp()
        })
    }
};

export const getCartItems = (userId: string, callback: (items: (Listing & {quantity: number})[]) => void) => {
    const cartRef = collection(db, 'users', userId, 'cart');
    
    return onSnapshot(cartRef, async (snapshot) => {
        if(snapshot.empty) {
            callback([]);
            return;
        }

        const items = await Promise.all(snapshot.docs.map(async (doc) => {
            const { listingId, quantity } = doc.data();
            const listing = await getListingById(listingId);
            return { ...listing, quantity } as Listing & { quantity: number };
        }));

        callback(items.filter(item => item.id)); // Filter out any items where listing might be null
    });
}

export const updateCartItemQuantity = async (userId: string, listingId: string, quantity: number) => {
    if(quantity < 1) {
        await removeCartItem(userId, listingId);
        return;
    }
    const cartItemRef = doc(db, 'users', userId, 'cart', listingId);
    await updateDoc(cartItemRef, { quantity });
};

export const removeCartItem = async (userId: string, listingId: string) => {
    const cartItemRef = doc(db, 'users', userId, 'cart', listingId);
    await deleteDoc(cartItemRef);
}
