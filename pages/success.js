import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/util";

const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantitys } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantitys(0)
    runFireworks();
  },[])

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon"><BsBagCheckFill /></p>
        <h2>Thank You For Your Order!</h2>
        <p className="email-msg">Check Your Email For The Receipt!</p>
        <p className="description">
            If you have any questions, Please email
            <a className="email" href="mailto:abdulc317@gmail.com">
              abdulc317@gmail.com
            </a>
        </p>
        <Link href="/">
            <button type="button" width="300px" className="btn">
                Continue Shopping
            </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
