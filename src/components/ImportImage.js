import React,{useState,useContext} from 'react'
import { StickerContext } from '../../context/CreateContext';
import { v1 as uuidv1 } from 'uuid';

export const ImportImage = () => {
    const uuid = uuidv1();
    const {setArrayObjectsLayer,setSelectedObject} = useContext(StickerContext);
    const handleImageLoad=(event)=>{
        const file=event.target.files;
        const newImages=[];

        for(let i=0;i<file.length;i++){
            const reader = new FileReader();
            reader.onload = (e) => {
                newImages.push({
                x: 10 + i * 50, 
                y: 10 + i * 50, 
                image: e.target.result,
                width:200,
                height:200,
                type:"uploadImage",
                id: `image_${uuid}`,
                });
                if (newImages.length === file.length) {
                    
                    setArrayObjectsLayer((prevArray)=>[...prevArray,...newImages]) 
                    setSelectedObject({
                        x: 10 + i * 50, 
                        y: 10 + i * 50, 
                        image: e.target.result,
                        width:200,
                        height:200,
                        type:"uploadImage",
                        id: `image_${uuid}`,
                        })// Update the state after all images are read
                }
            };
            reader.readAsDataURL(file[i]);
            
        }
       

        
        

    }

    
  
    return (
        <div>
            <div className='flex justify-center m-5'>
                <input type="file" accept="image/*" onChange={handleImageLoad} className='bg-transparent w-40 pr-20 hover:bg-blue-200 text-blue-300 font-semibold hover:text-white  border  hover:border-transparent rounded' />
            </div>
        </div>
    )
}


