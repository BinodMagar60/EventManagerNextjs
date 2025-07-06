'use client'

import AddCard from "@/components/AddCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon, Plus, Search } from "lucide-react"
import { useState } from "react"

const page = () => {
  const [isAddOpen, setAddOpen] = useState(false)
  const [isAsc, setAsc] = useState(true)
  return (
    <>
      <div className="container w-full mx-auto">
        <div className="flex justify-between items-center mt-8">
          <div>
            <div className="text-3xl font-bold">Tasks</div>
            <div className="text-gray-400">Manage all your tasks in one place.</div>
          </div>
          <div>
            <Button variant={"addnew"} size="lg" onClick={()=>{setAddOpen(true)}}><span><Plus /></span><span>Add Task</span></Button>
          </div>
        </div>

        {/* search */}
        <div className="mt-8 flex w-full gap-2">
          <div className="relative w-full">
            <span className="absolute text-gray-400 top-1/2 -translate-y-1/2 left-2"><Search size={16} /></span>
            <Input type="text" placeholder="Search tasks..." className="border-[#1E293B] placeholder:text-gray-400 pl-8 w-full" />
          </div>
          <div>
            <Button variant={"commonButton"} onClick={() => { setAsc(prev => !prev) }}>{isAsc ? <ArrowUpNarrowWideIcon /> : <ArrowDownWideNarrowIcon />}</Button>
          </div>
        </div>

        <div className="text-gray-400 my-4">
          Showing 4 of 4 tasks
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

        </div>

      </div>


      {
        isAddOpen && <AddCard setAddOpen={setAddOpen} />
      }
    </>
  )
}

export default page