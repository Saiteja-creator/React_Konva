import React, { useState, useRef, useEffect,useContext } from "react"
import SingleImage from "./SingleImage";
import { StickerContext } from "../../context/CreateContext";
import { FaUndo, FaRedo } from 'react-icons/fa';
import { Style } from "./Style";
import { Layer,Stage,Text,Rect } from "react-konva";
import { IndividualStickerData } from "./IndividualStickerData";
import { Texto } from "./Texto";

export const RightContainer = () => {
  const stageRef =useRef()
  const {setArrayObjectsLayer,selectedObject,arrayObjectsLayer,setSelectedObject,History,setHistory,indexHistory,setindexHistory} = useContext(StickerContext);
  
  


  // useEffect(()=>{
  //      setHistory((prev)=>[...prev])
  // },[arrayObjectsLayer,setArrayObjectsLayer])
  

  const setArrayObject=(items)=>{
   
    setArrayObjectsLayer(items)
    setHistory(prevHistory => prevHistory.concat([items]));
    setindexHistory(prevIndex => prevIndex + 1);

  }

  const handleUndo = () => {
    if (indexHistory > 0) {
      setindexHistory(prevIndex => prevIndex - 1);
      setArrayObjectsLayer(History[indexHistory - 1]);
    }
  };

  const handleRedo = () => {
    if (indexHistory < History.length - 1) {
      setindexHistory(prevIndex => prevIndex + 1);
      setArrayObjectsLayer(History[indexHistory + 1]);
    }
  };

  const selectShape=(item,index)=>{
    for (let i; i < arrayObjectsLayer.length; i++) {
      
      arrayObjectsLayer[i].textEditVisible = false;
    }
    setSelectedObject(item)
    
  }

  const handleExport = () => {
    setSelectedObject(null)
    const stage = stageRef.current.getStage();
    
    const dataURL = stage.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = dataURL;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTextDblClick=(e,index)=>{
    
    for (let i; i < arrayObjectsLayer.length; i++) {
          arrayObjectsLayer[i].textEditVisible=false
    }
    arrayObjectsLayer[index].textEditVisible = true;
    setArrayObjectsLayer(arrayObjectsLayer)
    setSelectedObject(arrayObjectsLayer[index])
    setHistory(prevHistory => prevHistory.concat([arrayObjectsLayer]));
    setindexHistory(prevIndex => prevIndex + 1);
  }
 

  
  

  return (
    <div>
      <div className='flex justify-between p-3 shadow-lg  '>
        <h3 className='font-bold'>Post for Customer misssing order cycle</h3>
        <div className="flex align-middle">
          <FaUndo  className="mt-2 mr-2" onClick={handleUndo}/>
          <FaRedo className="mt-2 mr-2" onClick={handleRedo}/>
          <button type="button" className='bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-white border border-blue-600 hover:border-transparent rounded-full py-1 px-4 transition duration-300 ease-in-out' onClick={handleExport}  >Download</button>
        </div>
       
      </div>
      <hr className='w-full border-gray-500'/>
      <Style/>
      <div className="bg-gray-300">
         
         <div className="my-10 ml-4">
            <Stage  ref={stageRef}
            width={1000}
            
            height={480}  onMouseDown={(e) => {
              // deselect when clicked on empty area
              
              const clickedOnEmpty = e.target === e.target.getStage();
              if (clickedOnEmpty) {
                setSelectedObject(null);
              }
            }}>
              <Layer>
                  <Rect width={window.innerWidth} height={window.innerHeight}
          
                  fill="white"
                  onMouseDown={e => {
                  //deselect when clicking an empty area
                  const clickedOnEmpty = e.target === e.target.getStage();
                  if(clickedOnEmpty) {
                    selectShape(null);
                  }
                }}
                />
                {arrayObjectsLayer && arrayObjectsLayer.map((item,index)=>{
                    return item.type === 'StickerImage' ?(
                      <IndividualStickerData
                      key={index}
                      imageProps={item}
                      isSelected={
                        selectedObject && item.id === selectedObject.id
                      }
                      onSelect={() => {
                        setSelectedObject(item);
                      }}
                      onChange={newAttrs => {
                        const items = arrayObjectsLayer.slice();
                        items[index] = newAttrs;
                        setArrayObject(items);
                      }}
                    />
                    ):item.type==="uploadImage"?(
                      <SingleImage
                        key={index}
                        imageProps={item}
                        isSelected={
                          selectedObject && item.id === selectedObject.id
                        }
                        onSelect={() => {
                          setSelectedObject(item);
                        }}
                        onChange={newAttrs => {
                          const items = arrayObjectsLayer.slice();
                          items[index] = newAttrs;
                          setArrayObject(items);
                        }}
                      />
                    ): item.type === "text" ? (<Texto
                      key={index}
                      onSelect={() => {
                        selectShape(item, index + 1);
                      }}
                      shapeProps={item}
                      isSelected={
                        selectedObject && item.id === selectedObject.id
                      }
                      handleTextDblClick={e =>
                        handleTextDblClick(e, index)
                      }
                      
                      onChange={(newAttrs) => {
                        const items = arrayObjectsLayer.slice();
                        items[index] = newAttrs;
                        setArrayObject(items);
                      }}
                    />):false
                })}
              </Layer>
            </Stage>
         </div>
      </div>
    </div>
  )
}
