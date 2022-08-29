import React,{ useState,useMemo,useEffect} from 'react';
import {useQuery} from 'react-query'
import {v4 as uuidv4} from 'uuid';

import Navbar from './components/Navbar';
import Card from './components/Card';

export const appContext = React.createContext();

const LOCAL_STORAGE_KEY = 'cart';

function App() 
{  
  const{data,status}=useQuery(['products'],getProducts);
  const[cartProducts,setCartProducts]=useState([])

  const contextValues =
  {
     createProductCart,
     cartProducts
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


  async function createProductCart(id)
  {
    console.log('ff')
    const product = data.find(product=>product.id===id)

    const newCartProduct=
    {
      name:product.name,
      price:product.price,
      desc:product.description,
      type:product.type
    }
    console.log(newCartProduct)

    setCartProducts([...cartProducts,newCartProduct])
  }

  async function getProducts()
  {
    return fetch('/assets/products.json')
    .then(res=> res.json())
    .then(data=> data)
  }
/*   console.log(cartProducts) */
  
  return (
    <>
      <appContext.Provider value={contextValues}>
        <header className="block px-[2rem] py-5 bg-slate-900">
          <Navbar/>
        </header>
        <main className="block p-[2rem] py-0">
          <div className="w-[90rem] my-0 mx-auto max-w-[100%]">
            <div className="flex p-[2rem] bg-slate-800 w-[100%] gap-[1rem] pt-[4rem] flex-wrap">
              {data && data.map((product) => {
                  return <Card key={uuidv4()} {...product} />;
                })}
            </div>
          </div>
        </main>
      </appContext.Provider>
    </>
  ); 
}

export default App
