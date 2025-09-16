import { CreateListingForm } from "@/components/create-listing-form";

export default function CreateListingPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          Post Your Ad
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fill in the details below to reach thousands of potential buyers.
        </p>
      </div>
      <CreateListingForm />
    </div>
  );
}
