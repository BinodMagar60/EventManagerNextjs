"use client"

import AddCard from "@/components/AddCard"
import EditCard from "@/components/EditCard"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ITasks } from "@/context/TaskContext"

import { CalendarCheck, Plus } from "lucide-react"
import React, { useState } from "react"

import { useTaskContext } from "@/context/TaskContext"
import { format, isSameDay, isSameMonth, parseISO } from "date-fns"
import Card from "@/components/Card"

const page = () => {
  const { tasks } = useTaskContext()
  const [isEditOpen, setEditOpen] = useState(false)
  const [isAddOpen, setAddOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ITasks | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const taskDates = tasks.map(task => parseISO(task.dueDate))

  const modifiers = {
    hasTasks: (date: Date) => taskDates.some(d => isSameDay(d, date)),
  }

  const modifiersClassNames = {
    hasTasks: "rounded-full bg-[#0B1F46] text-white font-semibold",
    // selected: "bg-blue-500 text-white rounded-md", 
  }

  const filteredTasks = tasks.filter(task =>
    isSameDay(parseISO(task.dueDate), selectedDate)
  )

  const monthlyTasks = tasks.filter(task =>
    isSameMonth(parseISO(task.dueDate), selectedDate)
  )

  const groupedTasks: Record<string, ITasks[]> = {}

  monthlyTasks.forEach(task => {
    const key = format(parseISO(task.dueDate), "yyyy-MM-dd")
    if (!groupedTasks[key]) groupedTasks[key] = []
    groupedTasks[key].push(task)
  })


  return (
    <>
      <div className="container w-full mx-auto">
        <div className="flex justify-between items-center mt-8">
          <div>
            <div className="text-3xl font-bold">Calendar</div>
            <div className="text-gray-400">View and manage your tasks by date.</div>
          </div>
          <div>
            <Button variant={"addnew"} size="lg" onClick={() => { setAddOpen(true) }}><span><Plus /></span><span>Add Task</span></Button>
          </div>
        </div>

        {/* calendar */}
        <div className="mt-8 flex gap-3 flex-col md:flex-row">
          <div className="border border-[#1E293B] rounded-md p-5">
            <div className="text-2xl font-semibold flex items-center gap-2"><CalendarCheck />Calendar</div>
            <div className="mt-4 flex justify-center sm:justify-start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className="rounded-lg border shadow-sm bg-transparent border-[#1E293B]"
              />

            </div>
          </div>
          <div className="border border-[#1E293B] rounded-md p-5 w-full">
            <div className="text-2xl font-semibold">Task for {format(selectedDate, "PPPP")}</div>
            <div className="mt-4 space-y-3">
              {
                filteredTasks.map(item => (
                  <Card key={item.id} setEditOpen={setEditOpen} setSelectedTask={setSelectedTask} item={item} />
                ))
              }
            </div>
          </div>
        </div>
        <div className="border border-[#1E293B] rounded-md p-5 w-full mt-3">
          <div className="text-2xl font-semibold">Monthly Overview</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
            {Object.entries(groupedTasks).map(([dateStr, taskList]) => {
              const displayDate = format(new Date(dateStr), "MMM d")
              const remaining = taskList.length - 3
              return (
                <div
                  key={dateStr}
                  className="border border-[#1E293B] p-4 rounded-md space-y-2"
                >
                  <div className="text-white font-semibold">{displayDate}</div>
                  {taskList.slice(0, 3).map((item, i) => (
                    <div key={i} className="text-sm text-white flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${item.category === "Personal" ? "bg-green-500" : item.category === "Work" ? "bg-blue-500" : item.category === "Health" ? "bg-red-500" : item.category === "Education" ? "bg-purple-500" : "bg-gray-500"}`}
                      ></span>
                      {item.title}
                    </div>
                  ))}
                  {remaining > 0 && (
                    <div className="text-sm text-gray-400">+{remaining} more</div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {
        isAddOpen && <AddCard setAddOpen={setAddOpen} />
      }
      {
        isEditOpen && <EditCard taskDetail={selectedTask} setEditOpen={setEditOpen} />
      }
    </>
  )
}

export default page