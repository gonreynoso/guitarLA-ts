import { useEffect, useState, useMemo } from "react";
import { db } from "../dataBase/db";
import { Guitar, CartItem } from "../types";

export const useCart = () => {
  //aqui verifica si el carrito esta vacio y sino lo convierte en arreglo vacio
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? (JSON.parse(localStorageCart) as CartItem[]) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState<CartItem[]>(initialCart());
  const [showMaxMessage, setShowMaxMessage] = useState(false);

  const MAX_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: CartItem) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      //existe en el carrito
      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id: Guitar["id"]) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    const totalQuantity = updatedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    // Verificar si se alcanza el máximo de unidades
    if (totalQuantity >= MAX_ITEMS) {
      // Aquí puedes manejar la visibilidad del mensaje
      // por ejemplo, mediante un estado
      setShowMaxMessage(true);
    } else if (totalQuantity > MAX_ITEMS && showMaxMessage) {
      setShowMaxMessage(false);
    }

    // Actualizar el estado del carrito
    setCart(updatedCart);
  }

  function decreaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    // Actualizar el estado del carrito
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  //State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    showMaxMessage,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
