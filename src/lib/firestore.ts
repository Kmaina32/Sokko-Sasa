

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
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Listing, User, Advertisement } from "@/lib/types";
import { placeholderImages } from "@/lib/placeholder-images";
import type { User as FirebaseUser } from "firebase/auth";
import { mockEvents, mockRestaurantsData, mockPropertyData, mockProviderData, mockClinicData, mockInsuranceData, mockPharmacyData } from './mock-data';

// Seed data if the collections are empty
const seedDatabase = async () => {
  const listingsCollection = collection(db, "listings");
  const listingsSnapshot = await getDocs(query(listingsCollection, firestoreLimit(1)));
  if (listingsSnapshot.empty) {
    console.log("No listings found, seeding database for listings...");
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
     const listingPromises = mockListings.map(listingData => addDoc(collection(db, 'listings'), { ...listingData, createdAt: serverTimestamp() }));
     await Promise.all(listingPromises);
  }

  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(query(usersCollection, firestoreLimit(1)));
  if (usersSnapshot.empty) {
    console.log("Seeding users...");
    const mockUsers = [
         { id: 'seller1', name: 'Artisan Co.', email: 'artisan.co@example.com', avatarUrl: 'https://picsum.photos/seed/seller1/100/100', location: 'Nairobi, Kenya', memberSince: '2023-05-15', rating: 4.9, reviews: 213, type: 'Vendor', status: 'Active' },
         { id: 'seller2', name: 'Coastal Weavers', email: 'coastal.weavers@example.com', avatarUrl: 'https://picsum.photos/seed/seller2/100/100', location: 'Mombasa, Kenya', memberSince: '2022-11-20', rating: 4.7, reviews: 154, type: 'Vendor', status: 'Active' },
         { id: 'agent1', name: 'Property Masters', email: 'prop@masters.com', avatarUrl: 'https://picsum.photos/seed/agent1/100/100', location: 'Nairobi', memberSince: '2021-01-01', rating: 4.8, reviews: 89, type: 'Vendor', status: 'Active' },
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
     });
     await Promise.all(userPromises);
  }
     
  const adsCollection = collection(db, "advertisements");
  const adSnapshot = await getDocs(query(adsCollection, firestoreLimit(1)));
  if (adSnapshot.empty) {
    console.log("Seeding advertisements...");
    const mockAdvertisements: Omit<Advertisement, "id">[] = [
        { title: 'Summer Sale', imageUrl: 'https://picsum.photos/seed/ad-summer/1200/400', imageHint: 'summer sale', description: 'Get up to 50% off on all summer items!', isActive: true },
        { title: 'New Arrivals', imageUrl: 'https://picsum.photos/seed/ad-new/1200/400', imageHint: 'new products', description: 'Check out the latest collection of handcrafted goods.', isActive: true },
    ];
    const adPromises = mockAdvertisements.map(ad => addDoc(collection(db, 'advertisements'), ad));
    await Promise.all(adPromises);
  }

  const eventsCollection = collection(db, "events");
  const eventsSnapshot = await getDocs(query(eventsCollection, firestoreLimit(1)));
  if (eventsSnapshot.empty) {
    console.log("Seeding events...");
    const eventPromises = mockEvents.map(event => setDoc(doc(db, "events", event.id), event));
    await Promise.all(eventPromises);
  }

  const restaurantsCollection = collection(db, "restaurants");
  const restaurantsSnapshot = await getDocs(query(restaurantsCollection, firestoreLimit(1)));
  if (restaurantsSnapshot.empty) {
    console.log("Seeding restaurants...");
    const restaurantPromises = Object.values(mockRestaurantsData).map((resto: any) => setDoc(doc(db, "restaurants", resto.id), resto));
    await Promise.all(restaurantPromises);
  }
  
  const propertiesCollection = collection(db, "properties");
  const propertiesSnapshot = await getDocs(query(propertiesCollection, firestoreLimit(1)));
  if (propertiesSnapshot.empty) {
    console.log("Seeding properties...");
    const propertyPromises = Object.values(mockPropertyData).map((prop: any) => setDoc(doc(db, "properties", prop.id), prop));
    await Promise.all(propertyPromises);
  }
  
  const servicesCollection = collection(db, "services");
  const servicesSnapshot = await getDocs(query(servicesCollection, firestoreLimit(1)));
  if (servicesSnapshot.empty) {
    console.log("Seeding services...");
    const servicePromises = Object.values(mockProviderData).map((provider: any) => setDoc(doc(db, "services", provider.id), provider));
    await Promise.all(servicePromises);
  }

  const clinicsCollection = collection(db, "clinics");
  const clinicsSnapshot = await getDocs(query(clinicsCollection, firestoreLimit(1)));
  if(clinicsSnapshot.empty) {
    console.log("Seeding clinics...");
    const clinicPromises = Object.values(mockClinicData).map((clinic: any) => setDoc(doc(db, "clinics", clinic.id), clinic));
    await Promise.all(clinicPromises);
  }

  const insuranceCollection = collection(db, "insurances");
  const insuranceSnapshot = await getDocs(query(insuranceCollection, firestoreLimit(1)));
  if(insuranceSnapshot.empty) {
    console.log("Seeding insurances...");
    const insurancePromises = Object.values(mockInsuranceData).map((insurance: any) => setDoc(doc(db, "insurances", insurance.id), insurance));
    await Promise.all(insurancePromises);
  }

  const pharmacyCollection = collection(db, "pharmacies");
  const pharmacySnapshot = await getDocs(query(pharmacyCollection, firestoreLimit(1)));
  if(pharmacySnapshot.empty) {
    console.log("Seeding pharmacies...");
    const pharmacyPromises = Object.values(mockPharmacyData).map((pharmacy: any) => setDoc(doc(db, "pharmacies", pharmacy.id), pharmacy));
    await Promise.all(pharmacyPromises);
  }
};

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

