import React from "react";

const Dropdown = () => {
     const [isOpen, setIsOpen] = React.useState(false);
     const dropdownItems = ['Option 1', 'Option 2', 'Option 3'];

     const toggleDropdown = () => {
          setIsOpen(!isOpen);
     };

     return (
          <div className="relative">
               <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={toggleDropdown}
               >
                    Dropdown Button
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
               </button>
               <ul className={`absolute ${isOpen ? 'block' : 'hidden'} bg-white text-gray-800 pt-1`}>
                    {dropdownItems.map((item, index) => (
                         <li key={index} className="hover:bg-gray-200 py-2 px-4">
                              {item}
                         </li>
                    ))}
               </ul>
          </div>
     );
};

export default Dropdown;