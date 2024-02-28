import React,{useState,useContext,useRef} from 'react'
import { Stage, Layer, Image } from "react-konva";
import { StickerContext } from '../../context/CreateContext';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import html2canvas from "html2canvas";

import { StickerContext } from "../../context/CreateContext";
import { IndividualSticker } from "./IndividualSticker";


const DynamicTextSticker=()=>{
    const [newText,setNewText] = useState()
    const {stickerImage,createTextToPanel} = useContext(StickerContext);
    const [texts,setTexts]=useState([])
    const dynamicRefs = useRef({});
    const stageRef = useRef();
    const shapesRefs =useRef({})
    
    
    const [activeId,setActiveId] =useState(null)

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
      ];


    const handleAddText=async()=>{
        if (newText.trim() !== "") {
            unqiue_id=uuidv4()
            createdObject={text: newText, x: 10, y: 10}
            setTexts([...texts, { id:unqiue_id, ...createdObject}]);
            // createTextToPanel({ id:unqiue_id,...createdObject })
            dynamicRefs.current[unqiue_id]=React.createRef(null)
            
            shapesRefs.current[unqiue_id]=React.createRef(null)
            console.log(dynamicRefs.current[unqiue_id],"onAddButton")
            setActiveId(unqiue_id)
            setNewText("")
        }
        
    }
    

    
    

    


    useEffect(()=>{
        console.log("useEffect")
        
        {texts.forEach((eachText)=>{
            
            
            index=(shapesRefs.current[eachText.id].current["index"])
            if (eachText.id===activeId){
                const quill = new Quill(dynamicRefs.current[eachText.id].current, {
                    modules: { toolbar: toolbarOptions },
                    placeholder: "Compose an epic...",
                    theme: "snow", // or 'bubble'
                });
               
                const width = window.innerWidth;
                const height = window.innerHeight;
                const stage = stageRef.current.getStage();
                stage.width(width);
                stage.height(height);
                const shape = shapesRefs.current[eachText.id].current;
                
                shape.position({ x: 10, y: 10 });
                shape.draggable(true);
                const renderText = () => {
                    html2canvas(dynamicRefs.current[eachText.id].current, {
                      backgroundColor: "rgba(0,0,0,0)",
                    }).then((canvas) => {
                      shape.image(canvas);
                      shape.getLayer().batchDraw();
                    });
                  };
                let timeout;
                const requestTextUpdate = () => {
                if (timeout) return;
                timeout = setTimeout(() => {
                    timeout = null;
                    renderText();
                }, 500);
                };
                quill.on("text-change", () => {
                    requestTextUpdate();
                  });
               
                renderText();
                return () => {
                    quill.off("text-change", requestTextUpdate);
                }; 
            }
            
        })}        

    },[activeId])
    
    handleImageClick=(id)=>{
        console.log(shapesRefs.current[id].current.value)
        setActiveId(id)
    }
    

    return (
        <div>
            <div>
                <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                
                />
                <button onClick={handleAddText}>Add Text</button>
                <div>
                    {texts.map((eachQuil)=>eachQuil.id ===activeId ? (
                        
                      
                            <div ref={dynamicRefs.current[eachQuil.id]}
                            style={{
                            maxWidth: "100%",
                            overflowWrap: "break-word",
                            whiteSpace: "pre-wrap", 
                            border: "none",
                            }}>{eachQuil.text}</div>) : (<></>)
                    )}
                </div>
                Render Stage
                <div>
                    <Stage ref={stageRef}
                        width={window.innerWidth}
                        height={window.innerHeight}
                        style={{ border: "1px solid grey" }}
                        >
                        <Layer>
                            {texts.map((eachReactText)=>(
                                <Image
                                ref={shapesRefs.current[eachReactText.id]}
                                scaleX={1 / window.devicePixelRatio}
                                scaleY={1 / window.devicePixelRatio}
                                style={{ border: "none" }}
                                onClick={() => handleImageClick(eachReactText.id,)}
                                
                              />
                            ))}
                            {stickerImage.map((image, i) => {

                                return (
                                    <IndividualSticker
                                    onDelete={() => {
                                        const newImages = [...images];
                                        newImages.splice(i, 1);
                                        setImages(newImages);
                                    }}
                                    onDragEnd={(event) => {
                                        image.x = event.target.x();
                                        image.y = event.target.y();
                                    }}
                                    key={i}
                                    image={image}
                                    />
                                );
                            })}
                                                
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    )
}

export default DynamicTextSticker