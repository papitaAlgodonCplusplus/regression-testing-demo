// Scenario 2: NEW FEATURE - Coupon system added (still working)
// This demonstrates adding new functionality without breaking existing code

import { ShoppingCart } from '../src/cart.js';
import { CheckoutService } from '../src/checkout.js';
import { CouponService } from '../src/coupon.js';

console.log('=== SCENARIO 2: NEW FEATURE (Coupon System Added) ===\n');

// Test existing functionality (should still work)
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Laptop', price: 1000 }, 1);
cart.addItem({ id: 2, name: 'Mouse', price: 25 }, 2);
console.log('✅ Existing cart functionality:', cart.getItemCount(), 'items');

const checkoutService = new CheckoutService();
const items = cart.getItems();
const subtotal = checkoutService.calculateSubtotal(items);
const tax = checkoutService.calculateTax(subtotal);
const total = checkoutService.calculateTotal(items);

console.log('✅ Existing checkout still works:');
console.log('   Subtotal:', subtotal);
console.log('   Tax:', tax);
console.log('   Total:', total);

// Test NEW coupon functionality
console.log('\n🎉 NEW FEATURE - Coupons:');
const couponService = new CouponService();

const coupon1 = couponService.applyCoupon('SAVE10', subtotal);
console.log('   SAVE10 (10% off):', coupon1);

const coupon2 = couponService.applyCoupon('SAVE20', subtotal);
console.log('   SAVE20 (20% off):', coupon2);

const coupon3 = couponService.applyCoupon('FIXED50', subtotal);
console.log('   FIXED50 ($50 off):', coupon3);

console.log('\n✅ New feature added successfully!');
console.log('✅ Existing functionality unchanged!');
console.log('📝 Run tests: npm test (all should pass)');
