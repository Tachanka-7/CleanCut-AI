"use client"

import { useAppContext } from "@/context/context"
import { ChangeEvent, useState } from "react";

const TransformationOptions = [
    {
        id: "bgremove",
        name: "Remove background (std)",
        description: "Cost-effective bg removal"
    },
    {
        id: "changebg",
        name: "Change Background", 
        description: "Replace the background with a new one from text prompt",
        params : [
            {
            id:"prompt", 
            name: "Background Prompt",
            type: "text"
            },
        ],
    },
]
export default function Transform(){
    const {selectedTransformation,setselectedTransformation, transformationParams, setTransformationParams} = useAppContext(); 
    const [params,setParams] = useState<string>(""); 
    console.log(params)

    const handleTransformationChange = (e:ChangeEvent<HTMLSelectElement>) => {
        setselectedTransformation(e.target.value)
    }

    const transformDescription = TransformationOptions.find(
        (option) => option.id === selectedTransformation
    )


    return <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
                Select Transformation
            </label>
            <select value={selectedTransformation || ""} className="w-full mt-1 block pr-10 focus:outline-none"
            onChange={handleTransformationChange}>
                <option>Select an Option</option>
                {
                    TransformationOptions.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))
                }
            </select>
            {
                transformDescription && (
                <p className="mt-2 text-sm text-gray-500">{transformDescription?.description}</p>
                )
            }            
        </div>
        {
            transformDescription?.params && transformDescription.params.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Parameters</h3>
                    {
                        transformDescription.params.map((param) => (
                            <div key={param.id}>
                                <label htmlFor={param.id} className="block text-sm font-medium text-gray-700 mb-1">
                                    {param.name}
                                </label>
                                <input type={param.type}
                                id={param.id}
                                name={param.name}
                                value={params}
                                onChange={(e)=>setParams(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 pl-2"
                                />
                                <button 
                                onClick={()=>{
                                    if(params){
                                        setTransformationParams(params)
                                    }
                                }} 
                                className="bg-blue-600 text-white mt-2 py-2 px-4 rounded-md">
                                    Apply Effect
                                </button>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
}