"use client"

import * as React from "react"
import { Calendar1Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

export default function Calendar22({ date, setDate }: { date: string, setDate: React.Dispatch<React.SetStateAction<string>> }) {
  const [open, setOpen] = React.useState(false)


  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild className="">
          <Button
            variant="commonButton"
            id="date"
            className="w-full justify-between font-normal hover:bg-[#020817] ring-0 focus-visible:ring-0 border-[#1E293B]"
          >
            {date ? format(date, "PPP") : "Select date"}
            <Calendar1Icon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 border-[#1E293B] bg-[#020817]" align="start">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : new Date()} 
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate.toISOString())
                setOpen(false)
              }
            }}
            defaultMonth={date ? new Date(date) : new Date()} 
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            fromYear={2010}
            toYear={new Date().getFullYear() + 10}
            className="text-white"
          />

        </PopoverContent>
      </Popover>
    </div>
  )
}
