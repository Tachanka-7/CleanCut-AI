"use client"

import { useAppContext } from "@/context/context"
import TransformedImage from "./TransformedImage";

//TransformedImageSection
export default function FinalImage(){
const {uploadedImageUrl, selectedTransformation} = useAppContext();

if(uploadedImageUrl && selectedTransformation){
    return <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">Transformed Image</h1>
        <TransformedImage />
    </div>
}
}