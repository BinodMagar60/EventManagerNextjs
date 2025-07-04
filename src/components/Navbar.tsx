
import { Calendar, Home, icons, ListTodo, Settings } from "lucide-react"
import { Button } from "./ui/button"

const navigationBarOptions =[
    {
        name: "Dashboard",
        icons: <Home/>,

    },
    {
        name: "Calendar",
        icons: <Calendar/>,

    },
    {
        name: "Tasks",
        icons: <ListTodo/>,

    },
    {
        name: "setting",
        icons: <Settings/>,

    },
]

const Navbar = () => {


    return (
        <div className="bg-[#020817] border border-b-[#1E293B]">
            <div className="container p-4 mx-auto flex justify-between">
                <div className="text-white text-2xl font-semibold">Event Manager</div>
                <div className="w-fit bg-[#1E293B] p-1 rounded-md flex gap-2">
                   {
                    navigationBarOptions.map((item, index) => (
                        <Button variant="navigation" key={index}><span>{item.icons}</span> {item.name}</Button>
                    ))
                   }
                </div>
            </div>
        </div>
    )
}

export default Navbar