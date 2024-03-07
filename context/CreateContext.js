import { createContext,useState,createRef } from "react"

export const StickerContext=createContext()

export const CreateContextProvider=({children})=>{
    const [arrayObjectsLayer, setArrayObjectsLayer] = useState([])
    const [selectedObject,setSelectedObject] =useState({})
    const [indexHistory,setindexHistory] =useState(-1)
    const [History,setHistory] =useState([])
    
    
    
    return (
        <StickerContext.Provider value={{setArrayObjectsLayer,selectedObject,arrayObjectsLayer,setSelectedObject,History,setHistory,indexHistory,setindexHistory}}>
           {children}
        </StickerContext.Provider>
    )
}

