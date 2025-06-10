"use client"

import { createContext, useContext, useState } from "react"

interface State {
    uploadedImageUrl: string|null;
    setUploadedImageUrl: (url: string|null) => void;
    selectedTransformation: string| null;
    setselectedTransformation: (transformation: string | null) => void;
    transformationParams: string
    setTransformationParams: (params: string) => void
}


const AppContext = createContext<State|undefined>(undefined)

export default function AppProvider({children}: {children: React.ReactNode}){
    
    const [uploadedImageUrl,setUploadedImageUrl] = useState<string|null>("")

    const [selectedTransformation,setselectedTransformation] = useState<string|null>(null)

    const [transformationParams,setTransformationParams] = useState("")
    
    const contextValue = {
        uploadedImageUrl, 
        setUploadedImageUrl, 
        selectedTransformation, 
        setselectedTransformation,
        transformationParams,
        setTransformationParams
    }
    return <div>
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    </div>
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context){
        throw new Error("Error in context file ")
    }
    return context;
}