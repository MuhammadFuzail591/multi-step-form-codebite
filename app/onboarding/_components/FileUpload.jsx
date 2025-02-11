// components/FileUpload.jsx
"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function FileUpload({ onDrop, accept, label }) {
  const [preview, setPreview] = useState(null);

  const onDropCallback = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file)); // Create a preview URL
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: accept ? { [accept]: [] } : undefined, // Accept specific file types
    maxFiles: 1, // Allow only one file
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-dashed rounded-lg text-center ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>{label}</p>
        )}
      </div>
      {preview && (
        <div className="mt-4">
          {accept.startsWith("image/") ? (
            <img src={preview} alt="Preview" className="h-auto max-w-full rounded-lg" />
          ) : (
            <video src={preview} controls className="h-auto max-w-full rounded-lg" />
          )}
        </div>
      )}
    </div>
  );
}