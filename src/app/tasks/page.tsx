'use client'

import AddCard from "@/components/AddCard"
import EditCard from "@/components/EditCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ITasks } from "@/context/TaskContext"
import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon, Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { useTaskContext } from "@/context/TaskContext"
import Card from "@/components/Card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


type TSort = "Title" | "Priority" | "Status" | "Created"
type TCategory = "All Categories" | "Work" | "Personal" | "Health" | "Education" | "Other"
type TStatus = "All Status" | "Pending" | "In Progress" | "Incomplete" | "Completed"
type TPriority = "All Priority" | "Low" | "Medium" | "High"


const page = () => {
  const { tasks } = useTaskContext()
  const [isAddOpen, setAddOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [isAsc, setAsc] = useState(true)
  const [selectedTask, setSelectedTask] = useState<ITasks | null>(null)
  const [searched, setSearched] = useState("")

  const [basedOn, setBasedon] = useState<TSort>("Status")
  const [category, setCategory] = useState<TCategory>("All Categories")
  const [status, setStatus] = useState<TStatus>("All Status")
  const [priority, setPriority] = useState<TPriority>("All Priority")

  const allTasks: ITasks[] = useMemo(() => tasks, [tasks])

  const filterBasedOnFun = () => {
    if (basedOn === "Title") {
      return [...allTasks].sort((a, b) =>
        isAsc ? a.title?.localeCompare(b.title) : b.title?.localeCompare(a.title)
      );
    }

    else if (basedOn === "Priority") {
      const priorityOrder = { Low: 1, Medium: 2, High: 3 };
      return [...allTasks].sort((a, b) =>
        isAsc
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    }

    else if (basedOn === "Status") {
      const statusOrder = { "Pending": 1, "In Progress": 2, "Completed": 3 };
      return [...allTasks].sort((a, b) =>
        isAsc
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status]
      );
    }

    else if (basedOn === "Created") {
      return [...allTasks].sort((a, b) => {
        const dateA = new Date(a.createdAt ?? new Date().toISOString()).getTime();
        const dateB = new Date(b.createdAt ?? new Date().toISOString()).getTime();
        return isAsc ? dateA - dateB : dateB - dateA;
      });
    }
    return allTasks;
  };


  const filterBasedOn: ITasks[] = filterBasedOnFun()
  const searchedTasks: ITasks[] = filterBasedOn.filter(item => {
    return item.title.toLowerCase().includes(searched.toLowerCase())
  })

  const filteredCategory: ITasks[] = category !== "All Categories" ? searchedTasks.filter(item => item.category === category) : searchedTasks

  const filteredStatus: ITasks[] = status === "Incomplete" ? filteredCategory.filter(item => item.status !== "Completed") : status !== "All Status" ? filteredCategory.filter(item => item.status === status) : filteredCategory

  const filteredPriority: ITasks[] = priority !== "All Priority" ? filteredStatus.filter(item => item.priority === priority) : filteredStatus


  return (
    <>
      <div className="container w-full mx-auto">
        <div className="flex justify-between items-center mt-8">
          <div>
            <div className="text-3xl font-bold">Tasks</div>
            <div className="text-gray-400">Manage all your tasks in one place.</div>
          </div>
          <div>
            <Button variant={"addnew"} size="lg" onClick={() => { setAddOpen(true) }}><span><Plus /></span><span>Add Task</span></Button>
          </div>
        </div>

        {/* search */}
        <div className="mt-8 flex w-full gap-2">
          <div className="relative w-full">
            <span className="absolute text-gray-400 top-1/2 -translate-y-1/2 left-2"><Search size={16} /></span>
            <Input type="text" value={searched} onChange={(e) => setSearched(e.target.value)} placeholder="Search tasks..." className="border-[#1E293B] placeholder:text-gray-400 pl-8 w-full py-5" />
          </div>
          <div>
            <Button variant={"commonButton"} className="p-5" onClick={() => { setAsc(prev => !prev) }}>{isAsc ? <ArrowUpNarrowWideIcon /> : <ArrowDownWideNarrowIcon />}</Button>
          </div>
        </div>

        <div className="mt-2 flex gap-1 flex-wrap">
          {/* basedon filter */}
          <div className="w-36">
            <Select defaultValue={basedOn} value={basedOn} onValueChange={(val) => setBasedon(val as TSort)}  >
              <SelectTrigger className="w-full border border-[#1E293B] bg-[#020817] text-white rounded-md px-4 py-2">
                <SelectValue placeholder="Based On" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F172A] text-white border border-[#1E293B]" >
                <SelectGroup>
                  <SelectItem value="Title" className="hover:bg-[#1E293B] cursor-pointer">Title</SelectItem>
                  <SelectItem value="Priority" className="hover:bg-[#1E293B]">Priority</SelectItem>
                  <SelectItem value="Status" className="hover:bg-[#1E293B]">Status</SelectItem>
                  <SelectItem value="Created" className="hover:bg-[#1E293B]">Created</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* based on category */}
          <div className="w-36">
            <Select defaultValue={category} value={category} onValueChange={(val) => setCategory(val as TCategory)}  >
              <SelectTrigger className="w-full border border-[#1E293B] bg-[#020817] text-white rounded-md px-4 py-2">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F172A] text-white border border-[#1E293B]" >
                <SelectGroup>
                  <SelectItem value="All Categories" className="hover:bg-[#1E293B] cursor-pointer">All Categories</SelectItem>
                  <SelectItem value="Work" className="hover:bg-[#1E293B]">Work</SelectItem>
                  <SelectItem value="Personal" className="hover:bg-[#1E293B]">Personal</SelectItem>
                  <SelectItem value="Health" className="hover:bg-[#1E293B]">Health</SelectItem>
                  <SelectItem value="Education" className="hover:bg-[#1E293B]">Education</SelectItem>
                  <SelectItem value="Other" className="hover:bg-[#1E293B]">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Status  */}
          <div className="w-36">
            <Select defaultValue={status} value={status} onValueChange={(val) => setStatus(val as TStatus)}  >
              <SelectTrigger className="w-full border border-[#1E293B] bg-[#020817] text-white rounded-md px-4 py-2">
                <SelectValue placeholder="Based On" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F172A] text-white border border-[#1E293B]" >
                <SelectGroup>
                  <SelectItem value="All Status" className="hover:bg-[#1E293B] cursor-pointer">All Status</SelectItem>
                  <SelectItem value="Pending" className="hover:bg-[#1E293B]">Pending</SelectItem>
                  <SelectItem value="In Progress" className="hover:bg-[#1E293B]">In Progress</SelectItem>
                  <SelectItem value="Incomplete" className="hover:bg-[#1E293B]">Incomplete</SelectItem>
                  <SelectItem value="Completed" className="hover:bg-[#1E293B]">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-36">
            <Select defaultValue={priority} value={priority} onValueChange={(val) => setPriority(val as TPriority)}  >
              <SelectTrigger className="w-full border border-[#1E293B] bg-[#020817] text-white rounded-md px-4 py-2">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F172A] text-white border border-[#1E293B]" >
                <SelectGroup>
                  <SelectItem value="All Priority" className="hover:bg-[#1E293B] cursor-pointer">All Priority</SelectItem>
                  <SelectItem value="Low" className="hover:bg-[#1E293B]">Low</SelectItem>
                  <SelectItem value="Medium" className="hover:bg-[#1E293B]">Medium</SelectItem>
                  <SelectItem value="High" className="hover:bg-[#1E293B]">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {
            (category !== "All Categories" || status !== "All Status" || priority !== "All Priority") && (
              <Button variant={'commonButton'} onClick={() => {
                setCategory("All Categories")
                setStatus("All Status")
                setPriority("All Priority")
              }}>Clear filter</Button>
            )
          }
        </div>

        <div className="text-gray-400 my-4">
          Showing 4 of {allTasks.length} tasks
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {
            filteredPriority.map(item => (
              <Card key={item.id} item={item} setSelectedTask={setSelectedTask} setEditOpen={setEditOpen} />
            ))
          }
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