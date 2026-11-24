import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedAccessories?: Array<{
    id: number;
    name: string;
    price: number;
  }>;
  priceVariation?: {
    name: string;
    price: number;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  // Por posição: o mesmo produto pode estar no carrinho com variações diferentes
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      // Verificar se o item já existe no carrinho
      const existingItem = prev.find(
        (i) =>
          i.id === item.id &&
          JSON.stringify(i.selectedAccessories) === JSON.stringify(item.selectedAccessories) &&
          JSON.stringify(i.priceVariation) === JSON.stringify(item.priceVariation)
      );

      if (existingItem) {
        // Se existe, aumenta a quantidade
        return prev.map((i) =>
          i.id === existingItem.id &&
          JSON.stringify(i.selectedAccessories) === JSON.stringify(item.selectedAccessories) &&
          JSON.stringify(i.priceVariation) === JSON.stringify(item.priceVariation)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        // Se não existe, adiciona novo item
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const itemPrice = item.priceVariation?.price || item.price;
      const accessoriesTotal = item.selectedAccessories?.reduce(
        (sum, acc) => sum + acc.price,
        0
      ) || 0;
      return total + (itemPrice + accessoriesTotal) * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

