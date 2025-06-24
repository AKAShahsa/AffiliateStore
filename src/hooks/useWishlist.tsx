import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, set, remove } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';

export interface WishlistItem {
  id: number;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  affiliateUrl: string;
}

export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    const wishlistRef = ref(database, `wishlists/${user.uid}`);
    const unsubscribe = onValue(wishlistRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setWishlist(Object.values(data));
      } else {
        setWishlist([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const addToWishlist = useCallback(
    (item: WishlistItem) => {
      if (!user) return;
      set(ref(database, `wishlists/${user.uid}/${item.id}`), item);
    },
    [user]
  );

  const removeFromWishlist = useCallback(
    (productId: number) => {
      if (!user) return;
      remove(ref(database, `wishlists/${user.uid}/${productId}`));
    },
    [user]
  );

  const isInWishlist = useCallback(
    (productId: number) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  return { wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist };
}; 