export const deleteUserAccount = async (userId: string) => {
    // This is a simplified deletion. In a real-world scenario,
    // you would need a Cloud Function to delete the user from Firebase Auth
    // and handle their associated data (listings, cart, etc.)
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(userDocRef);
}


// LISTINGS
const uploadImage = async (file: File, path: string): Promise<string> => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

export const createListing = async (listingData: Omit<Listing, 'id' | 'imageUrl' | 'imageHint'>, userId: string | null, imageFile: File | null): Promise<string> => {
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
    const data = doc.data();
    let seller;
    if(data.sellerId) {
       seller = await getUserData(data.sellerId);
    }
    
    // Ensure createdAt is a serializable string
    if (data.createdAt && data.createdAt instanceof Timestamp) {
      data.createdAt = data.createdAt.toDate().toISOString();
    }

    return { ...data, id: doc.id, seller: seller ?? undefined } as Listing;
  }));

  return listings;
};

export const getListingById = async (id: string): Promise<Listing | null> => {
  const docRef = doc(db, "listings", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data() as any;
    let seller;
    if(data.sellerId) {
       seller = await getUserData(data.sellerId);
    }
    
    // Ensure createdAt is a serializable string before returning
    if (data.createdAt && data.createdAt instanceof Timestamp) {
      data.createdAt = data.createdAt.toDate().toISOString();
    }

    return { ...data, id: docSnap.id, seller: seller ?? undefined } as Listing;
  } else {
    return null;
  }
};

export const deleteListing = async (listingId: string) => {
    const listingDocRef = doc(db, 'listings', listingId);
    await deleteDoc(listingDocRef);
    // Note: In a real app, you might also want to delete associated images from storage.
}


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

export const clearCart = async (userId: string) => {
    const cartRef = collection(db, 'users', userId, 'cart');
    const snapshot = await getDocs(cartRef);
    
    if (snapshot.empty) {
        return;
    }

    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
}


