import { useAppContext } from "@/context/context"
import { ChangeEvent } from "react";

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
    const {selectedTransformation,setselectedTransformation} = useAppContext(); 

    console.log(selectedTransformation)

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
            <p className="mt-2 text-sm text-gray-500">{transformDescription?.description}</p>
        </div>
    </div>
}