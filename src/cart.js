// Shopping cart module - existing functionality
export class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity = 1) {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    if (!product.id || !product.name || !product.price) {
      throw new Error('Invalid product');
    }

    const existingItem = this.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    return this.items.length;
  }

  removeItem(productId) {
    const index = this.items.findIndex(item => item.product.id === productId);

    if (index === -1) {
      throw new Error('Product not found in cart');
    }

    this.items.splice(index, 1);
    return this.items.length;
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    const item = this.items.find(item => item.product.id === productId);

    if (!item) {
      throw new Error('Product not found in cart');
    }

    item.quantity = quantity;
    return item.quantity;
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clear() {
    this.items = [];
  }

  getItems() {
    return [...this.items];
  }
}
