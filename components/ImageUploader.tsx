"use client"

import { useAppContext } from "@/context/context";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRef, useState } from "react";

const ImageUploader = () => {
    const {setUploadedImageUrl} = useAppContext()
    const [progress, setProgress] = useState(0);
    const [uploadStatus,setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

    const fileInputRef = useRef<HTMLInputElement>(null);

    const abortController = new AbortController();

    /**
     * Authenticates and retrieves the necessary upload credentials from the server.
     *
     * This function calls the authentication API endpoint to receive upload parameters like signature,
     * expire time, token, and publicKey.
     *
     * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
     * @throws {Error} Throws an error if the authentication request fails.
     */
    const authenticator = async (): Promise<{ signature: string; expire: string; token: string; publicKey: string; }> => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    /**
     * Handles the file upload process.
     *
     * This function:
     * - Validates file selection.
     * - Retrieves upload authentication credentials.
     * - Initiates the file upload via the ImageKit SDK.
     * - Updates the upload progress.
     * - Catches and processes errors accordingly.
     */
    const handleUpload = async () => {
        // Access the file input element using the ref
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }

        // Extract the first file from the file input
        const file = fileInput.files[0];

        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });
            if(uploadResponse.url){
                setUploadedImageUrl(uploadResponse.url)
            }
            console.log("Upload response:", uploadResponse);
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
        }
    };

    const resetUpload = () => {
        setUploadStatus("idle")
        setProgress(0)
    }

    return (
        <div className="flex flex-col items-center justify-center w-full gap-5">            
            <div>
                <h1 className="mb-2 text-sm text-gray-500">Click to Upload a File</h1>
            </div>
            <div className="bg-blue-500 hover:bg-blue-600 text-white w-1/2 rounded-sm text-center">
                <input type="file" accept="image/*" ref={fileInputRef} className="ml-7"/>
            </div>
            <button type="button" onClick={handleUpload} className="bg-gray-200 text-black hover:bg-blue-600 hover:text-white w-1/2 rounded-full">
                Upload file
            </button>
            <br />
            { 
                uploadStatus === "uploading" && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-center">
                            <Loader2 className="animate-spin text-blue-500 h-5 w-5 mr-3"/>
                            <span>Uploading File....</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-gray-200">
                            <div style={{ width: `${progress}%` }} className="bg-blue-600 h-2.5 rounded-full"></div>
                        </div>
                    </div>
                )
            }
            {
                uploadStatus === "success" && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-300 ">
                            <CheckCircle className="text-green-500 h-5 w-5"/>
                        </div>
                        <p>Upload Successful</p>
                        <button 
                        onClick={resetUpload}
                        className="mt-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Upload Another File
                        </button>
                    </div>
                )
            }
            {
                uploadStatus === "error" && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                            <XCircle className="text-red-500 h-5 w-5"/>
                        </div>
                        <p>Upload Failed</p>
                        <p>Try Again</p>
                        <button 
                        onClick={resetUpload}
                        className="mt-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Try Again
                        </button>
                    </div>
                )
            }

        </div>
    );
};

export default ImageUploader;