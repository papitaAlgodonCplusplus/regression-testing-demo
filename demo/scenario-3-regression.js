// Scenario 3: REGRESSION INTRODUCED
// This demonstrates how a bug was accidentally introduced when adding coupons
// The tax calculation now uses the discounted subtotal instead of the original

console.log('=== SCENARIO 3: REGRESSION DETECTED ===\n');
console.log('⚠️  PROBLEM: When integrating the coupon feature, a developer');
console.log('   accidentally modified the tax calculation in checkout.js');
console.log('   to apply tax AFTER the discount instead of BEFORE.\n');

console.log('📝 The bug in checkout.js:');
console.log('   BEFORE: calculateTax(subtotal)');
console.log('   AFTER:  calculateTax(subtotal - couponDiscount)  ❌\n');

console.log('💡 This means:');
console.log('   - Tax is now calculated on the discounted amount');
console.log('   - This is INCORRECT (tax should be on original subtotal)');
console.log('   - Even orders WITHOUT coupons are affected!\n');

console.log('🔍 Example of the bug:');
console.log('   Cart total: $1050');
console.log('   Coupon discount: $0 (no coupon used)');
console.log('   Expected tax (13%): $136.50');
console.log('   Actual tax (buggy): varies based on coupon logic\n');

console.log('✅ GOOD NEWS: Regression tests will catch this!');
console.log('   The existing checkout.test.js will fail because:');
console.log('   - It expects tax = $130 for a $1000 order');
console.log('   - But the buggy code returns a different value\n');

console.log('📝 To see this in action:');
console.log('   1. Uncomment the buggy code in src/checkout.js');
console.log('   2. Run: npm test');
console.log('   3. Watch checkout.test.js fail! ❌');
console.log('   4. This is regression testing in action!\n');

console.log('💡 This demonstrates why regression testing is critical:');
console.log('   - New features can accidentally break existing code');
console.log('   - Existing tests catch these issues immediately');
console.log('   - Selective testing reduces time while still catching bugs');
