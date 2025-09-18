
# Sokko Sasa - Architectural & Security Framework

This document outlines the architectural design, security model, user roles, and key data flows for the Sokko Sasa application.

## 1. High-Level Architecture

The application is a monolithic Next.js application using the App Router. It leverages server components for performance and separates concerns into distinct directories.

-   **`src/app`**: Contains all routes.
    -   `/` (public routes): Home, Shop, Events, etc.
    -   `/admin` (protected routes): Admin dashboard and management pages.
    -   `/create-listing`, `/cart`, `/profile` (user-protected routes): Routes requiring user authentication.
-   **`src/components`**: Shared React components, including UI primitives from ShadCN.
-   **`src/lib`**: Core logic and configuration.
    -   `firebase.ts`: Firebase initialization.
    -   `firestore.ts`: All database interaction functions (CRUD operations).
    -   `types.ts`: TypeScript type definitions for all data models.
-   **`src/context`**: React Context providers, primarily for authentication (`auth-context.tsx`).
-   **`src/ai`**: Genkit flows for all generative AI features.

---

## 2. Security Framework & User Roles

Access control is managed at two primary levels: the **Next.js Frontend** and the **Firebase Backend (Firestore)**.

### User Roles

1.  **Anonymous User (Guest)**:
    -   **Permissions**: Can browse public pages (home, shop, listings, events, etc.).
    -   **Restrictions**: Cannot post listings, add items to cart, access profile, or enter the admin panel.

2.  **Authenticated User (Client)**:
    -   **Permissions**: All guest permissions, plus:
        -   Create new listings.
        -   Manage their own profile.
        -   Add items to cart and wishlist.
        -   Place orders.
        -   Start conversations with sellers.
    -   **Restrictions**: Cannot access the `/admin` dashboard or modify other users' data.

3.  **Service Provider (Vendor, Driver, etc.)**:
    -   *This role is currently managed via user `type` field but can be expanded.*
    -   **Permissions**: All Client permissions, plus:
        -   Register in the Service Hub.
        -   Manage their own service-specific profiles (e.g., restaurant menu, driver status) once approved.

4.  **Admin**:
    -   **Permissions**: Full access to all application data and functionality.
    -   **Access**: Identified by a specific email address (`gmaina424@gmail.com`) checked in the admin layout.
    -   **Responsibilities**:
        -   Full CRUD (Create, Read, Update, Delete) on Users, Products, Advertisements, Events, Restaurants, etc.
        -   View platform-wide statistics.

### Security Implementation

1.  **Frontend Route Protection**:
    -   **Admin Routes**: The `src/app/admin/layout.tsx` file acts as a security gateway. It checks if the logged-in user's email matches the hardcoded admin email. If not, it redirects them away, preventing any access to admin pages.
    -   **User Routes**: Pages like `/cart`, `/create-listing`, and `/wishlist` use the `useAuth()` hook to check for an authenticated user. If no user is logged in, they display a "Login Required" message and prompt.

2.  **Backend Security (Firestore Rules)**:
    -   *(Conceptual - Not yet implemented in code)* Firestore Security Rules are **CRITICAL** for a production application. They provide server-side validation to ensure users can only read/write data they are authorized to.
    -   **Example Rules**:
        -   A user can only update their own profile document (`/users/{userId}`).
        -   A user can only create a listing with their own `userId` as the `sellerId`.
        -   A user can only write to their own cart (`/users/{userId}/cart/{listingId}`).
        -   The `/admin` collection (if created) should only be readable/writable by users with an `admin: true` custom claim.

---

## 3. Core Application Flows

### Flow 1: New User Registration

1.  **UI**: User fills out the signup form on `/signup`.
2.  **Client**: `useAuth().signup(email, password)` is called.
3.  **Firebase Auth**: Creates a new user account.
4.  **Client**: On success, `addUserData()` from `firestore.ts` is called with the new user's ID and name.
5.  **Firestore**: A new document is created in the `/users` collection with the user's details.
6.  **UI**: User is redirected to the homepage and is now logged in.

### Flow 2: Creating a Listing with AI

1.  **UI**: Authenticated user navigates to `/create-listing`.
2.  **Client**: User provides keywords and/or an image to the "Ad Description Generator".
3.  **Server Action**: `generateAdAction` (`actions.ts`) is called.
4.  **Genkit Flow**: The `generateAdFlow` (`generate-ad.ts`) is invoked with the inputs.
5.  **LLM**: The Genkit flow communicates with the Gemini model to generate a description.
6.  **Client**: The generated description is returned and populated in the form's textarea.
7.  **UI**: User fills out the remaining details (title, price, etc.) and uploads the main image.
8.  **Client**: On form submission, `createListing()` from `firestore.ts` is called.
9.  **Firebase Storage**: The main image is uploaded.
10. **Firestore**: A new document is created in the `/listings` collection with all the ad details and the image URL.
11. **UI**: User is redirected to the newly created listing's detail page.

### Flow 3: Admin Deleting a Product

1.  **UI**: Admin navigates to `/admin/products`.
2.  **Client**: The page fetches all products using `getListings()` from `firestore.ts`.
3.  **UI**: Admin clicks the "Delete" icon for a product. An `AlertDialog` appears for confirmation.
4.  **Client**: On confirmation, the `handleDelete` function calls `deleteListing(productId)` from `firestore.ts`.
5.  **Firestore**: The corresponding document in the `/listings` collection is deleted.
6.  **Client**: The component re-fetches the product list to reflect the change, and a success toast is shown.

---

## 4. Main Data Models (Simplified)

*(See `src/lib/types.ts` for full definitions)*

```typescript
// A user of the platform.
interface User {
  id: string; // Firebase Auth UID
  name: string;
  email: string;
  avatarUrl: string;
  type: 'Client' | 'Vendor' | 'Driver' | 'Admin';
  status: 'Active' | 'Suspended';
}

// A product or service being sold.
interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sellerId: string; // Foreign key to User.id
}

// An order placed by a user.
interface Order {
  id: string;
  userId: string;
  items: { id: string, title: string, price: number, quantity: number }[];
  total: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt: Timestamp;
}
```
