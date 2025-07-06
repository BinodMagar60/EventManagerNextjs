"use client"

import AddCard from "@/components/AddCard"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import { CalendarCheck, Plus } from "lucide-react"
import React, { useState } from "react"

const page = () => {
  const [isAddOpen, setAddOpen] = useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  return (
    <>
      <div className="container w-full mx-auto">
        <div className="flex justify-between items-center mt-8">
          <div>
            <div className="text-3xl font-bold">Calendar</div>
            <div className="text-gray-400">View and manage your tasks by date.</div>
          </div>
          <div>
            <Button variant={"addnew"} size="lg" onClick={()=>{setAddOpen(true)}}><span><Plus /></span><span>Add Task</span></Button>
          </div>
        </div>

        {/* calendar */}
        <div className="mt-8 flex gap-3 flex-col md:flex-row">
          <div className="border border-[#1E293B] rounded-md p-5">
            <div className="text-2xl font-semibold flex items-center gap-2"><CalendarCheck />Calendar</div>
            <div className="mt-4 flex justify-center sm:justify-start">
              <Calendar
                mode="single"
                defaultMonth={date}
                selected={date}
                onSelect={setDate}
                disabled={{
                  before: new Date(2025, 5, 12),
                }}
                className="rounded-lg border shadow-sm bg-transparent border-[#1E293B]" />
            </div>
          </div>
          <div className="border border-[#1E293B] rounded-md p-5 w-full">
            <div className="text-2xl font-semibold">Task for Saturday, July 5, 2025</div>
            <div className="mt-4"></div>
          </div>
        </div>
        <div className="border border-[#1E293B] rounded-md p-5 w-full mt-3">
          <div className="text-2xl font-semibold">Monthly Overview</div>
          <div className="mt-4"></div>
        </div>
      </div>

      {
        isAddOpen && <AddCard setAddOpen={setAddOpen}/>
      }
    </>
  )
}

export default page