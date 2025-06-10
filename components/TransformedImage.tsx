"use client"

import { useAppContext } from "@/context/context";

import { saveAs } from "file-saver";

import { useEffect, useState } from "react"
import Loading from "./Loading";
import Image from "next/image";

export default function TransformedImage(){
    const [transformedUrl,setTransformedUrl] = useState<string>("");
    const [isLoading,setLoading] = useState<boolean>(true);
    const {uploadedImageUrl, selectedTransformation,transformationParams} = useAppContext();
    console.log(transformationParams)
    const urlEndpoint = "https://ik.imagekit.io/iktdukrlb";

    useEffect(()=>{
        if(!uploadedImageUrl || !selectedTransformation){
            return;
        }
        const path = uploadedImageUrl.replace(urlEndpoint,"");
        
        let trString = `tr=`;
        switch(selectedTransformation){
            case "bgremove": 
                trString += `e-bgremove`;
                break;
            case "changebg":
                if(transformationParams){
                    trString += `e-changebg-prompt-${transformationParams}`;
                }                
                break;
        }
        //building transformed URL
        const newUrl = `${urlEndpoint}${path}?${trString}`;
        setTransformedUrl(newUrl);
        setLoading(true)

    },[uploadedImageUrl, selectedTransformation, urlEndpoint, transformationParams])
    
    const handleDownload = async () => {
        if(!transformedUrl) return; 

        try {
            const res = await fetch(transformedUrl);
            if(!res.ok){
                throw new Error("Error in downloading the file")
            }
            const blob = await res.blob();
            saveAs(blob,"transformed-image.png")

        } catch (error) {
            console.log("Download Failed:",error)
        }
    }
    
    return (
        <div className="space-y-4">
                {
                    transformedUrl && (
                        <div className="aspect-video rounded-md relative bg-gray-200 overflow-hidden">
                        
                        {isLoading && <Loading />}
                    
                    <Image
                        src={transformedUrl}
                        alt="Transformed Image"
                        width={500}
                        height={400}
                        className="w-full h-full object-contain"
                        onLoad={()=>setLoading(false)}
                        onError={()=> setLoading(false)}
                        unoptimized
                        />
                
                    </div>
                    )
                }
            
            <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">Transformation URL:</p>
                <p className="text-xs font-mono break-all mt-2 p-2 bg-gray-100 rounded border border-gray-200">{transformedUrl || "No Url generated"}</p>
            </div>
            <button className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleDownload}>
                Download Image
            </button>
        </div>
    )
}