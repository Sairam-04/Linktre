import { useEffect, useState } from "react";
import { getTheme, setTheme } from "../../utils/localStorage";

function Switch() {
  const initialTheme = getTheme();
  const [isChecked, setIsChecked] = useState(initialTheme === "dark");

  useEffect(() => {
    const theme = getTheme();
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const onChangeMode = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setTheme(isChecked ? "dark" : "light");
    document.body.classList.toggle("dark", isChecked);
  };

  return (
    <div className="cursor-pointer hover:scale-105 flex items-center">
      <label className="relative inline-flex items-center cursor-pointer top-[2px]">
        <input
          className="sr-only peer"
          name="isChecked"
          checked={isChecked}
          onChange={onChangeMode}
          type="checkbox"
        />
        <div
          className="font-mono text-xs w-12 h-6 rounded-full ring-0 peer duration-500 outline-none 
                       bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center 
                         after:flex after:items-center after:justify-center before:content-['☀️'] 
                         before:absolute before:h-5 before:w-5 before:top-1/2 before:bg-white before:rounded-full 
                         before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 
                         peer-checked:before:opacity-0 peer-checked:before:rotate-90 
                         peer-checked:before:-translate-y-full shadow-lg shadow-[#9ca3af66] 
                         peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] 
                         after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full 
                          after:top-[2px] after:right-1 after:translate-y-full 
                          after:w-5 after:h-5 after:opacity-0 after:transition-all after:duration-700 
                          peer-checked:after:opacity-100 peer-checked:after:rotate-180 
                          peer-checked:after:translate-y-0"
        ></div>
      </label>
    </div>
  );
}

export default Switch;
