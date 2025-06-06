"use client"

import { Image } from "@imagekit/next";
import ImageUploader from "./ImageUploader";

const imageKitUrl = "https://ik.imagekit.io/iktdukrlb";

export default function ImageDisplay(){

    return <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <ImageUploader />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1>Original Image</h1>
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    <Image 
                    urlEndpoint={imageKitUrl} 
                    src="default-image.jpg?updatedAt=1748869615392"
                    alt="Original Image"
                    width={500}
                    height={400}
                    transformation={[{ width: 500, height: 500 }]}
                    className="w-full h-full object-contain"/>
                </div>
            </div>
        </div>
}