
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantitys, setTotalQuantitys] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantitys((prevTotalQuantitys) => prevTotalQuantitys + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity)
    setTotalQuantitys(prevTotalQuantitys =>  prevTotalQuantitys -foundProduct.quantity)
    setCartItems(newCartItems)
  }

  const toggleCartItemQuantity = (id, value) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === id) {
        if (value === "inc") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (value === "dec") {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
      }
      return item;
    });
  
    setCartItems(updatedCartItems);
    const updatedTotalPrice = updatedCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const updatedTotalQuantity = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalPrice(updatedTotalPrice);
    setTotalQuantitys(updatedTotalQuantity);
  };

  // const toggleCartItemQuantity = (id, value) => {
  //   foundProduct = cartItems.find((item) => item._id === id);
  //   index = cartItems.findIndex((product) => product._id === id);
  //   const newCartItems = cartItems.filter((item) => item._id !== id)

  //   if (value === "inc") {
  //     setCartItems([
  //       ...newCartItems,
  //       { ...foundProduct, quantity: foundProduct.quantity + 1 },
  //     ]);
  //     setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
  //     setTotalQuantitys((prevTotalQuantitys) => prevTotalQuantitys + 1);
  //   } else if (value === "dec") {
  //     if (foundProduct.quantity > 1) {
  //       setCartItems([
  //         ...newCartItems,
  //         { ...foundProduct, quantity: foundProduct.quantity - 1 },
  //       ]);
  //       setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
  //       setTotalQuantitys((prevTotalQuantitys) => prevTotalQuantitys - 1);
  //     }
  //   }
  // };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantitys,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantitys,
        setShowCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