// ADVERTISEMENTS
export const createAdvertisement = async (adData: Omit<Advertisement, 'id' | 'imageUrl' | 'imageHint'>, imageFile: File): Promise<string> => {
    const docRef = doc(collection(db, 'advertisements'));
    
    const imageUrl = await uploadImage(imageFile, `advertisements/${docRef.id}/${imageFile.name}`);

    await setDoc(docRef, {
        ...adData,
        id: docRef.id,
        imageUrl,
        imageHint: 'promotional image'
    });

    return docRef.id;
};

export const getAdvertisements = async ({ activeOnly = false }: { activeOnly?: boolean } = {}): Promise<Advertisement[]> => {
  let q = query(collection(db, "advertisements"));
  if (activeOnly) {
    q = query(q, where("isActive", "==", true));
  }
  const snapshot = await getDocs(q);
  if (snapshot.empty) return [];
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Advertisement));
};


export const updateAdvertisementStatus = async (adId: string, isActive: boolean) => {
  const adRef = doc(db, 'advertisements', adId);
  await updateDoc(adRef, { isActive });
}

export const deleteAdvertisement = async (adId: string) => {
  await deleteDoc(doc(db, 'advertisements', adId));
}

// ORDERS
interface CartItemForOrder extends Listing {
  quantity: number;
}
export const createOrder = async (userId: string, items: CartItemForOrder[], total: number) => {
    const ordersRef = collection(db, 'orders');
    const newOrderRef = doc(ordersRef);

    const orderData = {
        orderId: newOrderRef.id,
        userId,
        items: items.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl
        })),
        total,
        status: 'Pending',
        createdAt: serverTimestamp()
    };

    await setDoc(newOrderRef, orderData);
    return newOrderRef.id;
}

// WISHLIST
export const addToWishlist = async (userId: string, listingId: string) => {
    const wishlistRef = doc(db, 'users', userId, 'wishlist', listingId);
    await setDoc(wishlistRef, {
        listingId: listingId,
        addedAt: serverTimestamp()
    });
};

export const removeFromWishlist = async (userId: string, listingId: string) => {
    const wishlistRef = doc(db, 'users', userId, 'wishlist', listingId);
    await deleteDoc(wishlistRef);
};

export const getWishlistItems = (userId: string, callback: (itemIds: Set<string>) => void) => {
    const wishlistRef = collection(db, 'users', userId, 'wishlist');
    return onSnapshot(wishlistRef, (snapshot) => {
        if (snapshot.empty) {
            callback(new Set());
            return;
        }
        const itemIds = new Set(snapshot.docs.map(doc => doc.id));
        callback(itemIds);
    });
};


// GENERIC GETTERS for seeded data
export const getEvents = async (): Promise<any[]> => {
    const snapshot = await getDocs(collection(db, "events"));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getEventById = async (id: string): Promise<any | null> => {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getRestaurants = async (): Promise<any[]> => {
    const snapshot = await getDocs(collection(db, "restaurants"));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getRestaurantById = async (id: string): Promise<any | null> => {
    const docRef = doc(db, "restaurants", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getProperties = async (): Promise<any[]> => {
    const snapshot = await getDocs(collection(db, "properties"));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPropertyById = async (id: string): Promise<any | null> => {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    let agent;
    if (data.agent?.id) {
        agent = await getUserData(data.agent.id);
    }
    
    const propertyData = { ...data, id: docSnap.id };
    
    // Ensure the agent object is fully populated, even if fetched separately
    if(agent) {
        propertyData.agent = { ...data.agent, ...agent };
    }

    return propertyData;
};


export const getServices = async (): Promise<any[]> => {
    const snapshot = await getDocs(collection(db, "services"));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getServiceById = async (id: string): Promise<any | null> => {
    const docRef = doc(db, "services", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getClinics = async (): Promise<any[]> => {
    const snapshot = await getDocs(collection(db, "clinics"));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const getClinicById = async (id: string): Promise<any | null> => {
    const docRef = doc(db, "clinics", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

export const getInsurances = async (): Promise<any[]> => {
    const snapshot = await getDocs(collection(db, "insurances"));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const getPharmacies = async (): Promise<any[]> => {
    const snapshot = await getDocs(collection(db, "pharmacies"));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

seedDatabase();
