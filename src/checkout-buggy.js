// Checkout module - BUGGY VERSION (with regression)
// This version has a bug introduced when adding coupon support
export class CheckoutService {
  constructor() {
    this.taxRate = 0.13; // 13% IVA (Costa Rica)
    this.orders = [];
  }

  calculateSubtotal(items) {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  calculateTax(subtotal, couponDiscount = 0) {
    // BUG INTRODUCED: Tax is now calculated on discounted amount!
    // This is WRONG - tax should be on original subtotal
    const taxableAmount = subtotal - couponDiscount;
    return taxableAmount * this.taxRate;
  }

  calculateTotal(items, couponDiscount = 0) {
    const subtotal = this.calculateSubtotal(items);
    const tax = this.calculateTax(subtotal, couponDiscount);
    return subtotal + tax - couponDiscount;
  }

  processOrder(cart, shippingAddress, paymentMethod, couponDiscount = 0) {
    if (!cart || cart.getItems().length === 0) {
      throw new Error('Cart is empty');
    }

    if (!shippingAddress || !shippingAddress.street) {
      throw new Error('Invalid shipping address');
    }

    if (!paymentMethod || !paymentMethod.type) {
      throw new Error('Invalid payment method');
    }

    const items = cart.getItems();
    const subtotal = this.calculateSubtotal(items);
    const tax = this.calculateTax(subtotal, couponDiscount);
    const total = this.calculateTotal(items, couponDiscount);

    const order = {
      id: this.orders.length + 1,
      items,
      subtotal,
      tax,
      total,
      couponDiscount,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      createdAt: new Date()
    };

    this.orders.push(order);
    cart.clear();

    return order;
  }

  getOrder(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  getAllOrders() {
    return [...this.orders];
  }
}
