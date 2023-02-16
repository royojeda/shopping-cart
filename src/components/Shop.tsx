import { useState } from "react";
import { CartItem, Item } from "../types";
import Cart from "./Cart";
import CartItemCard from "./CartItemCard";
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
    <div className="w-full pt-[104px]">
      <div className="fixed inset-x-0 top-0 bg-neutral-800 p-8 shadow-md shadow-neutral-900">
        <Cart
          totalPrice={cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
          itemCount={cartItems.length}
        >
          {cartItems.length ? (
            <>
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantityInCart}
                />
              ))}
            </>
          ) : null}
        </Cart>
      </div>
      <div className="w-full p-4">
        <div role="list" className="grid w-full grid-cols-1 gap-8">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
