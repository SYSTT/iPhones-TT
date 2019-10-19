import { useUserCart } from './userCart';
import { useLocalStorageCart } from './localStorageCart';
import { useAuth } from '../auth';

export function useCart() {
  const userCartStuff = useUserCart();
  const localStorageCartStuff = useLocalStorageCart();
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return userCartStuff;
  }
  return localStorageCartStuff;
};
