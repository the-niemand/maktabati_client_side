import React, { useState } from 'react';
import CurrentDateLogger from '../../components/Date';
import addbook from '../../assets/literature.png'
import { Link } from 'react-router-dom';
import Dropdown from '../../components/subcomponents/dropdown';

const Dash_Books = () => {



     const [search_field_value, setSearch_field_value] = useState("")

     const clearInput = () => {
          setSearch_field_value(''); // Reset the input field value to empty string
     };

     return (
          <>
               <div className='flex flex-col'>
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">Books managment</div>
                    <CurrentDateLogger />
               </div>
               <div className='flex flex-col space-y-4'>
                    <div className='flex justify-end'>
                         <Link className="w-fit bg-yellow-400 rounded-md py-2  px-4 flex justify-center items-center space-x-3 cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <div className=" text-white text-base font-bold font-['DM Sans']">Add new book</div>
                              <img className="w-6 h-6" src={addbook} />
                         </Link>
                    </div>
                    <div className='flex mt-10 space-x-4'>

                         <div className="w-full px-5 py-2 bg-white rounded-md shadow-search justify-start items-center flex space-x-4">
                              <div>
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#282828"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className=" opacity-60 cursor-pointer hover:opacity-100 transition ease-out duration-150"
                                   >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                   </svg>

                              </div>
                              <div className="flex-1">
                                   <input
                                        type="text"
                                        placeholder="Search..."
                                        className="text-base border-none outline-none focus:ring-0 w-full rounded-md"
                                        value={search_field_value}
                                        onChange={(e) => { setSearch_field_value(e.target.value) }}
                                   />
                              </div>
                              {search_field_value && (
                                   <div onClick={clearInput}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>

                                   </div>
                              )}


                         </div>

                         <button
                              type="submit"
                              className="w-fit  px-6 border-2 border-yellow-400 bg-yellow-400 text-white py-1.5 rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250"
                         >
                              Search
                         </button>
                    </div>
                    <div className='flex justify-between mt-10 '>
                         <div className='flex space-x-3'>
                              <Dropdown />
                              <Dropdown />
                         </div>
                         <div>
                              <Dropdown />
                         </div>
                    </div>

               </div >

          </>
     )
}

export default Dash_Books