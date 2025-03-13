"use client";

import { useCode } from "@/app/context/codeContext";
import { useRef } from "react";

const Uploadcode = () => {
  const { code, setCode, language, setLanguage, file, setFile } = useCode();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const content = e.target.result as string;
        // Save to localStorage immediately after reading
        const extension = selectedFile.name.split(".").pop();
        let language = "cpp"; // Default
        switch (extension) {
          case "cpp":
            language = "cpp";
            break;
          case "py":
            language = "python";
            break;
          case "java":
            language = "java";
            break;
          case "js":
            language = "javascript";
            break;
        }
        setLanguage(language);
        setFile(selectedFile);
        setCode(content);
        localStorage.setItem(`userlanguage`, language);
        localStorage.setItem(`user${language}Code`, content);
      }
    };
  
    reader.readAsText(selectedFile);
  };
  
  

  return (
    <div className="p-4 border  rounded-md w-full">
      {/* Hidden file input */}
      <input
        type="file"
        accept=".cpp,.py,.java,.js"
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

export default Uploadcode;
