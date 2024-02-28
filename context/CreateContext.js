import { createContext,useState,createRef } from "react"

export const StickerContext=createContext()

const CreateContextProvider=({children})=>{
    const [stickerImage, setImages] = useState([]);
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
    return (
        <StickerContext.Provider value={{stickerImage,addStickerToPanel,createTextToPanel}}>
           {children}
        </StickerContext.Provider>
    )
}

export default CreateContextProvider