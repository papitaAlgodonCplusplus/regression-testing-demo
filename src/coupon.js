// Coupon/discount module - NEW FEATURE
export class CouponService {
  constructor() {
    this.coupons = new Map();
    this.initializeDefaultCoupons();
  }

  initializeDefaultCoupons() {
    this.coupons.set('SAVE10', { code: 'SAVE10', discount: 10, type: 'percentage' });
    this.coupons.set('SAVE20', { code: 'SAVE20', discount: 20, type: 'percentage' });
    this.coupons.set('FIXED50', { code: 'FIXED50', discount: 50, type: 'fixed' });
  }

  validateCoupon(code) {
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid coupon code');
    }

    const coupon = this.coupons.get(code.toUpperCase());

    if (!coupon) {
      throw new Error('Coupon not found');
    }

    return coupon;
  }

  calculateDiscount(coupon, subtotal) {
    if (coupon.type === 'percentage') {
      return (subtotal * coupon.discount) / 100;
    } else if (coupon.type === 'fixed') {
      return Math.min(coupon.discount, subtotal);
    }

    return 0;
  }

  applyCoupon(code, subtotal) {
    const coupon = this.validateCoupon(code);
    const discount = this.calculateDiscount(coupon, subtotal);

    return {
      coupon,
      discount,
      newSubtotal: subtotal - discount
    };
  }

  addCoupon(code, discount, type = 'percentage') {
    if (!code || !discount || discount <= 0) {
      throw new Error('Invalid coupon parameters');
    }

    if (type !== 'percentage' && type !== 'fixed') {
      throw new Error('Invalid coupon type');
    }

    this.coupons.set(code.toUpperCase(), { code: code.toUpperCase(), discount, type });
  }

  removeCoupon(code) {
    return this.coupons.delete(code.toUpperCase());
  }
}
