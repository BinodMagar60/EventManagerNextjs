'use client'

import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useEffect, useState } from "react"
import Calendar22 from "./calendar-22"
import { ITasks, useTaskContext } from "@/context/TaskContext"
import { toast } from "sonner"






const AddCard = ({ setAddOpen }: { setAddOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { addTask } = useTaskContext()
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [retrivedData, setRetrivedData] = useState<ITasks>()
  const [newFormData, setNewFormData] = useState<ITasks>({
    id: "",
    title: null,
    description: "",
    category: "Personal",
    priority: "Medium",
    status: "Pending",
    dueDate: date !== undefined ? new Date(date).toISOString() : new Date().toISOString(),
    createdAt: undefined,
    updatedAt: undefined,
  })
  useEffect(() => {
    if (date) {
      setNewFormData((prev) => ({
        ...prev,
        dueDate: date,
      }));
    }
  }, [date]);

  const createTask = () => {
    if (newFormData.title === null || newFormData.title?.trim() === "") {
      toast.error("Title is required", {
        duration: 1300,
      })
      return
    }
    const response = addTask(newFormData)

    if (response) {
      setAddOpen(false)
    }

  }

  return (

    <div className="w-full bg-[#00020544] fixed top-0 left-0 h-screen flex justify-center items-center">
      <div className="container p-4 w-full">
        <div className="w-full max-w-[720px] mx-auto">
          <div className="bg-[#020817] border border-[#1E293B] rounded-md p-5 w-full">
            <div className="flex justify-between w-full">
              <div className="text-xl font-semibold">Create New Task</div>
              <div>
                <Button variant="commonButton" size="sm" onClick={() => { setAddOpen(false) }}><X /></Button>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="font-semibold">Title</div>
                <div>
                  <Input type="text" placeholder="Enter task title" className="placeholder:text-gray-400 border-[#1E293B]" value={newFormData?.title || ""} onChange={(e) => {
                    setNewFormData((prev) => ({
                      ...prev,
                      title: e.target.value
                    }))
                  }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Description</div>
                <div>
                  <Textarea placeholder="Enter task description (optional)" className="placeholder:text-gray-400 border-[#1E293B] max-h-28" style={{
                    resize: "none",
                    scrollbarWidth: "none"
                  }} onChange={(e) => { setNewFormData((prev) => ({ ...prev, description: e.target.value })) }} />
                </div>
              </div>
              {/* category, priority, status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="space-y-2">
                  <div className="font-semibold">Category</div>
                  <div>
                    <Select defaultValue={newFormData.category} onValueChange={(value) =>
                      setNewFormData((prev) => ({ ...prev, category: value as ITasks["category"] }))
                    }>
                      <SelectTrigger className="w-full border border-[#1E293B] bg-[#020817] text-white rounded-md px-4 py-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F172A] text-white border border-[#1E293B] " >
                        <SelectGroup>
                          <SelectItem value="Work" className="hover:bg-[#1E293B] cursor-pointer">Work</SelectItem>
                          <SelectItem value="Personal" className="hover:bg-[#1E293B]">Personal</SelectItem>
                          <SelectItem value="Health" className="hover:bg-[#1E293B]">Health</SelectItem>
                          <SelectItem value="Education" className="hover:bg-[#1E293B]">Education</SelectItem>
                          <SelectItem value="Other" className="hover:bg-[#1E293B]">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">Priority</div>
                  <div>
                    <Select defaultValue={newFormData.priority} onValueChange={(val) => setNewFormData((prev) => ({ ...prev, priority: val as ITasks['priority'] }))}>
                      <SelectTrigger className="w-full border border-[#1E293B] bg-[#020817] text-white rounded-md px-4 py-2">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F172A] text-white border border-[#1E293B] " >
                        <SelectGroup>
                          <SelectItem value="Low" className="hover:bg-[#1E293B] cursor-pointer">Low</SelectItem>
                          <SelectItem value="Medium" className="hover:bg-[#1E293B]">Medium</SelectItem>
                          <SelectItem value="High" className="hover:bg-[#1E293B]">High</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">Status</div>
                  <div>
                    <Select defaultValue={newFormData.status} onValueChange={(val) => setNewFormData((prev) => ({ ...prev, status: val as ITasks['status'] }))}>
                      <SelectTrigger className="w-full border border-[#1E293B] bg-[#020817] text-white rounded-md px-4 py-2">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F172A] text-white border border-[#1E293B] " >
                        <SelectGroup>
                          <SelectItem value="Pending" className="hover:bg-[#1E293B] cursor-pointer">Pending</SelectItem>
                          <SelectItem value="In Progress" className="hover:bg-[#1E293B]">In Progress</SelectItem>
                          <SelectItem value="Completed" className="hover:bg-[#1E293B]">Completed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Due Date</div>
                <div>
                  <Calendar22 date={date} setDate={setDate} />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end mt-4">
              <Button variant="addnew" onClick={() => createTask()}>Create Task</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AddCard