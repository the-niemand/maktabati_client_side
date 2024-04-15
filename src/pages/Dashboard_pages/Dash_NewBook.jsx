import React from 'react'
import { Link } from 'react-router-dom'
import CurrentDateLogger from '../../components/Date'
import Dropdown from '../../components/subcomponents/dropdown'

const Dash_NewBook = () => {


     const handleCreatingbook = (e) => {
          e.preventDefault();
     }

     return (
          <>
               <div className='flex flex-col'>
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">New book Creation</div>
                    <CurrentDateLogger />
               </div>
               <div className='flex flex-col space-y-4 mt-10'>
                    <div className='flex justify-start'>
                         <Link to={"http://localhost:5173/maktabati_client_side/Adminpage/books"} className="w-fit bg-yellow-400 rounded-md py-2 px-4 flex justify-center items-center space-x-2 cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                              <div className="  text-base font-bold font-['DM Sans'] text-white mr-2">Back</div>
                         </Link>
                    </div>

                    <div className='w-full flex justify-center items-center mt-10 '>
                         <div className='bg-white shadow-search rounded p-16'>


                              <form onSubmit={handleCreatingbook}>
                                   <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                             Book title
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title..." />
                                   </div>
                                   <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username" >
                                             Book Author
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Author..." />
                                   </div>
                                   <div className="mb-4 flex space-x-6">


                                   </div>
                                   <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                             Copies
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="Number" />
                                   </div>
                                   <div className="flex-1 mb-4 items-center max-w-screen-sm mx-auto space-y-4 sm:flex sm:space-y-0">
                                        <div className="relative w-full">
                                             <div className="items-center justify-center max-w-xl mx-auto">
                                                  <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none" id="drop">
                                                       <span className="flex items-center space-x-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-upload-cloud"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
                                                            <span className="font-medium text-gray-600">Drop files to Attach, or<span className="text-blue-600 underline ml-[4px]">browse</span></span>
                                                       </span>
                                                       <input type="file" name="file_upload" className="hidden" accept="image/png,image/jpeg" id="input" />
                                                  </label>
                                             </div>
                                        </div>
                                   </div>
                                   <div className='w-full'>
                                        <button type='submit' className=' w-full px-6 border-2 border-yellow-400 bg-yellow-400 text-white py-1.5 rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250'>
                                             Create
                                        </button>
                                   </div>
                              </form>

                         </div>
                    </div>


               </div>

          </>
     )
}




export default Dash_NewBook