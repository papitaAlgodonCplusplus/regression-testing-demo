#!/bin/bash

# Run SELECTED tests (Selective regression testing strategy)
# Only runs tests that are potentially affected by the coupon feature

echo "==============================================="
echo "REGRESSION TESTING STRATEGY: Selective Testing"
echo "==============================================="
echo ""
echo "Running ONLY tests affected by coupon feature..."
echo "This includes:"
echo "  - Checkout tests (uses pricing calculations)"
echo "  - Cart tests (affected by checkout integration)"
echo "  - Coupon tests (new feature)"
echo ""
echo "Skipping:"
echo "  - Authentication tests (unrelated to coupons)"
echo "  - Other unaffected tests"
echo ""
echo "Expected execution time: ~30 seconds"
echo "Expected test count: ~15 tests"
echo ""
echo "==============================================="
echo ""

# Start timing
START_TIME=$(date +%s)

# Run only checkout, cart, and coupon tests
npm test -- --testPathPattern="(checkout|cart|coupon)"

# End timing
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo ""
echo "==============================================="
echo "Execution completed in ${DURATION} seconds"
echo "==============================================="
echo ""
echo "Analysis:"
echo "✅ Much faster - only 15 tests vs 50+"
echo "✅ Still detects the regression in checkout!"
echo "💡 Best for: Frequent commits, rapid feedback"
echo ""
echo "Comparison with Re-test All:"
echo "  Time saved: ~75% faster"
echo "  Coverage: Focused on affected areas"
echo "  Effectiveness: Still catches critical bugs"
