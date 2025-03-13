"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [dark, setDark] = React.useState<boolean>(true);
  
  React.useEffect(() => {
    if(theme == 'dark') setDark(true)
    else setDark(false); 
  }, [])
  

  const handletheme = () => {
    if(theme == 'dark'){
      setDark(false);
      setTheme('light');
    } else {
      setDark(true);
      setTheme('dark');
    }
  }

  return (
    <>
      <TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handletheme}
            >
              { !dark ? <Moon/> : <Sun/> }
            </Button>
					</TooltipTrigger>
				  <TooltipContent>
						<p> {dark ? 'Turn light' : 'Go dark'} </p>
					</TooltipContent>
					</Tooltip>
				</TooltipProvider>
    </>
  )
}
