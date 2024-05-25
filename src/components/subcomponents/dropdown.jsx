import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ name, dropdownItems, onSelect }) => {
     const [isOpen, setIsOpen] = useState(false);
     const [selected, setSelected] = useState(name);

     const dropdownRef = useRef(null);

     const toggleDropdown = () => {
          setIsOpen(!isOpen);
     };

     const handleOutsideClick = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
               setIsOpen(false);
          }
     };

     useEffect(() => {
          document.addEventListener("mousedown", handleOutsideClick);

          return () => {
               document.removeEventListener("mousedown", handleOutsideClick);
          };
     }, []);

     const splitIndex = 4;

     return (
          <div className="relative" ref={dropdownRef}>
               <button
                    className="bg-white shadow-search text-zinc-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={toggleDropdown}
               >
                    <span className="truncate">{selected}</span>
                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="22"
                         height="22"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         className={`feather feather-chevron-down pt-1 ${isOpen ? "rotate-180 pt-0" : ""} transition ease-out duration-200 ml-2`}
                    >
                         <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
               </button>

               <div className={`absolute ${isOpen ? "block" : "hidden"} ${name === "Type" ? "right-0" : ""} bg-white text-zinc-800 p-3 rounded shadow-search mt-2 flex space-x-4`}>
                    <ul className="w-fit">
                         {dropdownItems.slice(0, splitIndex).map((item, index) => (
                              <li
                                   className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate"
                                   key={index}
                                   onClick={() => {
                                        setSelected(item);
                                        onSelect(item)
                                        setIsOpen(false);
                                   }}
                              >
                                   {item}
                              </li>
                         ))}
                    </ul>
                    <ul>
                         {dropdownItems.slice(splitIndex).map((item, index) => (
                              <li
                                   className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate"
                                   key={index + splitIndex}
                                   onClick={() => {
                                        setSelected(item);
                                        onSelect(item)
                                        setIsOpen(false); // Close dropdown after selection
                                   }}
                              >
                                   {item}
                              </li>
                         ))}
                    </ul>
               </div>
          </div>
     );
};

export default Dropdown;
