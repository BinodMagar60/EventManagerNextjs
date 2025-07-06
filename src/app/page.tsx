"use client"

import AddCard from "@/components/AddCard";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, Plus, TrendingUp } from "lucide-react";
import { useState } from "react";


export default function Home() {
  const [isAddOpen, setAddOpen] = useState(false)

  return (
    <>
      <div className="container w-full mx-auto">
        <div className="flex justify-between items-center mt-8">
          <div>
            <div className="text-3xl font-bold">Dashboard</div>
            <div className="text-gray-400">Welcome Back! Here's an overview of your tasks.</div>
          </div>
          <div>
            <Button variant={"addnew"} size="lg" onClick={()=>setAddOpen(true)}><span><Plus /></span><span>Add Task</span></Button>
          </div>
        </div>
        {/* Top Part */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 mt-8">
          <div className="p-5 border border-[#1E293B] rounded-md">
            <div className="flex justify-between items-center"><span>Total Tasks</span><span className="text-gray-500"><TrendingUp /></span></div>
            <div className="text-2xl font-bold mt-2 text-gray-500">0</div>
            <div>0% completion rate</div>
          </div>
          <div className="p-5 border border-[#1E293B] rounded-md">
            <div className="flex justify-between items-center"><span>Completed</span><span className="text-green-500"><CheckCircle /></span></div>
            <div className="text-2xl font-bold mt-2 text-green-500">0</div>
            <div>0% completion rate</div>
          </div>
          <div className="p-5 border border-[#1E293B] rounded-md">
            <div className="flex justify-between items-center"><span>In Progress</span><span className="text-orange-500"><Clock /></span></div>
            <div className="text-2xl font-bold mt-2 text-orange-500">0</div>
            <div>0% completion rate</div>
          </div>
          <div className="p-5 border border-[#1E293B] rounded-md">
            <div className="flex justify-between items-center"><span>Overdue</span><span className="text-red-500"><AlertTriangle /></span></div>
            <div className="text-2xl font-bold mt-2 text-red-500">0</div>
            <div>0% completion rate</div>
          </div>
        </div>

        {/* task by category and task status distribution section */}
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="p-5 rounded-md border border-[#1E293B]">
            <div className="text-2xl font-semibold">Task by Category</div>
            <div className="min-h-40 border-2 rounded-sm border-dashed border-gray-500 mt-4"></div>
          </div>
          <div className="p-5 rounded-md border border-[#1E293B]">
            <div className="text-2xl font-semibold">Task Status Distribution</div>
            <div className="min-h-40 mt-4"></div>
          </div>
        </div>

        {/* upcoming task */}
        <div className="border border-[#1E293B] rounded-md p-5 mt-4 mb-3">
          <div className="text-2xl font-semibold">Upcoming Tasks</div>
          <div className="min-h-40 mt-4"></div>
        </div>


      </div>

      {
        isAddOpen && <AddCard setAddOpen={setAddOpen}/>
      }
    </>
  );
}
