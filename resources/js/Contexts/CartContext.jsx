import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from server if logged in, fallback to local storage
    useEffect(() => {
        const fetchCart = async () => {
            try {
                // Try fetching from database first
                const res = await axios.get('/api/cart');
                if (res.data && Array.isArray(res.data)) {
                    // Normalize the data (our local storage structure was a bit different)
                    // The DB cart items come back as {id, product_id, quantity, product: {...}}
                    const mappedItems = res.data.map(item => ({
                        cart_item_id: item.id,
                        quantity: item.quantity,
                        ...item.product
                    }));
                    setCartItems(mappedItems);
                    setIsLoaded(true);
                    return;
                }
            } catch (error) {
                // Not logged in or error, fallback to local
            }

            // Fallback
            const savedCart = localStorage.getItem('nexa_cart');
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch (e) { }
            }
            setIsLoaded(true);
        };

        fetchCart();
    }, []);

    // Save to local storage whenever cart items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('nexa_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoaded]);

    const addToCart = async (product) => {
        // Try saving to DB
        try {
            await axios.post('/cart', { product_id: product.id, quantity: 1 });
        } catch (error) { }

        // Optimistically update UI
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = async (productId) => {
        // Find cart item ID 
        const item = cartItems.find(i => i.id === productId);
        if (item && item.cart_item_id) {
            try {
                await axios.delete(`/cart/${item.cart_item_id}`);
            } catch (error) { }
        }

        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const item = cartItems.find(i => i.id === productId);
        if (item && item.cart_item_id) {
            try {
                await axios.put(`/cart/${item.cart_item_id}`, { quantity: newQuantity });
            } catch (error) { }
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const cartTotalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartSubtotal = cartItems.reduce((total, item) => {
        const price = item.discount_price || item.price;
        return total + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotalCount,
                cartSubtotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
