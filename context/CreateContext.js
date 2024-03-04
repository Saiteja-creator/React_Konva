import { createContext,useState,createRef } from "react"

export const StickerContext=createContext()

export const CreateContextProvider=({children})=>{
    const [arrayObjectsLayer, setArrayObjectsLayer] = useState([])
    const [selectedObject,setSelectedObject] =useState({})
    const [indexTextSelected, setIndexTextSelected] = useState(0)
    const [stickerImage, setImages] = useState([]);
    const [ImportImage,setImportImage] =useState([])
    const addStickerToPanel = ({ src, width, x, y }) => {
        setImages((currentImages) => [
          ...currentImages,
          {
            width,
            x,
            y,
            src,
            resetButtonRef: createRef()
          }
        ]);
      };

      const createTextToPanel = ({id,type,x,
        y,
        text,
        isEditing})=>{
          setImages((currentImages)=>[...currentImages,{id,type,x,y,text,isEditing}])
        }
        
      // const createImportImageToPanel=(newImages)=>{
      //   setImportImage((prevImportImage) => [...prevImportImage, ...newImages]);
      // }
    console.log(selectedObject,"return the selectedObject")
    
    return (
        <StickerContext.Provider value={{stickerImage,addStickerToPanel,createTextToPanel,setImportImage,ImportImage,setArrayObjectsLayer,selectedObject,indexTextSelected,arrayObjectsLayer,setSelectedObject}}>
           {children}
        </StickerContext.Provider>
    )
}

