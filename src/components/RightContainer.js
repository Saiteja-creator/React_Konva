import React, { useState, useRef, useEffect,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
import Konva from "konva";
import Draggable from "react-draggable";
import { Stage, Layer,Text,Rect } from "react-konva";
// import { CirclePicker } from "react-color";
// import ColorPickerPalette from "components/ColorPickerPalette";
import { StickerContext } from "../../context/CreateContext";
import SingleImage from "./SingleImage";
import { IndividualStickerData } from "./IndividualStickerData";
import { FaUndo, FaRedo } from 'react-icons/fa';
// import { DropImage } from "components/DropImage";
// import uuidv1 from "uuid/v1";
// import KeyboardEventHandler from "react-keyboard-event-handler";

import { Texto } from "./Texto";

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

export const RightContainer = () => {

  const {arrayObjectsLayer, setArrayObjectsLayer,setSelectedObject,selectedObject} = useContext(StickerContext);
  console.log(arrayObjectsLayer)
  
  const [zoom, setZoom] = useState(2);
  const [showPallet, setShowPallet] = useState(false);
  const [backgroundOn, setBackgroundOn] = useState(true);
  const [indexTextSelected,setIndexTextSelected]= useState(0)
  const stageRef = useRef();
  const containerCanvas = useRef();
  var HISTORY = [];
  var POSITION = 0;

  // const saveHistory = history => {
  //   const remove = (HISTORY.length - 1) - POSITION;
  //   HISTORY.splice(HISTORY.length - remove);
  //   HISTORY.push(history.slice(0));
  //   POSITION = HISTORY.length - 1;
  // };
  const saveHistory = (history) => {
    const remove = (HISTORY.length - 1) - POSITION;
    HISTORY = HISTORY.slice(0, HISTORY.length - remove);
    HISTORY.push(history.slice(0));
    POSITION = HISTORY.length - 1;
  };

  const revertHistory = () => HISTORY[POSITION];

  const handleTextEdit = (e, index) => {
    
    arrayObjectsLayer[index].textValue = e.target.value;
    console.log(e.target.value,"handle index edit")
    saveHistory(arrayObjectsLayer)

    setArrayObjectsLayer(arrayObjectsLayer)
  };
  
  const changeFontSize=(event)=>{

    arrayObjectsLayer[indexTextSelected].fontSize = parseInt(
      event.target.value
    );

    saveHistory(arrayObjectsLayer);
    setArrayObjectsLayer(arrayObjectsLayer)

  }

  const changeStyle = (style) => {

    if (arrayObjectsLayer[indexTextSelected])
      arrayObjectsLayer[indexTextSelected].fontStyle = style;
    saveHistory(arrayObjectsLayer);
    setArrayObjectsLayer(arrayObjectsLayer)
  };

  const setUnderline = (underline) => {
    
    if (arrayObjectsLayer[indexTextSelected])
      arrayObjectsLayer[indexTextSelected].textDecoration = underline;
    saveHistory(arrayObjectsLayer);

    setArrayObjectsLayer(arrayObjectsLayer)
  };


  const setArrayObject = (arrayObjectsLayer) => {
    saveHistory(arrayObjectsLayer);

    setArrayObjectsLayer(arrayObjectsLayer)
  };

  const  handleTextDblClick = (e, index) => {
    const absPos = e.target.getAbsolutePosition();
    const stageBox = stageRef.current.container().getBoundingClientRect();
    
    for (let i; i < arrayObjectsLayer.length; i++) {
      arrayObjectsLayer[i].textEditVisible = false;
    }
    arrayObjectsLayer[index].textEditVisible = true;
    arrayObjectsLayer[index].textXTextArea =
      (stageBox.left + absPos.x + containerCanvas.current.scrollLeft) /
      zoom;
    arrayObjectsLayer[index].textYTextArea =
      stageBox.bottom +
      absPos.y -
      stageBox.height +
      40 +
      containerCanvas.current.scrollTop;
    saveHistory(arrayObjectsLayer);

    setArrayObjectsLayer(arrayObjectsLayer)
  };

  const selectShape = (selectedObject, index = undefined) => {
    console.log("dentro");
    
    // fecha a text area do texto
    for (let i = 0; i < arrayObjectsLayer.length; i++) {
      arrayObjectsLayer[i].textEditVisible = false;
    }
    if (index) {
      setIndexTextSelected(index - 1); // Update indexTextSelected using the setter function
      arrayObjectsLayer[index - 1].textEditVisible = false;
    } else {
      if (arrayObjectsLayer[indexTextSelected]) {
        arrayObjectsLayer[indexTextSelected].textEditVisible = false;
        setIndexTextSelected(null); // Reset indexTextSelected using the setter function
      }
    }

    setSelectedObject(selectedObject);
    setArrayObjectsLayer(arrayObjectsLayer);
  };
  const handleExport = () => {
    const stage = stageRef.current.getStage();
    console.log(`return the response of stage${stage}`)
    const dataURL = stage.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = dataURL;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const desfazer = () => {
    console.log(HISTORY,)
    POSITION = POSITION === 0 ? POSITION : POSITION - 1;
    console.log(POSITION)
    const history = revertHistory();
    console.log(history,"return  the history")
    setArrayObjectsLayer(history.slice(0));
  };

  const refazer = () => {
    POSITION = POSITION < HISTORY.length - 1 ? POSITION + 1 : POSITION;
    const history = revertHistory();
    setArrayObjectsLayer(history.slice(0));
  };


  



  return (
    <div>
      <div className='flex justify-between p-3 shadow-lg  '>
        <h3 className='font-bold'>Post for Customer misssing order cycle</h3>
        <div className="flex align-middle">
          <FaUndo  className="mt-2 mr-2" onClick={desfazer}/>
          <FaRedo className="mt-2 mr-2" onClick={refazer}/>
          <button type="button" className='bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-white border border-blue-600 hover:border-transparent rounded-full py-1 px-4 transition duration-300 ease-in-out' onClick={handleExport} >Download</button>
        </div>
       
      </div>
      <hr className='w-full border-gray-500'/>
      <div className=''>
        <div className="" ref={containerCanvas}>
           <div className="flex bg-blue-200 p-2 h-11 " >
            <div>
              <select id="fontFamily" className="h-5 ml-2 mr-3">
                {fontFamilies.map((fontFamily, index) => (
                  <option key={index} value={fontFamily}>{fontFamily}</option>
                ))}
              </select>
            </div>
            <div className="containerIconeToolbar mr-2">
              <div className="containerOpcao">
                {arrayObjectsLayer[indexTextSelected] ? (
                  <select
                    disabled={!arrayObjectsLayer[indexTextSelected]}
                    value={arrayObjectsLayer[indexTextSelected].fontSize}
                    onChange={changeFontSize}
                  >
                    {[...new Array(100)].map(
                      (i, index) =>
                        index > 5 && (
                          <option
                            key={index}
                            onClick={() =>
                              changeFontSize(`${index * zoom}px`)
                            }
                            value={index}
                          >
                            {`${index}px`}
                          </option>
                        )
                    )}
                  </select>
                ) : (
                  <select
                    disabled={true}
                    value={28}
                    onChange={changeFontSize}
                  />
                )}
              </div>
            </div>
            <div className="containerIconeToolbar mr-3"
              onClick={() =>
                changeStyle(
                  arrayObjectsLayer[indexTextSelected] &&
                    arrayObjectsLayer[indexTextSelected].fontStyle == "bold"
                    ? "normal"
                    : "bold"
                )
              }
              style={
                arrayObjectsLayer[indexTextSelected] &&
                arrayObjectsLayer[indexTextSelected].fontStyle == "bold"
                  ? { backgroundColor: "grey" }
                  : {}
              }>
            <FontAwesomeIcon icon={faBold}  />
            </div>
            <div
              className="containerIconeToolbar mr-3"
              onClick={() =>
                changeStyle(
                  arrayObjectsLayer[indexTextSelected] &&
                    arrayObjectsLayer[indexTextSelected].fontStyle == "italic"
                    ? "normal"
                    : "italic"
                )
              }
              style={
                arrayObjectsLayer[indexTextSelected] &&
                arrayObjectsLayer[indexTextSelected].fontStyle == "italic"
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
                  arrayObjectsLayer[indexTextSelected] &&
                    arrayObjectsLayer[indexTextSelected].textDecoration ==
                      "underline"
                    ? ""
                    : "underline"
                )
              }
              style={
                arrayObjectsLayer[indexTextSelected] &&
                arrayObjectsLayer[indexTextSelected].textDecoration ==
                  "underline"
                  ? { backgroundColor: "grey" }
                  : {}
              }
            >
              <FontAwesomeIcon icon={faUnderline}/>
            </div>
           </div>
          
           <div className="ml-14 mt-5 mr-14 bg-gray-300">
              <Stage scaleY={1 / zoom}
                scaleX={1 / zoom}
                ref={stageRef}
                width={1000}
                height={480}  
                onMouseDown={(e) => {
                  // deselect when clicked on empty area
                  console.log(e.target);
                  console.log(e.target.getStage());
                  const clickedOnEmpty = e.target === e.target.getStage();
                  if (clickedOnEmpty) {
                    selectShape(null);
                  }
                }}>
                 <Layer>
                 <Rect
      
                      fill="lightgray"
                      onMouseDown={e => {
                      //deselect when clicking an empty area
                      const clickedOnEmpty = e.target === e.target.getStage();
                      if(clickedOnEmpty) {
                        selectShape(null);
                      }
                    }}
                    />
                   {arrayObjectsLayer && arrayObjectsLayer.map((item,index)=>{
                    return item.type === "text" ? (<Texto
                      key={index}
                      onSelect={() => {
                        selectShape(item, index + 1);
                      }}
                      shapeProps={item}
                      isSelected={
                        selectedObject && item.id === selectedObject.id
                      }
                      handleTextDblClick={(e) =>
                        handleTextDblClick(e, index)
                      }
                      onChange={(newAttrs) => {
                        const item = arrayObjectsLayer.slice();
                        item[index] = newAttrs;
                        setArrayObject(item);
                      }}
                    />):item.type === 'StickerImage' ?
                      
                    (<IndividualStickerData
                      key={index}
                      imageProps={item}
                      isSelected={
                        selectedObject && item.id === selectedObject.id
                      }
                      onSelect={() => {
                        selectShape(item);
                      }}
                      onChange={newAttrs => {
                        const item = arrayObjectsLayer.slice();
                        item[index] = newAttrs;
                        setArrayObject(item);
                      }}
                    />):item.type === 'uploadImage' ?
                      (<SingleImage
                        key={index}
                        imageProps={item}
                        isSelected={
                          selectedObject && item.id === selectedObject.id
                        }
                        onSelect={() => {
                          selectShape(item);
                        }}
                        onChange={newAttrs => {
                          const item = arrayObjectsLayer.slice();
                          item[index] = newAttrs;
                          setArrayObject(item);
                        }}
                      />):false
                   })}
                 </Layer>
              </Stage>
           </div>
           {arrayObjectsLayer &&
            arrayObjectsLayer.map((item, index) => {
              return item ? (
                <textarea
                  key={index}
                  value={item.textValue}
                  style={{
                    display: item.textEditVisible ? "block" : "none",
                    position: "absolute",
                    top: item.textYTextArea + "px",
                    left: item.textXTextArea * zoom + "px",
                    width: item.width * (1 / zoom),
                    height: item.height * (1 / zoom),
                    fontSize: item.fontSize * (1 / zoom),
                    color: item.fill,
                    fontStyle: item.fontStyle,
                    fontWeight: item.fontStyle
                  }}
                  onChange={e => handleTextEdit(e, index)}
                />
              ) : (
                  false
                );
            })}
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}
