import React from 'react'
import Button from './Button'

const list = ["all","cricket","soccer","songs","live","gaming","cooking","science"];

const ButtonList = () => {
  return (
    <div>
      {list.map((items,index)=>{
        return <Button key={index} name={items}/>
      })}
    </div>
  )
}

export default ButtonList