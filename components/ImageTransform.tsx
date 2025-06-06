"use client"

import { useAppContext } from "@/context/context"
import Transform from "./Transform";

export default function ImageTransform(){
    const {uploadedImageUrl} = useAppContext();

    if(!uploadedImageUrl){
        return (
            <div className="text-center my-10">
                Please Upload an image.
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="text-xl font-semibold mb-4">Apply AI Transformation</h1>
            <Transform/>
        </div>
    )
}