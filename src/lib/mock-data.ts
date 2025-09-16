import { placeholderImages } from '@/lib/placeholder-images';

export const mockEvents = [
    {
      id: 'evt1',
      name: 'Sauti Sol Live in Nairobi',
      location: 'KICC, Nairobi',
      date: '2024-10-26',
      time: '7:00 PM - 11:00 PM',
      description: "Join us for an unforgettable night of music with the legendary Sauti Sol. Get ready to dance to their greatest hits and new tracks from their latest album. This is a concert you don't want to miss!",
      imageUrl: placeholderImages.event1.imageUrl,
      imageHint: placeholderImages.event1.imageHint,
      tickets: [
        { id: 't1', type: 'Regular', price: 2500 },
        { id: 't2', type: 'VIP', price: 6000 },
      ],
    },
    {
      id: 'evt2',
      name: 'Kenya Tech Summit',
      location: 'Sarit Centre Expo, Nairobi',
      date: '2024-11-15',
      time: '9:00 AM - 5:00 PM',
      description: "The premier technology event in Kenya, bringing together innovators, entrepreneurs, and investors. Featuring keynote speakers, panel discussions, and networking opportunities.",
      imageUrl: placeholderImages.event2.imageUrl,
      imageHint: placeholderImages.event2.imageHint,
      tickets: [
        { id: 't3', type: 'Student Pass', price: 1000 },
        { id: 't4', type: 'Standard Pass', price: 3500 },
        { id: 't5', type: 'Exhibitor Pass', price: 15000 },
      ],
    },
  ];
  
  export const mockRestaurantsData: any = {
      resto1: { 
          id: 'resto1', 
          name: "Mama's Kitchen", 
          cuisine: 'Kenyan', 
          rating: 4.5, 
          imageUrl: placeholderImages.food1.imageUrl,
          imageHint: placeholderImages.food1.imageHint,
          menu: [
              { id: 'm1-1', name: 'Nyama Choma (1/2 Kg)', description: 'Grilled goat meat served with kachumbari.', price: 800 },
              { id: 'm1-2', name: 'Ugali and Sukuma Wiki', description: 'A staple Kenyan meal.', price: 350 },
              { id: 'm1-3', name: 'Chapati (2 pcs)', description: 'Soft, layered flatbread.', price: 100 },
              { id: 'm1-4', name: 'Mukimo', description: 'Mashed potatoes, maize, beans, and greens.', price: 400 },
          ]
      },
      resto2: {
          id: 'resto2', 
          name: "Pizza Inn", 
          cuisine: 'Pizza', 
          rating: 4.2,
          imageUrl: placeholderImages.food2.imageUrl,
          imageHint: placeholderImages.food2.imageHint,
          menu: [
              { id: 'm2-1', name: 'Medium BBQ Steak Pizza', description: 'Classic BBQ steak pizza with all the toppings.', price: 1200 },
              { id: 'm2-2', name: 'Large Chicken Tikka Pizza', description: 'Spicy chicken tikka on a delicious crust.', price: 1500 },
              { id: 'm2-3', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 300 },
              { id: 'm2-4', name: '2L Soda', description: 'Your choice of Coca-cola, Fanta, or Sprite.', price: 250 },
          ]
      },
      resto3: { 
          id: 'resto3', 
          name: "Shanghai Kitchen", 
          cuisine: 'Chinese', 
          rating: 4.8,
          imageUrl: placeholderImages.food3.imageUrl,
          imageHint: placeholderImages.food3.imageHint,
          menu: [
              { id: 'm3-1', name: 'Sweet & Sour Pork', description: 'Crispy pork in a sweet and sour sauce.', price: 950 },
              { id: 'm3-2', name: 'Egg Fried Rice', description: 'A classic side dish.', price: 500 },
              { id: 'm3-3', name: 'Chicken Cashew Nuts', description: 'Stir-fried chicken with crunchy cashews.', price: 1100 },
              { id: 'm3-4', name: 'Vegetable Spring Rolls (3 pcs)', description: 'Crispy rolls filled with fresh vegetables.', price: 450 },
          ]
      },
  };
  
  export const mockPropertyData: any = {
      're1': {
          id: 're1',
          title: 'Spacious 2BR Apartment in Kilimani',
          description: `Experience modern living in this stunning 2-bedroom apartment located in the heart of Kilimani. This property boasts ample natural light, a spacious living area, and a contemporary kitchen with high-end finishes. Both bedrooms are en-suite, providing comfort and privacy.
  
  Key Features:
  - 2 Bedrooms, 2 Bathrooms
  - Open-plan living and dining area
  - Fully-fitted kitchen with granite countertops
  - Balcony with city views
  - 24/7 security and CCTV surveillance
  - High-speed lifts
  - Backup generator
  - Borehole water supply
  - Ample parking space
  
  Enjoy convenient access to Yaya Centre, Prestige Plaza, and numerous restaurants and international schools. Perfect for young professionals or small families.`,
          price: 80000,
          type: 'Rent',
          location: 'Kilimani, Nairobi',
          images: [
              placeholderImages.property1.imageUrl,
              "https://picsum.photos/seed/re1-2/800/600",
              "https://picsum.photos/seed/re1-3/800/600",
          ],
          agent: {
              id: 'agent1',
              name: 'Property Masters',
              avatar: 'https://picsum.photos/seed/agent1/100/100',
          },
          amenities: { beds: 2, baths: 2, parking: 1 }
      },
      're2': {
          id: 're2',
          title: '4 Bedroom Townhouse for Sale in Runda',
          description: `A magnificent 4-bedroom townhouse in the serene and secure neighborhood of Runda. This family home sits on a half-acre lot with a mature garden. It features a large living room with a fireplace, a separate dining area, a modern kitchen, and spacious en-suite bedrooms.`,
          price: 65000000,
          type: 'Sale',
          location: 'Runda, Nairobi',
          images: [
              placeholderImages.property2.imageUrl,
              "https://picsum.photos/seed/re2-2/800/600",
              "https://picsum.photos/seed/re2-3/800/600",
          ],
          agent: {
              id: 'agent1',
              name: 'Property Masters',
              avatar: 'https://picsum.photos/seed/agent1/100/100',
          },
          amenities: { beds: 4, baths: 4, parking: 4 }
      }
  };
  
  export const mockProviderData: any = {
      'srv1': {
          id: 'srv1',
          name: 'Quick Plumbers',
          service: 'Plumbing',
          rating: 4.8,
          reviews: 125,
          location: 'Nairobi & Environs',
          imageUrl: placeholderImages.service1.imageUrl,
          imageHint: placeholderImages.service1.imageHint,
          bio: "With over 10 years of experience, Quick Plumbers offers reliable and professional plumbing services across Nairobi. We handle everything from leaky faucets to complete system installations. Our team is available 24/7 for emergency services.",
          services: [
              "Emergency Leak Repairs",
              "Drain Unclogging",
              "Water Heater Installation",
              "Bathroom & Kitchen Plumbing",
              "New Installations"
          ]
      }
  };
  
  export const mockRestaurants = Object.values(mockRestaurantsData);
  export const mockProperties = Object.values(mockPropertyData);
  export const mockProviders = Object.values(mockProviderData);
  export const mockJobs: any[] = []; // Empty for now
  export const mockClinics: any[] = []; // Empty for now
