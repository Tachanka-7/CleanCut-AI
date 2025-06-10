"use client"

import { Image } from "@imagekit/next";
import ImageUploader from "./ImageUploader";
import { useAppContext } from "@/context/context";

const imageKitUrl = "https://ik.imagekit.io/iktdukrlb";

export default function ImageDisplay(){
    const {uploadedImageUrl} = useAppContext()

    return <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <ImageUploader />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-xl">Original Image</h1>
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    {
                        uploadedImageUrl ? 
                        <Image 
                        urlEndpoint={imageKitUrl} 
                        src={uploadedImageUrl || ""}
                        alt="Original Image"
                        width={500}
                        height={400}
                        // transformation={[{ width: 500, height: 500 }]}
                        className="w-full h-full object-contain"/>
                        : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">
                                    No Image Uploaded Yet.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
}