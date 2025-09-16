import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  limit as firestoreLimit,
} from "firebase/firestore";
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

     await Promise.all(mockListings.map(listing => {
        const docRef = doc(collection(db, 'listings'));
        return setDoc(docRef, { ...listing, id: docRef.id });
     }));
    console.log("Database seeded.");
  }
};

// Call this once somewhere in your app's initialization
seedDatabase();

// USERS
export const addUserData = async (user: FirebaseUser, additionalData: any) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: additionalData.name,
    photoURL: user.photoURL,
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
            avatarUrl: userData.photoURL ?? `https://picsum.photos/seed/${userData.uid}/100/100`,
        }
    }
    return null;
}


// LISTINGS
export const getListings = async (options: { limit?: number } = {}): Promise<Listing[]> => {
  const listingsCollection = collection(db, "listings");
  const q = options.limit ? query(listingsCollection, firestoreLimit(options.limit)) : query(listingsCollection);
  
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
