# Sokko Sasa - The Smart Marketplace

Welcome to Sokko Sasa, a comprehensive online marketplace designed for the modern African consumer. This application provides a one-stop-shop for a wide range of services, from buying and selling products to ordering food, booking rides, and exploring real estate.

## Tech Stack

This project is built with a modern, robust, and scalable technology stack:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI**: [React](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
-   **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore, Authentication, Storage)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) (for generative AI features)

## Key Features.    

-   **Multi-Category Marketplace**: A unified platform for various services:
    -   **Shop**: Buy and sell new or used products.
    -   **Food Delivery**: Order from local restaurants.
    -   **Rides**: Book a ride with our ride-hailing service.
    -   **Real Estate**: Browse properties for rent or sale.
    -   **Jobs, Services, Medical & More**: A comprehensive service directory.
-   **AI-Powered Ad Creation**: Users can generate compelling ad descriptions from keywords and images using generative AI.
-   **User Authentication**: Secure sign-up and login with email/password and Google.
-   **Shopping Cart & Wishlist**: Standard e-commerce features for a smooth shopping experience.
-   **Service Hub**: A dedicated portal for vendors, drivers, and other service providers to register and manage their offerings.
-   **Admin Dashboard**: A secure area for administrators to manage users, products, advertisements, and other application data.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation & Running the App

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

### Project Structure

-   `src/app/`: Contains all the pages and routes for the application.
-   `src/components/`: Shared React components, including UI components from ShadCN.
-   `src/lib/`: Core application logic, including Firebase configuration (`firebase.ts`), database functions (`firestore.ts`), and type definitions (`types.ts`).
-   `src/ai/`: Contains all Genkit flows for generative AI features.
-   `src/context/`: React context providers, such as for authentication.

## Admin Access

For testing purposes, the following email is configured with administrative privileges:
-   **Email**: `gmaina424@gmail.com`

Log in with this account to access the Admin Dashboard located at `/admin`.