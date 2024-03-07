import React,{useState} from 'react'
import StickerImage from './StickerImage'
import { TextTab } from './TextTab'

import { ImportImage } from './ImportImage'

const LeftPageNav=[
  {id:"STICKERS",text:"stickers"},
  {id:"TEXT",text:"text"},
  {id:"IMAGE", text:"Image"}
]

export const LeftPage = () => {
  const [Tab,setTab] = useState(LeftPageNav[1].id)
  return (
    <div className='ml-4 '>
      <div>
        <h4 className='text-center font-bold px-3 pt-4 pb-4 translate-x-0'>Back to Templates</h4>
      </div>
      <hr className='w-full border-gray-500'/>
      <div>
        <div className='flex justify-between'>
           {LeftPageNav.map((eachTab,index)=>(
            key={index},
            <button type="button" className={`mr-3 font-custom ${Tab === eachTab.id ? 'text-blue-500' : ''}`} onClick={()=>setTab(eachTab.id)}>{eachTab.text}</button>
           ))}
        </div>
        {Tab==="STICKERS" && <StickerImage/>}
        {Tab==="IMAGE" && <ImportImage/>}
        {Tab==="TEXT" && <TextTab/>}
      </div>
    </div>
  )
}
