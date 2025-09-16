
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { getCartItems } from '@/lib/firestore';
import type { Listing } from '@/lib/types';

interface CartItem extends Listing {
  quantity: number;
}

export function useCart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const unsubscribe = getCartItems(user.uid, (items) => {
        setCartItems(items as CartItem[]);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  return { cartItems, loading };
}
