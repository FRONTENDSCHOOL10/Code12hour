export const cart = new Proxy(JSON.parse(localStorage.getItem('cartItems') || '[]'), {
  set(target, property, value) {
    target[property] = value;
    localStorage.setItem('cartItems', JSON.stringify(target));
    document.dispatchEvent(new CustomEvent('cartUpdated', { detail: target.length }));
    return true;
  },
});

export function addToCart(item) {
  cart.push(item);
}
