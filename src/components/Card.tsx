import { ITasks } from "@/context/TaskContext";
import { Check, Edit, Ellipsis, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Card = ({ item }: { item: ITasks }) => {
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
    <div className="border border-[#1E293B] p-5 rounded-md" key={item.id}>
      <div className="w-full flex justify-between gap-2">
        <div>
          <div className="flex items-center gap-3 font-semibold text-md">
            <button className="border border-blue-700 translate-y-0.5 cursor-pointer w-4 h-4 rounded-sm flex items-center justify-center text-[#020817] bg-blue-700">
              <Check size={12} />
            </button>
            <span className="break-words">{item.title}</span>
          </div>
          <div className="pl-7 break-words">{item.description}</div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            className="border border-[#1E293B] p-1 rounded-md"
            onClick={() => handleDropDownToggle(item?.id ?? "")}
          >
            <Ellipsis size={14} />
          </button>

          {openDropdownId === item.id && (
            <div className="p-1 bg-[#020817] border border-[#1E293B] absolute z-10 rounded-md right-0 mt-0.5 w-36 shadow-md">
              <button className="flex rounded-md px-2 items-center gap-3 p-1 bg-[#020817] w-full hover:bg-[#1E293B]">
                <Edit size={14} />
                <span>Edit</span>
              </button>
              <button className="flex rounded-md px-2 items-center gap-3 p-1 bg-[#020817] text-red-700 w-full hover:bg-[#1E293B]">
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
