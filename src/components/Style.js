import React, { useState, useRef, useEffect,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faTrash,faMinus,faPlus } from '@fortawesome/free-solid-svg-icons';

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
    const [color,setColor]=useState('#000000')
    const [fontFamily, setFontFamily] = useState('Arial');
    const {arrayObjectsLayer,selectedObject,setHistory,setArrayObjectsLayer,setSelectedObject,setindexHistory} = useContext(StickerContext);
    let index;
    if (selectedObject){
        index = arrayObjectsLayer.findIndex(item => item.id === selectedObject.id);
    }
    
    

    const removeItem=()=>{
        console.log("Delete of Element ",index)
        console.log("return the selectElement",selectedObject)
        if (selectedObject){
            let updateArray=arrayObjectsLayer.filter((each)=>each.id!==selectedObject.id)
            console.log("return the UpdateArray", updateArray)
            setArrayObjectsLayer(updateArray)
            setHistory(prevHistory => prevHistory.concat([updateArray]));
            setindexHistory(prevIndex => prevIndex + 1);
            setSelectedObject(null)
        }

    }

    const setUnderline = underline => {
        if (arrayObjectsLayer[index]){
            let updateObject={...arrayObjectsLayer[index]}
            updateObject.textDecoration=underline
            
            setSelectedObject(updateObject)
            arrayObjectsLayer[index]=updateObject
            setArrayObjectsLayer(arrayObjectsLayer)
            setHistory(prevHistory => prevHistory.concat([arrayObjectsLayer]));
            setindexHistory(prevIndex => prevIndex + 1);
        }  
      };
    
    const ChangeFontSize=(fontText)=>{
        
        if (arrayObjectsLayer[index]){
            let updateObject={...arrayObjectsLayer[index]}
            const prev= updateObject.fontSize
            if (prev>6 && fontText==="Decrement"){
                updateObject.fontSize = prev-2
            }else if (prev<100 && fontText==="Increment"){
                updateObject.fontSize=prev+2
            }
            
            setSelectedObject(updateObject)
            arrayObjectsLayer[index]=updateObject
            setArrayObjectsLayer(arrayObjectsLayer)
            setHistory(prevHistory => prevHistory.concat([arrayObjectsLayer]));
            setindexHistory(prevIndex => prevIndex + 1);
        } 

    }

    const changeFontFamily=(event)=>{
        setFontFamily(event.target.value)
        if (arrayObjectsLayer[index]){
            let updateObject={...arrayObjectsLayer[index]}
            updateObject.fontFamily=fontFamily
            
            setSelectedObject(updateObject)
            arrayObjectsLayer[index]=updateObject
            setArrayObjectsLayer(arrayObjectsLayer)
            setHistory(prevHistory => prevHistory.concat([arrayObjectsLayer]));
            setindexHistory(prevIndex => prevIndex + 1);
        }  
    }

    const handleColorChange = (event) => {
        setColor(event.target.value);
        if (arrayObjectsLayer[index]){
            let updateObject={...arrayObjectsLayer[index]}
            updateObject.fill=color
            
            setSelectedObject(updateObject)
            arrayObjectsLayer[index]=updateObject
            setArrayObjectsLayer(arrayObjectsLayer)
            setHistory(prevHistory => prevHistory.concat([arrayObjectsLayer]));
            setindexHistory(prevIndex => prevIndex + 1);
        } 

      };
    

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
            <select id="fontFamily" className="h-5 ml-2 mr-3 border-black-500" value={fontFamily} onChange={changeFontFamily} >
                {fontFamilies.map((fontFamily, index) => (
                <option key={index} value={fontFamily}>{fontFamily}</option>
                ))}
            </select>
            </div>
            <div className="mr-1" onClick={(e)=>{ChangeFontSize("Decrement")}}>
                <FontAwesomeIcon icon={faMinus} className="w-3" />
            </div>

            <div>
                {selectedObject && selectedObject.type==="text"?<p className="mx-1">{selectedObject.fontSize}</p>:<p className="mx-1">18</p>}
            </div>
            <div className="mr-3" onClick={(e)=>{ChangeFontSize("Increment")}}>
                <FontAwesomeIcon icon={faPlus} className="w-3" />
            </div>
            <div>
               <input type="color" className="w-5 h-5 mr-3" value={setColor} 
               onChange={handleColorChange} />
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
            <div
              className="containerIconeToolbar mr-3"
              onClick={() =>
                changeStyle(
                  arrayObjectsLayer[index] &&
                    arrayObjectsLayer[index].fontStyle == "italic"
                    ? "normal"
                    : "italic"
                )
              }
              style={
                arrayObjectsLayer[index] &&
                  arrayObjectsLayer[index].fontStyle == "italic"
                  ? { backgroundColor: "grey" }
                  : {}
              }
            >
              <FontAwesomeIcon icon={faItalic}/>
            </div>
            <div
              className="containerIconeToolbar mr-3"
              onClick={() =>
                setUnderline(
                  arrayObjectsLayer[index] &&
                    arrayObjectsLayer[index].textDecoration == "underline"
                    ? ""
                    : "underline"
                )
              }
              style={
                arrayObjectsLayer[index] &&
                  arrayObjectsLayer[index].textDecoration == "underline"
                  ? { backgroundColor: "grey" }
                  : {}
              }
            >
            <FontAwesomeIcon icon={faUnderline}/>
            </div>
            <div >
                <FontAwesomeIcon icon={faTrash} onClick={removeItem}/>
            </div>
            </div>
        </div>
    )

}
