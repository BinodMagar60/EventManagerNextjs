"use client"

import AddCard from "@/components/AddCard";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, Plus, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { ITasks, useTaskContext } from "@/context/TaskContext";
import Card from "@/components/Card";
import EditCard from "@/components/EditCard";
import { Progress } from "@/components/ui/progress";
import { differenceInCalendarDays } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';



export default function Home() {
  const [isAddOpen, setAddOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ITasks | null>(null)

  const { tasks } = useTaskContext()
  const allTasks = useMemo(() => tasks, [tasks])
  const completedTask = (allTasks.map(item => {
    if (item.status === "Completed") {
      return item
    }
    return null
  })).filter(item => item !== null)
  const inprogressTask = (allTasks.map(item => {
    if (item.status === "In Progress") {
      return item
    }
    return null
  })).filter(item => item !== null)
  const pendingTask = (allTasks.map(item => {
    if (item.status === "Pending") {
      return item
    }
    return null
  })).filter(item => item !== null)


  const isOverdue = (dueDate: string): boolean => {
    const rawDue = new Date(dueDate);
    const today = new Date();

    const localDueDate = new Date(
      rawDue.getFullYear(),
      rawDue.getMonth(),
      rawDue.getDate()
    );

    const localToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const diff = differenceInCalendarDays(localDueDate, localToday);
    return diff < 0;
  };

  const overDueTasks = allTasks.filter(task => isOverdue(task.dueDate));
  // console.log(overDueTasks)

  const upcomingTasks = ([...allTasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())).filter(item => item.status !== "Completed");


  const barChartData = [
    {
      name: "Personal",
      total: ((allTasks.map(item => {
        if (item.category === "Personal") {
          return item
        }
        return null
      })).filter(item => item !== null)).length,
      color: "#00C951"
    },
    {
      name: "Work",
      total: ((allTasks.map(item => {
        if (item.category === "Work") {
          return item
        }
        return null
      })).filter(item => item !== null)).length,
      color: "#2B7FFF"
    },
    {
      name: "Health",
      total: ((allTasks.map(item => {
        if (item.category === "Health") {
          return item
        }
        return null
      })).filter(item => item !== null)).length,
      color: "#FB2C36"
    },
    {
      name: "Education",
      total: ((allTasks.map(item => {
        if (item.category === "Education") {
          return item
        }
        return null
      })).filter(item => item !== null)).length,
      color: "#AD46FF"
    },
    {
      name: "Other",
      total: ((allTasks.map(item => {
        if (item.category === "Other") {
          return item
        }
        return null
      })).filter(item => item !== null)).length,
      color: "#6A7282"
    },
  ]

  return (
    <>
      <div className="container w-full mx-auto">
        <div className="flex justify-between items-center mt-8">
          <div>
            <div className="text-3xl font-bold">Dashboard</div>
            <div className="text-gray-400">Welcome Back! Here&apos;s an overview of your tasks.</div>
          </div>
          <div>
            <Button variant={"addnew"} size="lg" onClick={() => setAddOpen(true)}><span><Plus /></span><span>Add Task</span></Button>
          </div>
        </div>
        {/* Top Part */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 mt-8">
          <div className="p-5 border border-[#1E293B] rounded-md">
            <div className="flex justify-between items-center"><span>Total Tasks</span><span className="text-gray-500"><TrendingUp /></span></div>
            <div className="text-2xl font-bold mt-2 text-gray-500">{allTasks.length}</div>
            <div className="text-gray-400 text-xs mt-1.5">{Math.round((completedTask.length / allTasks.length) * 100)}% completion rate</div>
          </div>
          <div className="p-5 border border-[#1E293B] rounded-md">
            <div className="flex justify-between items-center"><span>Completed</span><span className="text-green-500"><CheckCircle /></span></div>
            <div className="text-2xl font-bold mt-2 text-green-500">{completedTask.length}</div>
            <div className="text-gray-400 text-xs mt-1.5"><Progress className="bg-[#1E293B] h-3" value={Math.round((completedTask.length / allTasks.length) * 100)} /></div>
          </div>
          <div className="p-5 border border-[#1E293B] rounded-md">
            <div className="flex justify-between items-center"><span>In Progress</span><span className="text-orange-500"><Clock /></span></div>
            <div className="text-2xl font-bold mt-2 text-orange-500">{inprogressTask.length}</div>
            <div className="text-gray-400 text-xs mt-1.5">{pendingTask.length} pending</div>
          </div>
          <div className="p-5 border border-[#1E293B] rounded-md">
            <div className="flex justify-between items-center"><span>Overdue</span><span className="text-red-500"><AlertTriangle /></span></div>
            <div className="text-2xl font-bold mt-2 text-red-500">{overDueTasks.length}</div>
            <div className="text-gray-400 text-xs mt-1.5">Need attention</div>
          </div>
        </div>

        {/* task by category and task status distribution section */}
        <div className="grid lg:grid-cols-2 gap-3 mt-4">
          <div className="p-5 rounded-md border border-[#1E293B]">
            <div className="text-2xl font-semibold">Task by Category</div>
            <div className="min-h-40 rounded-sm mt-4">
              <ResponsiveContainer width={"100%"} height={300} >
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total">
                    {
                      barChartData.map((item, index) => (
                        <Cell key={`cell-${index}`} fill={item.color} /> 
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-5 rounded-md border border-[#1E293B]">
            <div className="text-2xl font-semibold">Task Status Distribution</div>
            <div className="min-h-40 mt-4">
              <ResponsiveContainer width="100%" height={300} >
                <PieChart>
                  <Pie
                    data={barChartData}
                    dataKey="total"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    
                  >
                    {barChartData.map((item, index) => (
                      <Cell key={`cell-${index}`} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* upcoming task */}
        <div className="border border-[#1E293B] rounded-md p-5 mt-4 mb-3">
          <div className="text-2xl font-semibold">Upcoming Tasks</div>
          <div className="min-h-40 mt-4 space-y-3">
            {
              upcomingTasks.slice(0, 5).map(item => (
                <Card key={item.id} item={item} setSelectedTask={setSelectedTask} setEditOpen={setEditOpen} />
              ))
            }
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
  );
}
