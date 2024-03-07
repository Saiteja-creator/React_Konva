
import React, { createRef, useState, useCallback,useContext } from "react";
import useImage from "use-image";
import { stickersData } from "../../stickerdata";
import { StickerContext } from "../../context/CreateContext";
import { v4 as uuidv4 } from 'uuid';



const StickerImage=()=>{
    const {setArrayObjectsLayer,setSelectedObject } = useContext(StickerContext);
    return (
        <div className="flex justify-center flex-wrap">
           
            {stickersData.map((sticker) => {
                return (
                
                <button
                    className="button"
                    onMouseDown={() => {
                    const idres=uuidv4()
                    setArrayObjectsLayer((prevArray)=>[...prevArray,{
                        id:idres,
                        src: sticker.url,
                        width: sticker.width,
                        height:150,
                        x: 40,
                        y: 40,
                        type:"StickerImage"
                    }])
                    setSelectedObject({
                        id:idres,
                        src: sticker.url,
                        width: sticker.width,
                        height:150,
                        x: 40,
                        y: 40,
                        type:"StickerImage"
                    })

                    }}
                >
                    <img alt={sticker.alt} src={sticker.url} width={sticker.width} className="mr-2" />
                </button>
                );
            })}
               
           
        </div>
    )
}


export default StickerImage