import { useState } from "react";
import { CartItem, Item } from "../types";
import Cart from "./Cart";
import ItemCard from "./ItemCard";

interface ShopProps {
  allItems: Item[];
}

export default function Shop({ allItems }: ShopProps) {
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);

  const handleAddToCart = ({
    itemId,
    quantity,
  }: {
    itemId: number;
    quantity: number;
  }) => {
    const targetItem = allItems.find((item) => item.id === itemId);
    if (targetItem) {
      if (cartItems.find((item) => item.id === itemId)) {
        setCartItems(
          cartItems.map((item) => {
            if (item.id === itemId) {
              return { ...item, quantity: item.quantity + quantity };
            }
            return item;
          })
        );
      } else {
        setCartItems([...cartItems, { ...targetItem, quantity }]);
      }
    }
  };

  const handleRemoveFromCart = ({ itemId }: { itemId: number }) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantityInCart = ({
    itemId,
    change,
  }: {
    itemId: number;
    change: number;
  }) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + change }
          : item
      )
    );
  };

  return (
    <div className="flex w-full flex-col gap-8 p-4">
      <Cart
        items={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantityInCart}
      />
      <div role="list" className="grid w-full grid-cols-1 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}
