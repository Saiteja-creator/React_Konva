
import React, { createRef, useState, useCallback,useContext } from "react";
import useImage from "use-image";
import { stickersData } from "../../stickerdata";
import { StickerContext } from "../../context/CreateContext";
import { v4 as uuidv4 } from 'uuid';



const StickerImage=()=>{
    const {addStickerToPanel,setArrayObjectsLayer,setSelectedObject } = useContext(StickerContext);
    return (
        <div className="flex justify-center flex-wrap">
           
            {stickersData.map((sticker) => {
                return (
                
                <button
                    className="button"
                    onMouseDown={() => {
                    addStickerToPanel({
                        id:uuidv4(),
                        src: sticker.url,
                        width: sticker.width,

                        x: 40,
                        y: 40,
                        type:"StickerImage"
                    });
                    setArrayObjectsLayer((prevArray)=>[...prevArray,{
                        id:uuidv4(),
                        src: sticker.url,
                        width: sticker.width,
                        height:150,
                        x: 40,
                        y: 40,
                        type:"StickerImage"
                    }])
                    setSelectedObject({
                        id:uuidv4(),
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