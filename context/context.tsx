"use client"

import { createContext, useContext, useState } from "react"

interface State {
    uploadedImageUrl: string|null;
    setUploadedImageUrl: (url: string|null) => void;
    selectedTransformation: string| null;
    setselectedTransformation: (transformation: string | null) => void;
}


const AppContext = createContext<State|undefined>(undefined)

export default function AppProvider({children}: {children: React.ReactNode}){
    
    const [uploadedImageUrl,setUploadedImageUrl] = useState<string|null>("https://ik.imagekit.io/iktdukrlb/default-image.jpg?updatedAt=1748869615392")

    const [selectedTransformation,setselectedTransformation] = useState<string|null>(null)
    
    const contextValue = {
        uploadedImageUrl, setUploadedImageUrl, selectedTransformation, setselectedTransformation
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