"use client";

import { useCode } from "@/app/context/codeContext";
import { useRef, useState } from "react";

interface IOFormProps {
  handleChange: (value : string) => void;
}

const Uploadtxt = ({handleChange} : IOFormProps) => {
	const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const content = e.target.result as string; 
        handleChange(content);
				setFile(selectedFile);
				console.log(content);
      }
    };
  
    reader.readAsText(selectedFile);
  };
  
  

  return (
    <div className="p-4 border  rounded-md w-full">
      {/* Hidden file input */}
      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={`${file && 'hidden'}`}
      />

      {file && (
        <div 
          className="mt-2 text-sm"
          onClick={()=> fileInputRef.current?.click()}
        >
          <strong>Selected File:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}
    </div>
  );
};

export default Uploadtxt;
