import React, { useState, useRef, useEffect,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faTrash } from '@fortawesome/free-solid-svg-icons';

import { StickerContext } from '../../context/CreateContext';

const fontFamilies = [
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Palatino',
    'Garamond',
    'Bookman',
    'Comic Sans MS',
    'Trebuchet MS',
    'Arial Black',
    'Impact'
];




import React from 'react'

export const Style = () => {
    const {arrayObjectsLayer,selectedObject,setHistory,setArrayObjectsLayer,setSelectedObject,setindexHistory} = useContext(StickerContext);
    const index = arrayObjectsLayer.findIndex(item => item.id === selectedObject.id);
    

    const removeItem=()=>{
        if (index){
            let updateArray=arrayObjectsLayer.filter((each)=>each.id!==selectedObject.id)
            setArrayObjectsLayer(updateArray)
            setSelectedObject(null)
            setHistory(prevHistory => prevHistory.concat([updateArray]));
            setindexHistory(prevIndex => prevIndex + 1);
        }

    }

    const changeStyle = (style) => {
        
        if (arrayObjectsLayer[index]){
            let updateObject={...arrayObjectsLayer[index]}
            updateObject.fontStyle=style
            
            setSelectedObject(updateObject)
            arrayObjectsLayer[index]=updateObject
            setArrayObjectsLayer(arrayObjectsLayer)
            setHistory(prevHistory => prevHistory.concat([arrayObjectsLayer]));
            setindexHistory(prevIndex => prevIndex + 1);
        }    
    };
    return (
        <div>
            <div className="flex bg-white-500 shadow-lg p-2 h-11 " >
            <div>
            <select id="fontFamily" className="h-5 ml-2 mr-3">
                {fontFamilies.map((fontFamily, index) => (
                <option key={index} value={fontFamily}>{fontFamily}</option>
                ))}
            </select>
            </div>
            <div  onClick={() =>
                changeStyle(
                arrayObjectsLayer[index] &&
                    arrayObjectsLayer[index].fontStyle == "bold"
                    ? "normal"
                    : "bold"
                ) }
                 style={
                    arrayObjectsLayer[index] &&
                    arrayObjectsLayer[index].fontStyle == "bold"
                    ? { backgroundColor: "grey" }
                    : {}
                } className="mr-3"><FontAwesomeIcon icon={faBold}/>
            </div>
            <div >
                <FontAwesomeIcon icon={faTrash} onClick={removeItem}/>
            </div>
            </div>
        </div>
    )

}
