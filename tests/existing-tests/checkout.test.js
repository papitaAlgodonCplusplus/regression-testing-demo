// Checkout tests - CRITICAL: These will detect the regression
import { describe, test, expect, beforeEach } from '@jest/globals';
import { CheckoutService } from '../../src/checkout.js';
import { ShoppingCart } from '../../src/cart.js';

describe('CheckoutService - Regression Tests', () => {
  let checkoutService;
  let cart;
  const product1 = { id: 1, name: 'Laptop', price: 1000 };
  const product2 = { id: 2, name: 'Mouse', price: 25 };

  beforeEach(() => {
    checkoutService = new CheckoutService();
    cart = new ShoppingCart();
  });

  describe('Price Calculations', () => {
    test('should calculate subtotal correctly', () => {
      cart.addItem(product1, 2);
      cart.addItem(product2, 3);

      const subtotal = checkoutService.calculateSubtotal(cart.getItems());
      expect(subtotal).toBe(2075); // 2000 + 75
    });

    test('should calculate tax correctly (13%)', () => {
      const subtotal = 1000;
      const tax = checkoutService.calculateTax(subtotal);

      // CRITICAL TEST: This will fail when regression is introduced
      expect(tax).toBe(130); // 1000 * 0.13
    });

    test('should calculate tax on original subtotal even with coupon discount', () => {
      const subtotal = 1000;
      const couponDiscount = 100;
      const tax = checkoutService.calculateTax(subtotal, couponDiscount);

      // CRITICAL TEST: Tax should ALWAYS be 13% of ORIGINAL subtotal
      // NOT the discounted amount! This will catch the regression bug.
      expect(tax).toBe(130); // 1000 * 0.13, NOT 117 (which would be 900 * 0.13)
    });

    test('should calculate total correctly without discount', () => {
      cart.addItem(product1, 1);

      const total = checkoutService.calculateTotal(cart.getItems());
      // 1000 (subtotal) + 130 (tax) = 1130
      expect(total).toBe(1130);
    });

    test('should handle multiple items in total calculation', () => {
      cart.addItem(product1, 1); // 1000
      cart.addItem(product2, 2); // 50

      const total = checkoutService.calculateTotal(cart.getItems());
      // 1050 (subtotal) + 136.5 (tax) = 1186.5
      expect(total).toBe(1186.5);
    });
  });

  describe('Order Processing', () => {
    const shippingAddress = {
      street: '123 Main St',
      city: 'San José',
      country: 'Costa Rica',
      postalCode: '10101'
    };

    const paymentMethod = {
      type: 'credit_card',
      cardNumber: '****1234'
    };

    test('should process order successfully', () => {
      cart.addItem(product1, 1);

      const order = checkoutService.processOrder(cart, shippingAddress, paymentMethod);

      expect(order).toHaveProperty('id');
      expect(order).toHaveProperty('items');
      expect(order).toHaveProperty('subtotal', 1000);
      expect(order).toHaveProperty('tax', 130);
      expect(order).toHaveProperty('total', 1130);
      expect(order).toHaveProperty('status', 'pending');
      expect(order.shippingAddress).toEqual(shippingAddress);
      expect(order.paymentMethod).toEqual(paymentMethod);
    });

    test('should clear cart after processing order', () => {
      cart.addItem(product1, 1);
      checkoutService.processOrder(cart, shippingAddress, paymentMethod);

      expect(cart.getItems()).toHaveLength(0);
    });

    test('should reject order with empty cart', () => {
      expect(() => {
        checkoutService.processOrder(cart, shippingAddress, paymentMethod);
      }).toThrow('Cart is empty');
    });

    test('should reject order without shipping address', () => {
      cart.addItem(product1, 1);

      expect(() => {
        checkoutService.processOrder(cart, null, paymentMethod);
      }).toThrow('Invalid shipping address');
    });

    test('should reject order without payment method', () => {
      cart.addItem(product1, 1);

      expect(() => {
        checkoutService.processOrder(cart, shippingAddress, null);
      }).toThrow('Invalid payment method');
    });

    test('should increment order IDs', () => {
      cart.addItem(product1, 1);
      const order1 = checkoutService.processOrder(cart, shippingAddress, paymentMethod);

      cart.addItem(product2, 1);
      const order2 = checkoutService.processOrder(cart, shippingAddress, paymentMethod);

      expect(order2.id).toBe(order1.id + 1);
    });
  });

  describe('Order Retrieval', () => {
    const shippingAddress = {
      street: '123 Main St',
      city: 'San José',
      country: 'Costa Rica',
      postalCode: '10101'
    };

    const paymentMethod = {
      type: 'credit_card',
      cardNumber: '****1234'
    };

    test('should retrieve order by ID', () => {
      cart.addItem(product1, 1);
      const order = checkoutService.processOrder(cart, shippingAddress, paymentMethod);

      const retrieved = checkoutService.getOrder(order.id);
      expect(retrieved).toEqual(order);
    });

    test('should return undefined for non-existent order', () => {
      const order = checkoutService.getOrder(999);
      expect(order).toBeUndefined();
    });

    test('should retrieve all orders', () => {
      cart.addItem(product1, 1);
      checkoutService.processOrder(cart, shippingAddress, paymentMethod);

      cart.addItem(product2, 1);
      checkoutService.processOrder(cart, shippingAddress, paymentMethod);

      const orders = checkoutService.getAllOrders();
      expect(orders).toHaveLength(2);
    });
  });
});
