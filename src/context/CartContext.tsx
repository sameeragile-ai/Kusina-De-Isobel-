import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { MenuItem } from '../data/menu';

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedOption?: string;
  unitPrice: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: MenuItem; selectedOption?: string; optionPrice?: number } }
  | { type: 'REMOVE_ITEM'; payload: { cartId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { cartId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const STORAGE_KEY = 'kusina_de_isobel_cart_v1';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, selectedOption, optionPrice = 0 } = action.payload;
      const unitPrice = item.price + optionPrice;
      const cartId = `${item.id}-${selectedOption || 'default'}`;

      const existingIndex = state.items.findIndex(i => i.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return { items: updated };
      }

      return {
        items: [
          ...state.items,
          {
            cartId,
            item,
            quantity: 1,
            selectedOption,
            unitPrice,
          },
        ],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(i => i.cartId !== action.payload.cartId),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(i => i.cartId !== action.payload.cartId),
        };
      }
      return {
        items: state.items.map(i =>
          i.cartId === action.payload.cartId ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

function loadInitialCart(): CartState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed?.items)) {
        return { items: parsed.items };
      }
    }
  } catch {
    // localStorage may be disabled or quota exceeded
  }
  return { items: [] };
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: MenuItem, selectedOption?: string, optionPrice?: number) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  lastAddedKey: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedKey, setLastAddedKey] = useState(0);

  // Persist to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore write errors
    }
  }, [state]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const addItem = (item: MenuItem, selectedOption?: string, optionPrice?: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, selectedOption, optionPrice } });
    setLastAddedKey(Date.now());
  };

  const removeItem = (cartId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { cartId } });
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        lastAddedKey,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
