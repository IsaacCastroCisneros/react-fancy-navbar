import React,{useContext} from 'react';

import { appContext } from '../App';

export default function Card(props) 
{
  const{createProductCart}=useContext(appContext)

  const{
    id,
    name,
    price,
    img,
    description,
  }=props

  return (
    <>
      <div className="text-white flex-1 bg-gray-900 min-h-[15rem] p-[1.5rem] flex flex-col gap-[.5rem] rounded-[.5rem]">
        <div className='w-[100%] h-[13rem] overflow-hidden'>
          <img src={img} alt="" className=" object-cover" />
        </div>
        <h3 className="font-bold capitalize">{name}</h3>
        <span className="block">{price}</span>
        <p className="block">{description}</p>
        <button className="block bg-slate-400 uppercase font-bold py-[.5rem] rounded-[.5rem] cursor-pointer hover:brightness-[110%] transition-all duration-[200ms] mt-[auto]"
         onClick={()=>createProductCart(id)}
        >
          comprar
        </button>
      </div>
    </>
  );
}
