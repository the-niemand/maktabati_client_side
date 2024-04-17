import React, { useState } from "react";

const DropDown2 = () => {
     const [isOpen, setIsOpen] = useState(false);
     const [selectedItems, setSelectedItems] = useState([]);
     const list = [
          "Fantasy",
          "Horror",
          "Romance",
          "Historical fiction",
          "Science fiction",
          "Mystery",
          "Thriller",
          "Autobiography"
     ];

     const handleCheckboxChange = (event, item) => {
          const isChecked = event.target.checked;

          if (isChecked) {
               setSelectedItems((prevItems) => [...prevItems, item]);
          } else {
               setSelectedItems((prevItems) =>
                    prevItems.filter((selectedItem) => selectedItem !== item)
               );
          }
     };

     const handleDivClick = (item) => {
          const newItem = item.toLowerCase().replace(" ", "-");
          const labelElement = document.getElementById(newItem);
          if (labelElement) {
               labelElement.click();
          }
     };

     return (
          <div className="mb-4 w-full flex flex-col gap-3">
               <label className="block text-gray-700 text-lg font-bold" htmlFor="copies">
                    Categories
               </label>
               <div
                    className="relative cursor-pointer w-full p-3 border rounded flex gap-3 flex-wrap justify-start items-start"
                    onClick={() => setIsOpen(!isOpen)}
               >
                    {selectedItems.length !== 0 ? (
                         selectedItems.map((selectedItem) => (
                              <div key={selectedItem} className="bg-gray-200 rounded py-2 px-4">
                                   {selectedItem}
                              </div>
                         ))
                    ) : (
                         <p className="text-black opacity-50">Select category(ies)...</p>
                    )}
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
                         className={`absolute right-3 feather feather-chevron-down pt-1 ${isOpen ? "rotate-180 pt-0" : ""
                              } transition ease-out duration-200 ml-2`}
                    >
                         <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
               </div>

               {isOpen && (
                    <div className="w-full p-4 border rounded flex flex-col gap-3 items-start h-40 overflow-y-auto">
                         {list.map((item) => (
                              <div
                                   key={item}
                                   className="w-full cursor-pointer hover:bg-gray-200 rounded py-2 px-4"
                                   onClick={() => handleDivClick(item)}
                              >
                                   <input
                                        type="checkbox"
                                        name={item}
                                        id={item.toLowerCase().replace(" ", "-")}
                                        onChange={(event) => handleCheckboxChange(event, item)}
                                   />
                                   <label
                                        className="ml-3 w-full cursor-pointer"
                                        htmlFor={item.toLowerCase().replace(" ", "-")}
                                   >
                                        {item}
                                   </label>
                              </div>
                         ))}
                    </div>
               )}
          </div>
     );
};

export default DropDown2;
