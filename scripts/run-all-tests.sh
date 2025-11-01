#!/bin/bash

# Run ALL tests (Re-test all strategy)
# This runs the complete test suite without any filtering

echo "========================================="
echo "REGRESSION TESTING STRATEGY: Re-test All"
echo "========================================="
echo ""
echo "Running ALL tests in the suite..."
echo "This includes:"
echo "  - Authentication tests"
echo "  - Shopping cart tests"
echo "  - Checkout tests (will detect regression)"
echo "  - Coupon tests (new feature)"
echo ""
echo "Expected execution time: ~2 minutes"
echo "Expected test count: 50+ tests"
echo ""
echo "========================================="
echo ""

# Start timing
START_TIME=$(date +%s)

# Run all tests
npm test

# End timing
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo ""
echo "========================================="
echo "Execution completed in ${DURATION} seconds"
echo "========================================="
echo ""
echo "Analysis:"
echo "✅ Comprehensive coverage - all functionality tested"
echo "⚠️  Time-consuming for large test suites"
echo "💡 Best for: Critical releases, nightly builds"
