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
  avatarUrl: string;
  location?: string;
  memberSince?: string;
  rating?: number;
  reviews?: number;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: "user" | "seller";
}

export interface Conversation {
  id: string;
  user: User;
  listing: Pick<Listing, "id" | "title" | "imageUrl">;
  lastMessage: Message;
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
