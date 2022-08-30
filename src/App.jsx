import React,{ useState,useMemo,useEffect} from 'react';
import {useQuery} from 'react-query'
import {v4 as uuidv4} from 'uuid';

import Navbar from './components/Navbar';
import Card from './components/Card';

export const appContext = React.createContext();

const LOCAL_STORAGE_KEY = 'cart';

function App() 
{  
  const{data,status}=useQuery('products',getProducts);
  const[cartProducts,setCartProducts]=useState([])

  const contextValues =
  {
     createProductCart,
     cartProducts,
     updateCartProducts,
  }

  async function getProducts()
  {
    const data = await fetch('/assets/products.json')
    .then(res=> res.json())
    .then(data=> data)

    return data
  }

  useEffect(()=>
  {
     const local = localStorage.getItem(LOCAL_STORAGE_KEY)
     if(local!==null)setCartProducts(JSON.parse(local))
  },[])

  useEffect(()=>
  {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(cartProducts))
  },[cartProducts])

  if(status === "loading")
  {
     return <div>an error was occurred...</div>
  }
  if(status === "error")
  {
     return <div>an error was occurred...</div>
  }

  function createProductCart(id)
  {
    const exist = cartProducts.find(product=>product.id===id)

    if(exist!==undefined)
    {
      const newProducts = [...cartProducts];
      const product = newProducts.find(product=>product.id===exist.id);
      product.quantity++    
      setCartProducts(newProducts)
      return
    }

    const product = data.find(product=>product.id===id)

    const newCartProduct=
    {
      id,
      name:product.name,
      price:product.price,
      desc:product.description,
      type:product.type,
      img:product.img,
      quantity:1
    }

    setCartProducts([...cartProducts,newCartProduct])
  }

  function updateCartProducts(products)
  {
     setCartProducts(products)
  }

  
  return (
    <>
      <appContext.Provider value={contextValues}>
        <header className="block px-[2rem] py-5 bg-slate-900">
          <Navbar />
        </header>
        <main className="block p-[2rem] py-0">
          <div className="w-[90rem] my-0 mx-auto max-w-[100%]">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] p-[2rem] bg-slate-800 w-[100%] gap-[1rem] pt-[4rem]">
              {data.map((product) => {
                return (
                  <Card
                    key={uuidv4()}
                    {...product}
                    createProductCart={createProductCart}
                  />
                );
                //es este componente
              })}
            </div>
          </div>
        </main>
      </appContext.Provider>
    </>
  ); 
}

export default App
