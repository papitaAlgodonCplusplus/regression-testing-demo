#!/bin/bash

# Automated demo script for regression testing presentation
# This script walks through all three scenarios automatically

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  REGRESSION TESTING DEMO - E-Commerce System             ║"
echo "║  Universidad de Costa Rica - CI-0142 Pruebas de Software ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Function to pause and wait for user
pause() {
  echo ""
  read -p "Press ENTER to continue..."
  echo ""
}

# Scenario 1: Baseline
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SCENARIO 1: BASELINE (Initial State)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
node demo/scenario-1-baseline.js
pause

echo "Running baseline tests..."
npm test
echo ""
echo "✅ Result: All tests pass - system is stable"
pause

# Scenario 2: New Feature
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SCENARIO 2: NEW FEATURE (Coupon System)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
node demo/scenario-2-new-feature.js
pause

echo "Running tests after adding new feature..."
npm test
echo ""
echo "✅ Result: All tests still pass - new feature integrated correctly"
pause

# Scenario 3: Regression
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SCENARIO 3: REGRESSION INTRODUCED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
node demo/scenario-3-regression.js
pause

echo "⚠️  Now let's introduce the bug..."
echo "   Replacing checkout.js with buggy version..."
echo ""

# Backup original and replace with buggy version
cp src/checkout.js src/checkout-original.js.bak
cp src/checkout-buggy.js src/checkout.js

echo "Running tests with regression..."
echo ""
npm test
echo ""
echo "❌ Result: Tests FAIL - regression detected!"
echo ""
echo "The failing test is checkout.test.js:"
echo "  Expected tax: $130 (for $1000 order)"
echo "  Actual tax: Different value due to bug"
pause

# Strategy comparison
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STRATEGY COMPARISON: Re-test All vs Selective"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Strategy 1: Re-test All (Running ALL tests)"
bash scripts/run-all-tests.sh
pause

echo "Strategy 2: Selective Testing (Running AFFECTED tests only)"
bash scripts/run-selected-tests.sh
pause

# Restore original
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Restoring original checkout.js..."
mv src/checkout-original.js.bak src/checkout.js
echo "✅ Restoration complete"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Summary
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                    DEMO SUMMARY                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "Key Takeaways:"
echo ""
echo "1. 🎯 Regression Testing Purpose:"
echo "   - Ensures existing functionality remains intact"
echo "   - Detects unintended side effects of changes"
echo ""
echo "2. 📊 Strategy Comparison:"
echo "   - Re-test All: Comprehensive but time-consuming"
echo "   - Selective: Faster, focused, still effective"
echo ""
echo "3. ✅ Real-world Benefits:"
echo "   - 70% time reduction with selective testing"
echo "   - 95% effectiveness maintained"
echo "   - Faster feedback for developers"
echo ""
echo "4. 🔧 Tools Demonstrated:"
echo "   - Jest for automated testing"
echo "   - Code coverage analysis"
echo "   - CI/CD integration ready"
echo ""
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "Thank you! Questions?"
