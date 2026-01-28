import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { cartAPI } from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || [],
        loading: false,
        error: null,
      };

    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.category === action.payload.category
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id && item.category === action.payload.category
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === action.payload.id && item.category === action.payload.category)
        ),
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(item.id === action.payload.id && item.category === action.payload.category)
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.category === action.payload.category
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Initial state - try to load from localStorage synchronously
const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      return {
        items: Array.isArray(cartItems) ? cartItems : [],
        loading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error('Error loading initial cart:', error);
    localStorage.removeItem('cart');
  }
  return {
    items: [],
    loading: false,
    error: null,
  };
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());
  const { isAuthenticated, user } = useAuth();
  
  // Refs to prevent race conditions
  const hasInitialized = useRef(false);
  const isSyncing = useRef(false);
  const hasMergedOnLogin = useRef(false);

  // Save to localStorage whenever cart changes (except during sync)
  useEffect(() => {
    // Skip save during initialization or server sync
    if (!hasInitialized.current || isSyncing.current) {
      return;
    }

    // Always save current state to localStorage
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);

  // Initialize: Load from localStorage on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        if (Array.isArray(cartItems) && cartItems.length > 0) {
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartItems });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
    
    hasInitialized.current = true;
  }, []);

  // Handle login: Merge cart when user logs in
  useEffect(() => {
    if (!isAuthenticated || !user || hasMergedOnLogin.current) return;

    const mergeCartOnLogin = async () => {
      try {
        isSyncing.current = true;
        const localCart = localStorage.getItem('cart');
        const localCartItems = localCart ? JSON.parse(localCart) : [];

        if (localCartItems.length > 0) {
          // Merge local cart with server cart
          try {
            const mergedCart = await cartAPI.mergeCart(localCartItems);
            dispatch({ type: CART_ACTIONS.LOAD_CART, payload: mergedCart });
            localStorage.setItem('cart', JSON.stringify(mergedCart));
            hasMergedOnLogin.current = true;
          } catch (error) {
            console.error('Error merging cart:', error);
            // If merge fails, keep local cart
            hasMergedOnLogin.current = true;
          }
        } else {
          // No local cart, load from server
          try {
            const serverCart = await cartAPI.getCart();
            dispatch({ type: CART_ACTIONS.LOAD_CART, payload: serverCart });
            localStorage.setItem('cart', JSON.stringify(serverCart));
            hasMergedOnLogin.current = true;
          } catch (error) {
            console.error('Error loading server cart:', error);
            hasMergedOnLogin.current = true;
          }
        }
      } finally {
        isSyncing.current = false;
      }
    };

    mergeCartOnLogin();
  }, [isAuthenticated, user]);

  // Reset merge flag on logout
  useEffect(() => {
    if (!isAuthenticated) {
      hasMergedOnLogin.current = false;
    }
  }, [isAuthenticated]);

  // Sync cart operations to server (for logged-in users only)
  const syncToServer = useCallback(async (action, payload) => {
    if (!isAuthenticated || !hasMergedOnLogin.current) return;

    try {
      isSyncing.current = true;
      switch (action) {
        case 'add':
          await cartAPI.addToCart(payload);
          break;
        case 'update':
          await cartAPI.updateCartItem(payload);
          break;
        case 'remove':
          await cartAPI.removeFromCart(payload);
          break;
        case 'clear':
          await cartAPI.clearCart();
          break;
        default:
          break;
      }
      
      // Reload from server to ensure consistency
      const serverCart = await cartAPI.getCart();
      dispatch({ type: CART_ACTIONS.LOAD_CART, payload: serverCart });
      localStorage.setItem('cart', JSON.stringify(serverCart));
    } catch (error) {
      console.error(`Error syncing ${action} to server:`, error);
      // Keep local state - don't throw error
    } finally {
      isSyncing.current = false;
    }
  }, [isAuthenticated]);

  // Cart actions
  const addToCart = async (product, quantity = 1) => {
    const productId = product.id || product._id || product.productId;
    if (!productId) {
      console.error('Product ID is missing:', product);
      return;
    }

    const cartItem = {
      ...product,
      id: productId,
      productId: productId,
      quantity,
    };

    // Update local state immediately (optimistic update)
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: cartItem,
    });

    // Save to localStorage immediately
    const updatedItems = state.items.find(
      (item) => item.id === productId && item.category === product.category
    )
      ? state.items.map((item) =>
          item.id === productId && item.category === product.category
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...state.items, cartItem];

    localStorage.setItem('cart', JSON.stringify(updatedItems));

    // Sync to server if logged in (in background)
    if (isAuthenticated && hasMergedOnLogin.current) {
      syncToServer('add', {
        id: productId,
        productId: productId,
        quantity,
        category: product.category,
      });
    }
  };

  const removeFromCart = async (productId, category) => {
    const item = state.items.find(
      (item) => item.id === productId && item.category === category
    );

    // Update local state immediately
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: productId, category },
    });

    // Save to localStorage immediately
    const updatedItems = state.items.filter(
      (item) => !(item.id === productId && item.category === category)
    );
    localStorage.setItem('cart', JSON.stringify(updatedItems));

    // Sync to server if logged in (in background)
    if (isAuthenticated && hasMergedOnLogin.current && item) {
      syncToServer('remove', item);
    }
  };

  const updateQuantity = async (productId, category, quantity) => {
    const item = state.items.find(
      (item) => item.id === productId && item.category === category
    );

    // Update local state immediately
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, category, quantity },
    });

    // Save to localStorage immediately
    const updatedItems = quantity <= 0
      ? state.items.filter(
          (item) => !(item.id === productId && item.category === category)
        )
      : state.items.map((item) =>
          item.id === productId && item.category === category
            ? { ...item, quantity }
            : item
        );
    localStorage.setItem('cart', JSON.stringify(updatedItems));

    // Sync to server if logged in (in background)
    if (isAuthenticated && hasMergedOnLogin.current && item) {
      syncToServer('update', { ...item, quantity });
    }
  };

  const clearCart = async () => {
    // Update local state immediately
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    localStorage.setItem('cart', JSON.stringify([]));

    // Sync to server if logged in (in background)
    if (isAuthenticated && hasMergedOnLogin.current) {
      syncToServer('clear', {});
    }
  };

  // Calculate totals
  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price?.replace(/[^0-9.]/g, '')) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items: state.items,
    loading: state.loading,
    error: state.error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isEmpty: state.items.length === 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
