
import React, { createRef, useState, useCallback,useContext } from "react";
import useImage from "use-image";
import { stickersData } from "../../stickerdata";
import { StickerContext } from "../../context/CreateContext";



const StickerImage=()=>{
    const {addStickerToPanel } = useContext(StickerContext);
    return (
        <div className="flex justify-center flex-wrap">
           
            {stickersData.map((sticker) => {
                return (
                
                <button
                    className="button"
                    onMouseDown={() => {
                    addStickerToPanel({
                        src: sticker.url,
                        width: sticker.width,
                        x: 40,
                        y: 40,
                        type:"Image"
                    });
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