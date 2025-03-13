'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface CodeContextType {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

// Create the context
const CodeContext = createContext<CodeContextType | undefined>(undefined);

// Provide state to components
export const CodeProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState<string>("");  // Code from Monaco Editor
  const [language, setLanguage] = useState<string>("cpp"); // Default language
  const [file, setFile] = useState<File | null>(null);  // Store the file

  return (
    <CodeContext.Provider value={{ code, setCode, language, setLanguage, file, setFile }}>
      {children}
    </CodeContext.Provider>
  );
};

// Custom hook to use the context
export const useCode = (): CodeContextType => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error("useCode must be used within a CodeProvider");
  }
  return context;
};
