// Shopping cart tests - existing tests that should always pass
import { describe, test, expect, beforeEach } from '@jest/globals';
import { ShoppingCart } from '../../src/cart.js';

describe('ShoppingCart - Regression Tests', () => {
  let cart;
  const product1 = { id: 1, name: 'Laptop', price: 1000 };
  const product2 = { id: 2, name: 'Mouse', price: 25 };

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('Adding Items', () => {
    test('should add item to empty cart', () => {
      const count = cart.addItem(product1, 1);

      expect(count).toBe(1);
      expect(cart.getItems()).toHaveLength(1);
      expect(cart.getItems()[0]).toEqual({
        product: product1,
        quantity: 1
      });
    });

    test('should add multiple items to cart', () => {
      cart.addItem(product1, 1);
      cart.addItem(product2, 2);

      expect(cart.getItems()).toHaveLength(2);
      expect(cart.getItemCount()).toBe(3);
    });

    test('should increase quantity for existing item', () => {
      cart.addItem(product1, 1);
      cart.addItem(product1, 2);

      expect(cart.getItems()).toHaveLength(1);
      expect(cart.getItems()[0].quantity).toBe(3);
    });

    test('should reject zero quantity', () => {
      expect(() => {
        cart.addItem(product1, 0);
      }).toThrow('Quantity must be positive');
    });

    test('should reject negative quantity', () => {
      expect(() => {
        cart.addItem(product1, -1);
      }).toThrow('Quantity must be positive');
    });

    test('should reject invalid product', () => {
      expect(() => {
        cart.addItem({ name: 'Invalid' }, 1);
      }).toThrow('Invalid product');
    });
  });

  describe('Removing Items', () => {
    beforeEach(() => {
      cart.addItem(product1, 1);
      cart.addItem(product2, 2);
    });

    test('should remove item from cart', () => {
      const count = cart.removeItem(product1.id);

      expect(count).toBe(1);
      expect(cart.getItems()).toHaveLength(1);
      expect(cart.getItems()[0].product.id).toBe(product2.id);
    });

    test('should throw error when removing non-existent item', () => {
      expect(() => {
        cart.removeItem(999);
      }).toThrow('Product not found in cart');
    });
  });

  describe('Updating Quantities', () => {
    beforeEach(() => {
      cart.addItem(product1, 1);
    });

    test('should update item quantity', () => {
      const newQuantity = cart.updateQuantity(product1.id, 5);

      expect(newQuantity).toBe(5);
      expect(cart.getItems()[0].quantity).toBe(5);
    });

    test('should reject zero quantity update', () => {
      expect(() => {
        cart.updateQuantity(product1.id, 0);
      }).toThrow('Quantity must be positive');
    });

    test('should throw error for non-existent product', () => {
      expect(() => {
        cart.updateQuantity(999, 5);
      }).toThrow('Product not found in cart');
    });
  });

  describe('Cart Calculations', () => {
    test('should calculate correct total for single item', () => {
      cart.addItem(product1, 2);
      expect(cart.getTotal()).toBe(2000);
    });

    test('should calculate correct total for multiple items', () => {
      cart.addItem(product1, 1); // 1000
      cart.addItem(product2, 2); // 50
      expect(cart.getTotal()).toBe(1050);
    });

    test('should return zero for empty cart', () => {
      expect(cart.getTotal()).toBe(0);
    });

    test('should count total items correctly', () => {
      cart.addItem(product1, 2);
      cart.addItem(product2, 3);
      expect(cart.getItemCount()).toBe(5);
    });
  });

  describe('Cart Management', () => {
    test('should clear cart', () => {
      cart.addItem(product1, 1);
      cart.addItem(product2, 2);
      cart.clear();

      expect(cart.getItems()).toHaveLength(0);
      expect(cart.getTotal()).toBe(0);
    });

    test('should return copy of items', () => {
      cart.addItem(product1, 1);
      const items = cart.getItems();
      items.push({ product: product2, quantity: 1 });

      expect(cart.getItems()).toHaveLength(1);
    });
  });
});
