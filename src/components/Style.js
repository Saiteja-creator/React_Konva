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

// export const Style = () => {
//   const {arrayObjectsLayer,selectedObject,setHistory,setArrayObjectsLayer,setSelectedObject,indexTextSelected} = useContext(StickerContext);
  
//   console.log(selectedObject,indexTextSelected,"return the indexTexrt")

//   const changeFontSize=(event)=>{
//     let index=null
//     for (let i=0;i<arrayObjectsLayer.length;i++){
//         if (arrayObjectsLayer[i].id===selectedObject.id){
//             arrayObjectsLayer[i].fontSize=parseInt(
//                 event.target.value)
//             index=i 
            
//         }
//     }
    
//     setArrayObjectsLayer(arrayObjectsLayer)
//     if (index){
//         setSelectedObject(arrayObjectsLayer[index])
//     }

//   }


  
//   const handleDelete=()=>{
//     console.log(selectedObject.id,"return the selectedObjec")
//     if (selectedObject.id){
//         let updateArray = arrayObjectsLayer.filter(obj => {
//             return obj.id !== selectedObject.id;
//         });
//         setArrayObjectsLayer(updateArray)
//     }
    
//     setSelectedObject(null)

// }

//   const changeStyle = (style) => {

//     if (arrayObjectsLayer[indexTextSelected])
//       arrayObjectsLayer[indexTextSelected].fontStyle = style;
    
//     setArrayObjectsLayer(arrayObjectsLayer)
//     setSelectedObject(arrayObjectsLayer[indexTextSelected])
//   };

//   const setUnderline = (underline) => {
    
//     if (arrayObjectsLayer[indexTextSelected])
//       arrayObjectsLayer[indexTextSelected].textDecoration = underline;
    
//     setArrayObjectsLayer(arrayObjectsLayer)
//     setSelectedObject(arrayObjectsLayer[indexTextSelected])       
//   };
//   return (
//     <div>
//         <div className="flex bg-blue-200 p-2 h-11 " >
//         <div>
//         <select id="fontFamily" className="h-5 ml-2 mr-3">
//             {fontFamilies.map((fontFamily, index) => (
//             <option key={index} value={fontFamily}>{fontFamily}</option>
//             ))}
//         </select>
//         </div>
//         <div className="containerIconeToolbar mr-2">
//         <div className="containerOpcao">
//             {arrayObjectsLayer[indexTextSelected] ? (
//             <select
//                 disabled={!arrayObjectsLayer[indexTextSelected]}
//                 value={arrayObjectsLayer[indexTextSelected].fontSize}
               
//             >
//                 {[...new Array(100)].map(
//                 (i, index) =>
//                     index > 5 && (
//                     <option
//                         key={index}
//                         onClick={() =>
//                         changeFontSize(`${index * zoom}px`)
//                         }
//                         value={index}
//                     >
//                         {`${index}px`}
//                     </option>
//                     )
//                 )}
//             </select>
//             ) : (
//             <select
//                 disabled={true}
//                 value={28}
                
//             />
//             )}
//         </div>
//         </div>
//         <div className="containerIconeToolbar mr-3"
//         onClick={() =>
//             changeStyle(
//                 arrayObjectsLayer[indexTextSelected].fontStyle == "bold"
//                 ? "normal"
//                 : "bold"
//             )
//         }
//         style={
//             arrayObjectsLayer[indexTextSelected] &&
//             arrayObjectsLayer[indexTextSelected].fontStyle == "bold"
//             ? { backgroundColor: "grey" }
//             : {}
//         }>
//         <FontAwesomeIcon icon={faBold}  />
//         </div>
//         <div
//         className="containerIconeToolbar mr-3"
//         onClick={() =>
//             changeStyle(
//             arrayObjectsLayer[indexTextSelected] &&
//                 arrayObjectsLayer[indexTextSelected].fontStyle == "italic"
//                 ? "normal"
//                 : "italic"
//             )
//         }
//         style={
           
//             arrayObjectsLayer[indexTextSelected] &&
//             arrayObjectsLayer[indexTextSelected].fontStyle == "italic"
//             ? { backgroundColor: "grey" }
//             : {}
//         }
//         >
//         <FontAwesomeIcon icon={faItalic}/>
//         </div>
//         <div
//         className="containerIconeToolbar mr-3"
//         onClick={() =>
//             setUnderline(
//             arrayObjectsLayer[indexTextSelected] &&
//                 arrayObjectsLayer[indexTextSelected].textDecoration ==
//                 "underline"
//                 ? ""
//                 : "underline"
//             )
//         }
//         style={
//             arrayObjectsLayer[indexTextSelected] &&
//             arrayObjectsLayer[indexTextSelected].textDecoration ==
//             "underline"
//             ? { backgroundColor: "grey" }
//             : {}
//         }
//         >
//         <FontAwesomeIcon icon={faUnderline} className="mr-3" onClick={handleDelete}/>
//         <FontAwesomeIcon icon={faTrash}/>
//         </div>
        
//         </div>
       
//     </div>
//   )
// }


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
