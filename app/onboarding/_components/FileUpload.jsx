"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, CirclePlus, Image, Video } from "lucide-react"; // Icons for UI

export function FileUpload({ onDrop, accept = "image/*", label }) {
  const [preview, setPreview] = useState(null);

  // Handle file drop
  const onDropCallback = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file)); // Create preview URL
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  // Remove the selected file
  const removeFile = () => {
    setPreview(null);
    onDrop([]); // Clear the file from the form state
  };

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: onDropCallback,
    accept,
    maxFiles: 1,
    noClick: false, // Disable click-to-open behavior
  });

  return (
    <div className="relative flex flex-col gap-6 mt-4 rounded-lg w-[100%] ">
      {/* File Upload Area */}
      <div className="flex gap-4">
        {/* Left Side - Preview Box */}
        <div className="flex flex-col h-56 gap-2">
        <div className="flex flex-col items-center justify-center w-full h-32 p-6 border border-gray-300 rounded-lg bg-gray-50">
          {preview ? (
            accept.startsWith("image/") ? (
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <video
                src={preview}
                controls
                className="w-full h-full rounded-md"
              />
            )
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              {accept.startsWith("image/") ? <Image size={32} /> : <Video size={32} />}
              {/* <span className="mt-2 text-sm">No file uploaded</span> */}
            </div>
          )}
          
        </div>
        <div className="flex flex-col gap-2">
        {/* Select File Button */}
        <button
          type="button"
          onClick={open}
          className="px-4 py-2 text-sm font-medium text-black bg-white border border-black rounded-md"
        >
          <CirclePlus size={16} className="inline-block mr-2" />
          {accept.startsWith("image/") ? "Add Photo" : "Add Video" }
          </button>

        {/* Remove File Button */}
        <button
            type="button"
            onClick={removeFile}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
          >
            Remove
          </button>
      </div>
        </div>

        {/* Right Side - Drag and Drop Area */}
        <div
          {...getRootProps()}
          className={`w-8/12 flex flex-col items-center justify-center border rounded-lg h-56 p-4 ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
          }`}
        >
          <input {...getInputProps()} id="file-input" />
          <Upload size={40} className="text-gray-400" />
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      </div>

    </div>
  );
}