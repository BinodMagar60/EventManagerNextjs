"use client"

import { Calendar, Home, ListTodo, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigationBarOptions =[
    {
        name: "Dashboard",
        icons: <Home/>,
        href: "/"
    },
    {
        name: "Calendar",
        icons: <Calendar/>,
        href: "/calendar"

    },
    {
        name: "Tasks",
        icons: <ListTodo/>,
        href: "/tasks"

    },
    {
        name: "setting",
        icons: <Settings/>,
        href: "/setting"

    },
]

const Navbar = () => {
    const path = usePathname()

    return (
        <div className="bg-[#020817] border border-b-[#1E293B]">
            <div className="container p-4 mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-semibold">Event Manager</div>
                <div className="w-fit bg-[#1E293B] p-1 rounded-md flex gap-1 h-fit">
                   {
                    navigationBarOptions.map((item, index) => {
                        const isActive = item.href === path
                        return (
                            <Link href={item.href} key={index}><Button variant="navigation" className={isActive? "bg-[#020817] text-white":"hover:bg-[#101828]"}><span>{item.icons}</span><span className="hidden md:block"> {item.name}</span></Button></Link>
                        )
                    })
                   }
                </div>
            </div>
        </div>
    )
}

export default Navbar