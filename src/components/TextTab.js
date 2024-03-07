import React,{useState,useContext} from 'react'
import { StickerContext } from '../../context/CreateContext';
import { v4 as uuidv4 } from 'uuid';

export const TextTab = () => {
  const [text,setText]= useState("")
  const {setArrayObjectsLayer,setSelectedObject } = useContext(StickerContext);

  const changeEl=(e)=>{
    setText(e.target.value)
    
  }
  const addButton=()=>{
    const uniqueId = Math.random().toString(36).substr(2, 9);
    

    const newText={
      textEditVisible: false,
      fill: "black",
      textX: 0,
      textY: 0,
      textYTextArea: 0,
      textXTextArea: 0,
      textValue: text,
      fontSize: 18,
      fontFamily:"Arial",
      width: 300,
      y: 100,
      x: 100,
      height: 100,
      fontStyle: "normal",
      align: "left",
      id: uniqueId ,
      type: 'text',
    }
    setArrayObjectsLayer((prevArray)=>[...prevArray,newText])
    setSelectedObject(newText)
    const length=setArrayObjectsLayer.length 
    
    
    
    setText("")
   
  }
  return (
    <div>
      <div className='flex my-3'>
        <textarea type="text" column={10} value={text} className='mr-1 h-6 border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:border-blue-300' onChange={changeEl}/>
        <button type="button" onClick={addButton}>Add</button>
      </div>
    </div>
  )
}
