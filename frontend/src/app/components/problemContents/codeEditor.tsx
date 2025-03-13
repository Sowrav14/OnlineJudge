"use client";
import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTheme } from "next-themes";
import { useCode } from "@/app/context/codeContext";


// Define the default code for each language
const defaultCode: Record<string, string> = {
  javascript: `// Write your JavaScript code here`,
  python: `# Write your Python code here`,
  cpp: 
`#include <bits/stdc++.h>
using namespace std;

int main() {
	// your code goes here

}`,
  java: 
`import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef
{
	public static void main (String[] args) throws java.lang.Exception
	{
		// your code goes here

	}
}`
};


const CodeEditor = () => {
  // const [code, setCode] = useState(defaultCode.cpp);
	// const [language, setLanguage] = useState('cpp');
  const { code, setCode, language, setLanguage } = useCode();
	const { theme } = useTheme();
	const monacoTheme = theme == 'dark' ? 'vs-dark' : 'light';
	
	// Load code and language from localStorage when the component mounts
  useEffect(() => {
    const storedLanguage = localStorage.getItem(`userlanguage`);
		if (storedLanguage) {
			setLanguage(storedLanguage);
			const storedCode = localStorage.getItem(`user${storedLanguage}Code`);
			if (storedCode) {
				setCode(storedCode);
			} else {
				setCode(defaultCode[storedLanguage])
			}
		}

  }, []);

  // Save code and language to localStorage whenever they change
  useEffect(() => {
    if (code) {
      localStorage.setItem(`user${language}Code`, code);
    }
    if (language) {
      localStorage.setItem(`userlanguage`, language);
    }
  }, [code, language]);

	const handleLanguage = (lang : string) => {
		setLanguage(lang);
		const storedCode = localStorage.getItem(`user${lang}Code`);
		if(storedCode) setCode(storedCode);
		else setCode(defaultCode[lang]);
	}
 
  return (
    <div className="flex flex-col gap-1 h-full p-2 border rounded-md">
      <Select onValueChange={handleLanguage} value={language}>
				<SelectTrigger className="">
					<SelectValue placeholder="Select a Language" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel> Languages </SelectLabel>
						<SelectItem value="cpp"> C++ </SelectItem>
						<SelectItem value="python"> Python </SelectItem>
						<SelectItem value="java"> Java </SelectItem>
						<SelectItem value="javascript"> Javascript </SelectItem>
					</SelectGroup>
				</SelectContent>
    	</Select>
			<Editor
        height="92%"
        theme={monacoTheme}
        language={language} // Change to "cpp", "python", etc.
        value={code}
        onChange={(newValue) => setCode(newValue || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default CodeEditor;
