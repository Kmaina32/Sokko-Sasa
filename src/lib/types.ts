import type { User as FirebaseUser } from "firebase/auth";

export type ListingCategory = "Product" | "Service" | "Job" | "Property";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ListingCategory;
  location: string;
  imageUrl: string;
  imageHint: string;
  images?: string[];
  sellerId: string;
  seller?: User;
  postedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl: string;
  location?: string;
  memberSince?: string;
  rating?: number;
  reviews?: number;
  type?: 'Client' | 'Vendor' | 'Driver' | 'Admin';
  status?: 'Active' | 'Suspended';
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: any; // Firestore Timestamp
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: { [key: string]: Pick<User, 'name' | 'avatarUrl'> };
  listingId: string;
  listing: Pick<Listing, 'title'>;
  lastMessage: {
    text: string;
    senderId: string;
    createdAt: any;
  } | null;
  createdAt: any;
  updatedAt: any;
}

export interface AdminListing {
  id: string;
  title: string;
  sellerName: string;
  category: ListingCategory;
  status: "Pending" | "Approved" | "Rejected";
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  status: "Active" | "Suspended";
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link?: string;
  isActive: boolean;
}