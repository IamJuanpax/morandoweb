
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    id: string; // Product ID
    name: string;
    price: number;
    image: string;
    quantity: number;
    maxStock: number;
}

interface CartState {
    items: CartItem[];
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    calculateTotal: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isCartOpen: false,
            total: 0,
            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),
            addItem: (item) => {
                const { items } = get();
                const existingItem = items.find((i) => i.id === item.id);

                if (existingItem) {
                    if (existingItem.quantity + item.quantity > existingItem.maxStock) {
                        // Optional: Toast error here
                        return;
                    }
                    set({
                        items: items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    });
                } else {
                    set({ items: [...items, item] });
                }
                get().calculateTotal();
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
                get().calculateTotal();
            },
            updateQuantity: (id, quantity) => {
                const { items } = get();
                const item = items.find((i) => i.id === id);
                if (!item) return;

                if (quantity <= 0) {
                    set({ items: items.filter((i) => i.id !== id) });
                } else if (quantity > item.maxStock) {
                    // Cap at max stock
                    set({
                        items: items.map((i) =>
                            i.id === id ? { ...i, quantity: item.maxStock } : i
                        ),
                    });
                } else {
                    set({
                        items: items.map((i) =>
                            i.id === id ? { ...i, quantity: quantity } : i
                        ),
                    });
                }
                get().calculateTotal();
            },
            clearCart: () => set({ items: [], total: 0 }),
            calculateTotal: () => { // Helper, not exposed in interface necessarily but good to have logic
                const { items } = get();
                const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                set({ total });
            }
        }),
        {
            name: 'morando-cart-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.calculateTotal(); // Recalculate on load
            }
        }
    )
);


