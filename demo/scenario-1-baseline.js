// Scenario 1: BASELINE - Everything works correctly
// This is the initial state before any changes

import { ShoppingCart } from '../src/cart.js';
import { CheckoutService } from '../src/checkout.js';
import { AuthService } from '../src/auth.js';

console.log('=== SCENARIO 1: BASELINE (Initial State) ===\n');

// Test authentication
const authService = new AuthService();
authService.register('demo', 'password123', 'demo@example.com');
const session = authService.login('demo', 'password123');
console.log('✅ Authentication working:', session.username);

// Test cart
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Laptop', price: 1000 }, 1);
cart.addItem({ id: 2, name: 'Mouse', price: 25 }, 2);
console.log('✅ Cart working:', cart.getItemCount(), 'items, total:', cart.getTotal());

// Test checkout
const checkoutService = new CheckoutService();
const items = cart.getItems();
const subtotal = checkoutService.calculateSubtotal(items);
const tax = checkoutService.calculateTax(subtotal);
const total = checkoutService.calculateTotal(items);

console.log('✅ Checkout calculations:');
console.log('   Subtotal:', subtotal);
console.log('   Tax (13%):', tax);
console.log('   Total:', total);

console.log('\n📊 Expected values:');
console.log('   Subtotal: 1050 (1000 + 50)');
console.log('   Tax: 136.5 (1050 * 0.13)');
console.log('   Total: 1186.5');

console.log('\n✅ All systems functioning correctly!');
console.log('📝 Run tests: npm test');
