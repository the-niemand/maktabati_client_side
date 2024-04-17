import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import CurrentDateLogger from '../../components/Date';
import FileDrop from '../../components/FileDrop';
import DropDown2 from '../../components/subcomponents/dropdown2';


const Dash_NewBook = () => {
     const [authors, setAuthors] = useState([]);
     const [authorInput, setAuthorInput] = useState('');


     const handleCreatingbook = (e) => {
          e.preventDefault();
          // Logic to create a new book
     };

     const handleAuthors = (e) => {
          // Check if the input value is not empty
          if (e.target.value.length !== 0) {
               // Check if the pressed key is Enter
               if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent default form submission on Enter key press

                    const newAuthor = e.target.value.trim(); // Trim the input value
                    if (newAuthor) {
                         setAuthors([...authors, newAuthor]); // Add new author to the authors array
                         setAuthorInput(''); // Clear the input field
                    }
               }
          }
     };

     const handleDeleteAuthor = (index) => {
          // Create a copy of the authors array
          const updatedAuthors = [...authors];
          // Remove the author at the specified index
          updatedAuthors.splice(index, 1);
          // Update the authors state with the updated array
          setAuthors(updatedAuthors);
     };

     return (
          <>
               <div className='flex flex-col overflow-y-scroll'>
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">New book Creation</div>
                    <CurrentDateLogger />
               </div>
               <div className='flex flex-col space-y-4 mt-10'>
                    <div className='flex justify-start'>
                         <Link to="http://localhost:5173/maktabati_client_side/Adminpage/books" className="w-fit bg-yellow-400 rounded-md py-2 px-4 flex justify-center items-center space-x-2 cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                              <div className="text-base font-bold font-['DM Sans'] text-white mr-2">Back</div>
                         </Link>
                    </div>
                    <div className='flex justify-center items-center mt-10 w-full'>
                         <div className='bg-white shadow-search rounded p-16 w-2/4'>
                              <form onSubmit={handleCreatingbook}>
                                   <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="title">
                                             Book title
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title..." />
                                   </div>
                                   <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="author">
                                             Book Author
                                        </label>
                                        <input
                                             className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                             id="author"
                                             type="text"
                                             placeholder="Author..."
                                             value={authorInput}
                                             onChange={(e) => setAuthorInput(e.target.value)}
                                             onKeyDown={handleAuthors} // Listen for Enter key press
                                        />
                                   </div>
                                   {authors.length !== 0 && (

                                        <div className="mb-4 w-full p-4 border rounded flex gap-3 flex-wrap justify-start items-start">
                                             {authors.map((author, index) => (
                                                  <div key={index} className='flex items-center py-0.5 px-2 bg-yellow-500 font-bold text-white rounded-sm text-lg ml-0 gap-2'>
                                                       {author}
                                                       <svg
                                                            onClick={() => handleDeleteAuthor(index)}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"
                                                       >
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                       </svg>
                                                  </div>
                                             ))}
                                        </div>

                                   )}
                                   <DropDown2 />
                                   <div className="mb-4 flex gap-4">
                                        <div>
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="copies">
                                                  Copies
                                             </label>
                                             <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="copies" type="number" />

                                        </div>
                                        <div className=' w-full'>
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="copies">
                                                  Type
                                             </label>
                                             <Dropdown name={"Type"} dropdownItems={["Books", "Novel", "Magazines ", "Newspapers"]} />
                                        </div>
                                   </div>


                                   <FileDrop />


                                   <div className="w-full">
                                        <button type='submit' className='w-full px-6 border-2 border-yellow-400 bg-yellow-400 text-white py-1.5 rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250'>
                                             Create
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </>
     );
};


const Dropdown = ({ name, dropdownItems }) => {
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
          // Add event listener to detect clicks outside the dropdown
          document.addEventListener("mousedown", handleOutsideClick);

          return () => {
               // Clean up event listener on component unmount
               document.removeEventListener("mousedown", handleOutsideClick);
          };
     }, []); // Empty dependency array to run this effect only once on mount

     const splitIndex = 4;

     return (
          <div className="relative w-full" ref={dropdownRef}>
               <button
                    className="border w-full text-black opacity-70 font-bold py-2.5 px-4 rounded flex justify-between items-center"
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

               <div className={` ${isOpen ? "block" : "hidden"}  text-zinc-800 p-3 rounded border mt-2 flex space-x-4`}>
                    <ul className="w-full">
                         {dropdownItems.slice(0, splitIndex).map((item, index) => (
                              <li
                                   className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full"
                                   key={index}
                                   onClick={() => {
                                        setSelected(item);
                                        setIsOpen(false); // Close dropdown after selection
                                   }}
                              >
                                   {item}
                              </li>
                         ))}
                    </ul>
                    <ul>
                         {dropdownItems.slice(splitIndex).map((item, index) => (
                              <li
                                   className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full"
                                   key={index + splitIndex}
                                   onClick={() => {
                                        setSelected(item);
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

export default Dash_NewBook;