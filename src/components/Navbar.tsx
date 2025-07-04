"use client"

import { Home } from "lucide-react"
import { Button } from "./ui/button"

const navigationBarOptions =[
    {
        name: "Dashboard",
    }
]

const Navbar = () => {


    return (
        <div className="bg-[#020817] border border-b-[#1E293B]">
            <div className="container p-4 mx-auto flex justify-between">
                <div className="text-white text-2xl font-semibold">Event Manager</div>
                <div className="w-fit bg-[#1E293B] p-1 rounded-md flex gap-1">
                    <Button variant="navigation"><span><Home/></span> Dashboard</Button>
                    <Button className="bg-white flex gap-1 border-0 focus:ring-0" size="sm"><span><Home/></span> Dashboard</Button>
                    <Button className="bg-white flex gap-1 border-0 focus:ring-0" size="sm"><span><Home/></span> Dashboard</Button>
                    <Button className="bg-white flex gap-1 border-0 focus:ring-0" size="sm"><span><Home/></span> Dashboard</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar