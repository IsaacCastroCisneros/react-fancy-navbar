import React,{useContext,useState} from "react";

import { appContext } from "../App";

export default function Navbar() 
{
  const{cartProducts}=useContext(appContext)

  return (
    <>
      <nav className="w-[90rem] text-white my-0 mx-auto max-w-[100%] flex justify-between">
        <span className="font-bold text-lg">fancy shopCart</span>
        <button className="text-[1.5rem] relative">
          <i class="fa-solid fa-cart-shopping"></i>
          {
            cartProducts.length>0 && <span className="flex right-[-1.3rem] bottom-[-1rem] items-center justify-center absolute w-[2rem] h-[2rem] rounded-[100%] bg-pink-400 text-white">
              <span className=" text-[1rem] font-bold">
                {cartProducts.length}
              </span>
            </span>
          }
        </button>
      </nav>
    </>
  );
}
