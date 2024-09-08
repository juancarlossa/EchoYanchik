import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { DataType } from "./CardElement"

export function MeasureToggle ({ children, data, dataMeasure, updateRanges, }: { children: React.ReactNode, data: DataType, dataMeasure: string, updateRanges: (data: DataType, item: string) => void }) {
  let item1 = dataMeasure
  let item2 = 'mm'
  if (item1 === 'ml') {
    item2 = 'cl'
  } else {
    item1 = 'cm'
    item2 = 'mm'
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="z-50" tabIndex={-1} variant="ghost" size="default">
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => updateRanges(data, item1)}>
          {item1}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateRanges(data, item2)}>
          {item2}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}