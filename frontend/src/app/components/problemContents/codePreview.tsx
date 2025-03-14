import React from "react";
import Editor from "@monaco-editor/react";

const CodePreview = ({code, language} : {code:string, language:string}) => {
  const theme = localStorage.getItem('theme');
	const monacoTheme = (theme === null || theme === 'dark') ? 'vs-dark' : 'light';
 
  return (
    <div className="flex flex-col gap-1 h-full p-2 border rounded-md">
			<Editor
        height="100%"
        theme={monacoTheme}
        language={language}
        value={code}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
					readOnly : true,
        }}
      />
    </div>
  );
};

export default CodePreview;
