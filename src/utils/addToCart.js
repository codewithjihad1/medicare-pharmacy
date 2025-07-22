
const addToCart = (medicine) => {
    const getCartItems = localStorage.getItem('cartItems');

    if (getCartItems) {
        const cartItems = JSON.parse(getCartItems);
        const existingItem = cartItems.find(item => item.id === medicine.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...medicine, quantity: 1 });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
        const newCartItems = [{ ...medicine, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
};

export default addToCart;
