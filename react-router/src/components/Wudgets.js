import React from 'react';
import Wudget from './Wudget';
const Wudgets =({prods})=>{
    return (
    <div>
     
      {prods.map(prod=>(
        <Wudget name={prod.name} price={prod.price} />
  
      ))}
    </div>
    )};
  
  
  export default Wudgets;