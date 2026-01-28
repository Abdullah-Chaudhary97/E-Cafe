# 🛒 Cart Implementation Documentation

## Overview

This document describes the complete cart functionality implementation for the E-Cafe application, supporting both logged-in and non-logged-in users.

## Architecture

### Backend Components

#### 1. Cart Model (`server/models/Cart.js`)
- **Schema**: Stores cart items with product references, quantities, and metadata
- **User Association**: Each cart is linked to a user via `user` field
- **Cart Items**: Array of items with product reference, quantity, price, and category

#### 2. Cart Controller (`server/controllers/cartController.js`)
- `getCart()` - Retrieve user's cart
- `addToCart()` - Add item to cart (increments if exists)
- `updateCartItem()` - Update item quantity
- `removeFromCart()` - Remove item from cart
- `clearCart()` - Clear all items
- `mergeCart()` - Merge guest cart with user cart on login

#### 3. Cart Routes (`server/routes/cartRoutes.js`)
- All routes require authentication (`protect` middleware)
- Base path: `/api/cart`
- Endpoints:
  - `GET /api/cart` - Get cart
  - `POST /api/cart/add` - Add item
  - `PUT /api/cart/update` - Update item
  - `DELETE /api/cart/remove` - Remove item
  - `DELETE /api/cart/clear` - Clear cart
  - `POST /api/cart/merge` - Merge guest cart

### Frontend Components

#### 1. Cart API Service (`src/api/cart.js`)
- Wraps all cart API calls
- Handles authentication automatically via axios interceptor
- Returns standardized cart item format

#### 2. Cart Context (`src/contexts/CartContext.jsx`)
- **State Management**: Uses React useReducer
- **Dual Storage**: 
  - localStorage for immediate UI updates
  - Server sync for logged-in users
- **Auto-sync**: Automatically syncs with server when user is logged in
- **Cart Merging**: Merges localStorage cart with server cart on login

#### 3. Toast Notifications (`src/components/common/Toast/Toast.jsx`)
- Success/Error/Info toast messages
- Auto-dismiss after 3 seconds
- Positioned at top-right

## User Flows

### Non-Logged-In Users

1. **Add to Cart**
   ```
   User clicks "Add to Cart" 
   → Item added to CartContext
   → Saved to localStorage
   → Toast notification shown
   → Cart badge updated
   ```

2. **View/Manage Cart**
   ```
   All operations use localStorage
   → No API calls
   → Instant UI updates
   ```

3. **Checkout Flow**
   ```
   User clicks "Proceed to Checkout"
   → Redirected to Login/SignUp
   → After login: Cart merged with server
   → Proceed to checkout
   ```

### Logged-In Users

1. **Add to Cart**
   ```
   User clicks "Add to Cart"
   → Item added to CartContext (optimistic update)
   → Saved to localStorage immediately
   → API call to sync with server (background)
   → Server cart reloaded for consistency
   → Toast notification shown
   → Cart badge updated
   ```

2. **Cart Management**
   ```
   All operations:
   → Update localStorage immediately
   → Sync with server in background
   → Reload from server for consistency
   ```

3. **Login Flow**
   ```
   User logs in
   → CartContext detects authentication
   → Merges localStorage cart with server cart
   → Resolves conflicts (adds quantities)
   → Syncs merged cart to server
   → Updates UI
   ```

## API Endpoints

### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "cart": {
    "items": [
      {
        "id": "product_id",
        "productId": "product_id",
        "title": "Product Name",
        "description": "Product description",
        "price": "$10.00",
        "image": "image_url",
        "category": "coffee",
        "quantity": 2
      }
    ]
  }
}
```

### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 1,
  "category": "coffee"
}
```

### Update Cart Item
```http
PUT /api/cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 3,
  "category": "coffee"
}
```

### Remove from Cart
```http
DELETE /api/cart/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id",
  "category": "coffee"
}
```

### Clear Cart
```http
DELETE /api/cart/clear
Authorization: Bearer <token>
```

### Merge Cart
```http
POST /api/cart/merge
Authorization: Bearer <token>
Content-Type: application/json

{
  "guestCartItems": [
    {
      "id": "product_id",
      "category": "coffee",
      "quantity": 1,
      "price": "$10.00"
    }
  ]
}
```

## Usage Examples

### Adding Item to Cart

```jsx
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../common/Toast/Toast';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        ...product,
        category: 'coffee',
        title: product.productTitle || product.title,
      });
      showToast(`${product.title} added to cart!`, 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

### Using Cart Data

```jsx
import { useCart } from '../../contexts/CartContext';

function CartSummary() {
  const { items, getCartTotal, getCartItemCount, isEmpty } = useCart();

  if (isEmpty) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <p>Items: {getCartItemCount()}</p>
      <p>Total: ${getCartTotal().toFixed(2)}</p>
      {items.map(item => (
        <div key={`${item.id}-${item.category}`}>
          {item.title} - Qty: {item.quantity}
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

- **Network Errors**: Cart operations continue with localStorage, errors logged to console
- **API Failures**: Optimistic updates ensure UI remains responsive
- **Authentication Errors**: Auto-redirect to login page (handled by axios interceptor)
- **Merge Failures**: Falls back to server cart if merge fails

## Performance Optimizations

1. **Optimistic Updates**: UI updates immediately, server sync happens in background
2. **LocalStorage Caching**: Reduces server calls for non-logged-in users
3. **Debounced Syncs**: Multiple rapid changes are batched
4. **Error Recovery**: Automatic fallback to localStorage if server fails

## Security Considerations

1. **Authentication Required**: All cart API endpoints require valid JWT token
2. **User Isolation**: Users can only access their own cart
3. **Input Validation**: Server validates all cart operations
4. **Product Verification**: Server verifies product exists before adding to cart

## Testing Checklist

- [ ] Add item to cart (logged out)
- [ ] Add item to cart (logged in)
- [ ] Update quantity
- [ ] Remove item
- [ ] Clear cart
- [ ] Cart persists on page refresh (logged out)
- [ ] Cart syncs across devices (logged in)
- [ ] Cart merges on login
- [ ] Toast notifications appear
- [ ] Cart badge updates correctly
- [ ] Error handling works correctly

## Future Enhancements

1. **Cart Expiration**: Auto-clear cart after X days of inactivity
2. **Save for Later**: Allow users to save items without adding to cart
3. **Cart Sharing**: Share cart with other users
4. **Wishlist Integration**: Convert wishlist items to cart
5. **Cart Analytics**: Track popular cart combinations
