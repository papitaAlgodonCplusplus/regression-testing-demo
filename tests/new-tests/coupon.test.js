// Coupon tests - NEW FEATURE TESTS
import { describe, test, expect, beforeEach } from '@jest/globals';
import { CouponService } from '../../src/coupon.js';

describe('CouponService - New Feature Tests', () => {
  let couponService;

  beforeEach(() => {
    couponService = new CouponService();
  });

  describe('Coupon Validation', () => {
    test('should validate existing coupon', () => {
      const coupon = couponService.validateCoupon('SAVE10');

      expect(coupon).toEqual({
        code: 'SAVE10',
        discount: 10,
        type: 'percentage'
      });
    });

    test('should validate coupon case-insensitively', () => {
      const coupon = couponService.validateCoupon('save10');

      expect(coupon.code).toBe('SAVE10');
    });

    test('should reject invalid coupon code', () => {
      expect(() => {
        couponService.validateCoupon('INVALID');
      }).toThrow('Coupon not found');
    });

    test('should reject empty coupon code', () => {
      expect(() => {
        couponService.validateCoupon('');
      }).toThrow('Invalid coupon code');
    });

    test('should reject null coupon code', () => {
      expect(() => {
        couponService.validateCoupon(null);
      }).toThrow('Invalid coupon code');
    });
  });

  describe('Discount Calculation', () => {
    test('should calculate percentage discount correctly', () => {
      const coupon = { code: 'SAVE10', discount: 10, type: 'percentage' };
      const discount = couponService.calculateDiscount(coupon, 1000);

      expect(discount).toBe(100);
    });

    test('should calculate 20% discount correctly', () => {
      const coupon = { code: 'SAVE20', discount: 20, type: 'percentage' };
      const discount = couponService.calculateDiscount(coupon, 1000);

      expect(discount).toBe(200);
    });

    test('should calculate fixed discount correctly', () => {
      const coupon = { code: 'FIXED50', discount: 50, type: 'fixed' };
      const discount = couponService.calculateDiscount(coupon, 1000);

      expect(discount).toBe(50);
    });

    test('should limit fixed discount to subtotal', () => {
      const coupon = { code: 'FIXED50', discount: 50, type: 'fixed' };
      const discount = couponService.calculateDiscount(coupon, 30);

      expect(discount).toBe(30);
    });
  });

  describe('Apply Coupon', () => {
    test('should apply coupon and return details', () => {
      const result = couponService.applyCoupon('SAVE10', 1000);

      expect(result).toEqual({
        coupon: { code: 'SAVE10', discount: 10, type: 'percentage' },
        discount: 100,
        newSubtotal: 900
      });
    });

    test('should apply fixed coupon correctly', () => {
      const result = couponService.applyCoupon('FIXED50', 1000);

      expect(result).toEqual({
        coupon: { code: 'FIXED50', discount: 50, type: 'fixed' },
        discount: 50,
        newSubtotal: 950
      });
    });
  });

  describe('Coupon Management', () => {
    test('should add new percentage coupon', () => {
      couponService.addCoupon('NEWCODE', 15, 'percentage');
      const coupon = couponService.validateCoupon('NEWCODE');

      expect(coupon).toEqual({
        code: 'NEWCODE',
        discount: 15,
        type: 'percentage'
      });
    });

    test('should add new fixed coupon', () => {
      couponService.addCoupon('FIXED100', 100, 'fixed');
      const coupon = couponService.validateCoupon('FIXED100');

      expect(coupon.type).toBe('fixed');
      expect(coupon.discount).toBe(100);
    });

    test('should reject invalid coupon type', () => {
      expect(() => {
        couponService.addCoupon('INVALID', 10, 'invalid');
      }).toThrow('Invalid coupon type');
    });

    test('should reject negative discount', () => {
      expect(() => {
        couponService.addCoupon('NEGATIVE', -10, 'percentage');
      }).toThrow('Invalid coupon parameters');
    });

    test('should remove existing coupon', () => {
      const result = couponService.removeCoupon('SAVE10');

      expect(result).toBe(true);
      expect(() => {
        couponService.validateCoupon('SAVE10');
      }).toThrow('Coupon not found');
    });

    test('should return false when removing non-existent coupon', () => {
      const result = couponService.removeCoupon('NONEXISTENT');
      expect(result).toBe(false);
    });
  });
});
