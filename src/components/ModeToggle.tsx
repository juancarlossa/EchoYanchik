import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "./ui/switch"
import { GeneralMeasureToggle } from "./GeneralMeasureToggle"

export function ModeToggle () {
  const [theme, setThemeState] = React.useState<
    "theme-light" | "dark" | "system"
  >("theme-light")

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "theme-light")
  }, [])

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])


  function modeHandler () {
    let isDark = theme === "dark" ? true : false
    if (isDark) {
      setThemeState("theme-light")
    } else {
      setThemeState("dark")
    }
  }

  return (
    <>
      <GeneralMeasureToggle />
      <Switch onClick={() => modeHandler()} />

      <Button variant="outline" size="icon" onClick={() => modeHandler()}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
