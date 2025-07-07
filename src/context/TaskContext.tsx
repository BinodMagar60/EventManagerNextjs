'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import z from 'zod'
export interface ITasks {
    id?: string,
    title: string | null,
    description: string,
    category: "Work" | "Personal" | "Health" | "Education" | "Other",
    priority: "Low" | "Medium" | "High",
    status: "Pending" | "In Progress" | "Completed",
    dueDate: string,
    createdAt?: string,
    updatedAt?: string,
}

type TaskContextType = {
    tasks: ITasks[],
    addTask: (data: ITasks) => boolean,
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)


const taskAddValidation = z.object({
    title: z
        .string({ required_error: "Title Required" })
        .nonempty("Title cannot be empty"),
    category: z.enum(["Work", "Personal", "Health", "Education", "Other"]),
    priority: z.enum(["Low", "Medium", "High"]),
    status: z.enum(["Pending", "In Progress", "Completed"]),
    dueDate: z.string({ required_error: "Date error" }),
})





export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<ITasks[]>([])
    useEffect(() => {
        const isLocalSet = localStorage.getItem("localEventTask")
        if (!isLocalSet) {
            localStorage.setItem("localEventTask", JSON.stringify([]))
        }
        else {
            const parsed = JSON.parse(isLocalSet)
            setTasks(parsed)
        }
    }, [])

    const addTask = (data: ITasks) => {

        const parsed = taskAddValidation.safeParse(data)

        if (!parsed.success) {
            toast.error("Validation failed. Try again", {
                duration: 1500,
            })
            return false
        }


        const newTask: ITasks = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        const updatedTasks = [...tasks, newTask]
        setTasks(updatedTasks)
        localStorage.setItem("localEventTask", JSON.stringify(updatedTasks))
        return true
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask }}>
            {children}
        </TaskContext.Provider>
    )
}


export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider")
    }
    return context
}