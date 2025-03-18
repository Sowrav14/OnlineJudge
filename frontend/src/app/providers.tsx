"use client"
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./components/theme_provider";
import { CodeProvider } from "./context/codeContext";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return(
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
            <SessionProvider>
                <CodeProvider>
                    {children}
                </CodeProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}