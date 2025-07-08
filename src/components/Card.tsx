import { ITasks } from "@/context/TaskContext";
import { Calendar, Check, Clock3, Edit, Ellipsis, Flag, LucideClockFading, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import {
  differenceInCalendarDays,
  format,
} from "date-fns";

const DueStatus = ({ dueDate }: { dueDate: string }) => {
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

  let text = "";
  let className = "";

  if (diff === 0) {
    text = "Due today";
    className = "text-yellow-600";
  } else if (diff === 1) {
    text = "Due tomorrow";
    className = "";
  } else if (diff === -1) {
    text = "1 day overdue";
    className = "text-red-600 font-semibold";
  } else if (diff > 1) {
    text = `${diff} days left`;
    className = "";
  } else if (diff < -1) {
    text = `${Math.abs(diff)} days overdue`;
    className = "text-red-600 font-semibold";
  }

  return <div className={className}>{text}</div>;
};


const Card = ({ item, setSelectedTask, setEditOpen }: { item: ITasks, setSelectedTask: React.Dispatch<React.SetStateAction<ITasks | null>>, setEditOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { changeCompletedStatus, handleDelete } = useTaskContext()
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropDownToggle = (id: string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="border border-[#1E293B] p-5 rounded-md">
      <div className="w-full flex justify-between gap-2">
        <div className="max-w-300">
          <div className="flex items-center gap-3 font-semibold text-md">
            <button className={`border border-blue-700 translate-y-0.5 cursor-pointer w-4 h-4 rounded-sm flex items-center justify-center text-[#020817] ${item.status === 'Completed' ? 'bg-blue-700' : ''}`} onClick={() => { changeCompletedStatus(item.id ?? "") }}>
              <Check size={12} />
            </button >

            <span>
              {item.title}
            </span>
          </div>
          <div className="flex relative ">
            {
              item.status === "In Progress" && (
                <span className="text-yellow-500 translate-y-1.5 absolute"><LucideClockFading size={15} /></span>
              )
            }
            <span className="text-gray-400 whitespace-pre-wrap pl-6"> {item.description}</span>
          </div>
        </div>
        <div className="relative pl-10" ref={dropdownRef}>
          <button
            className="border border-[#1E293B] p-1 rounded-md"
            onClick={() => handleDropDownToggle(item?.id ?? "")}
          >
            <Ellipsis size={14} />
          </button>

          {openDropdownId === item.id && (
            <div className="p-1 bg-[#020817] border border-[#1E293B] absolute z-10 rounded-md right-0 mt-0.5 w-36 shadow-md">
              <button className="flex rounded-md px-2 items-center gap-3 p-1 bg-[#020817] w-full hover:bg-[#1E293B]" onClick={() => {
                setSelectedTask(item)
                setEditOpen(true)
                setOpenDropdownId(null)
              }}>
                <Edit size={14} />
                <span>Edit</span>
              </button>
              <button className="flex rounded-md px-2 items-center gap-3 p-1 bg-[#020817] text-red-700 w-full hover:bg-[#1E293B]" onClick={() => {
                handleDelete(item.id ?? "")
                setOpenDropdownId(null)
              }}>
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-gray-400">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${item.category === "Personal" ? "bg-green-500" : item.category === "Work" ? "bg-blue-500" : item.category === "Health" ? "bg-red-500" : item.category === "Education" ? "bg-purple-500" : "bg-gray-500"}`}></div>
          <div>{item.category}</div>
          <div className={`flex items-center px-3 text-xs py-1 gap-1 rounded-full font-semibold ${item.priority === "Medium" ? "border-amber-200 bg-amber-200 text-orange-400" : item.priority === "Low" ? "border-green-200 bg-green-200 text-green-600" : "border-red-200 bg-red-200 text-red-400"}`}>
            <span><Flag size={14} /></span>
            <span>{item.priority}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div><Calendar size={14} /></div>
            <div>{format(item.dueDate, "PPP")}</div>
          </div>
          <div className="flex items-center gap-1 ">
            <div><Clock3 size={14} /></div>
            <DueStatus dueDate={item.dueDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
