import React,{useContext,useState,useRef} from "react";

import { appContext } from "../App";

export default function Navbar() 
{
  const{cartProducts,updateCartProducts}=useContext(appContext)
  const shopCartList = useRef();
  function totals()
  {
    const sums = cartProducts.reduce((tot,num)=>
    {
      return num.price*num.quantity + tot
    },0)
    return sums
  }
  function removeCartProduct(id)
  {
    const products = cartProducts.filter(prod=>prod.id!==Number(id));
    updateCartProducts(products)
  }
  window.addEventListener('click',(e)=>
  {
     if(e.target.closest('.active'))return
     if(e.target.closest('.shopCartContainer')===null)return shopCartList.current.classList.remove('active')
     shopCartList.current.classList.toggle('active')
     
  })

  return (
    <>
      <nav className="w-[90rem] text-white my-0 mx-auto max-w-[100%] flex justify-between">
        <span className="font-bold text-lg">fancy shopCart</span>
        <div className="relative shopCartContainer">
          <NavbarButton/>
          <div ref={shopCartList} className="shopCartList absolute top-[-.5rem] opacity-0 pointer-events-none flex flex-col right-0 p-[1.5rem] min-w-[15rem] min-h-[10rem] bg-slate-800 shadow-sm shadow-black rounded-[.5rem] gap-[.5rem] transition-all ease-out duration-[200ms]">
            {cartProducts.length === 0 && (
              <span className="block text-center">no products yet</span>
            )}
            {cartProducts.map((product) => {
              return (
               <NavbarProductList   e={e} removeCartProduct={removeCartProduct}  />
              );
            })}
            <NavbarTotals   totals={totals}  />
          </div>
        </div>
      </nav>
    </>
  );
}

function NavbarButton({}) 
{
  return (
    <button
      /* onClick={() => shopCartList.current.classList.toggle('active')} */
      className="text-[1.5rem] relative"
    >
      <i class="fa-solid fa-cart-shopping"></i>
      {cartProducts.length > 0 && (
        <span className="flex right-[-1.3rem] bottom-[-1rem] items-center justify-center absolute w-[2rem] h-[2rem] rounded-[100%] bg-pink-400 text-white">
          <span className=" text-[1rem] font-bold">
                {cartProducts.length}
          </span>
        </span>
      )}
    </button>
  );
}

function NavbarProductList({e, removeCartProduct}) 
{
      return (<div key={product.id} data-id={product.id} className="product relative flex p-[.5rem] gap-[.7rem] items-center bg-slate-700 rounded-[.3rem] w-[20rem]">
                  <button className="absolute text-[1.5rem] font-bold top-[.8rem] right-[.5rem] leading-[.5rem] hover:text-pink-400 transition-all ease-in-out duration-[200ms]" onClick={e => removeCartProduct(e.target.closest('.product').dataset.id)}>
                    &times;
                  </button>
                  <div className="w-[30%]">
                    <img className=" w-[100%]" src={product.img} alt="" />
                  </div>
                  <section className="flex flex-col flex-[2]">
                    <span className="font-bold">{product.name}</span>
                    <p className="text-[.8rem] flex">
                      <span>{product.price}</span>
                      <span className="mx-[.2rem]">x</span>
                      <span>{product.quantity}</span>
                      <span className="font-bold ml-[.5rem]">
                        Subtotal:{product.price * product.quantity}
                      </span>
                    </p>
                  </section>
                </div>);
}
    
function NavbarTotals({totals}) 
{
      return (<span className="block text-center text-[1.5rem]">
              <strong className="uppercase">total:</strong>
              &nbsp;
              <span>{totals()}</span>
            </span>);
}
  