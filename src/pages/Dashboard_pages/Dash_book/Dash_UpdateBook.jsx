import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import DropDown2 from '../../../components/subcomponents/dropdown2';
import axios from "axios";
import load from '../../../assets/loading.gif';
import valide from '../../../assets/valide.gif';
import unvalide from '../../../assets/unvalide.gif';
import { Toaster, toast } from 'sonner'

const Dash_UpdateBook = () => {
     const URL = import.meta.env.APP_API_URL;
     const navigate = useNavigate();
     const { id } = useParams();
     const [userData, setUserData] = useState(null);
     const [loading, setLoading] = useState(true);

     const [authors, setAuthors] = useState([]);
     const [authorInput, setAuthorInput] = useState('');

     const [creatingStatus, setCreatingStatus] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");

     useEffect(() => {

          const handleCreationSuccess = async () => {
               if (creatingStatus === "valid") {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    navigate('/maktabati_client_side/Adminpage/books');
               }
          };

          handleCreationSuccess();
     }, [creatingStatus, id, navigate]);

     useEffect(() => {
          const fetchBook = async () => {
               try {
                    setLoading(true);
                    const response = await axios.get(`${URL}books/fetchBook/${id}`);
                    setUserData(response.data.data);
                    setAuthors(response.data.data.authors);
                    setLoading(false);
               } catch (error) {
                    console.error('Error fetching book:', error);
                    setLoading(false);
               }
          };

          fetchBook();
     }, [URL])

     const handleChange = (e) => {
          setUserData({
               ...userData,
               [e.target.name]: e.target.value,
          });
     };

     const handleTypeSelect = (type) => {
          setUserData({
               ...userData,
               type: type,
          });
     };

     const handleAuthors = (e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
               e.preventDefault();
               setAuthors([...authors, e.target.value.trim()]);
               setAuthorInput('');
          }
     };

     const handleDeleteAuthor = (index) => {
          setAuthors(authors.filter((_, i) => i !== index));
     };

     const handleCategorySelect = (categories) => {
          setUserData({
               ...userData,
               categories: categories,
          });
     };


     const updateBook = async () => {
          try {

               const { title, type, categories, copies } = userData;
               if (!title || !type || !categories || !copies) {
                    toast.error('all fields are required exept author');
                    return;
               }

               const newData = { ...userData, authors: authors };
               const response = await axios.put(`${URL}books/updateBooksById/${userData._id}`, newData)
               if (response.status === 200) {
                    setCreatingStatus("valid")
               }
          } catch (err) {
               console.log(err);
               setCreatingStatus("unvalide")
               setStatusMessage(err.response.data.message)
          }
     }

     const handleSubmit = (e) => {
          e.preventDefault();
          // Handle the submission logic here
     };

     return (
          <div className='flex flex-col'>
               <div className="text-zinc-800 text-[18px] font-extra font-Mulish">Update book</div>
               <CurrentDateLogger />
               <div className='flex flex-col space-y-4 mt-10'>
                    <div className='flex justify-start'>
                         <Link
                              to="/maktabati_client_side/Adminpage/books"
                              className="w-fit bg-yellow-400 rounded-md py-2 px-4 flex justify-center items-center space-x-2 cursor-pointer hover:shadow-button transition ease-out duration-150"
                         >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                                   <polyline points="15 18 9 12 15 6"></polyline>
                              </svg>
                              <div className="text-base font-bold font-['DM Sans'] text-white mr-2">Back</div>
                         </Link>
                    </div>
                    <div className='flex justify-center items-center mt-10 w-full'>
                         <div className='bg-white shadow-search rounded p-16 w-2/4'>
                              {loading ? (
                                   <div className='w-full h-full flex flex-col items-center justify-center'>
                                        <img src={load} width="60" alt="loading" />
                                   </div>
                              ) : (
                                   userData && (
                                        <form onSubmit={handleSubmit}>
                                             <div className="mb-4">
                                                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="title">
                                                       Book title
                                                  </label>
                                                  <input
                                                       className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                       id="title"
                                                       name="title"
                                                       type="text"
                                                       placeholder="Title..."
                                                       value={userData?.title || ''}
                                                       onChange={handleChange}
                                                  />
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
                                                       onKeyDown={handleAuthors}
                                                  />
                                             </div>
                                             {authors && authors.length > 0 && (
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
                                             <DropDown2 preSelectedItems={userData?.categories} onSelect={handleCategorySelect} />
                                             <div className="mb-4 flex gap-4">
                                                  <div>
                                                       <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="copies">
                                                            Copies
                                                       </label>
                                                       <input
                                                            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            id="copies"
                                                            type="number"
                                                            name="copies"
                                                            value={userData?.copies}
                                                            onChange={handleChange}
                                                       />
                                                  </div>
                                                  <div className='w-full'>
                                                       <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="type">
                                                            Type
                                                       </label>
                                                       <Dropdown name={userData?.type} dropdownItems={["Books", "Novel", "Magazines", "Newspapers"]} onSelect={handleTypeSelect} />
                                                  </div>
                                             </div>
                                             <div className="w-full flex gap-2">
                                                  <button onClick={updateBook} className='w-full px-6 border-2 border-yellow-400 bg-yellow-400 text-white py-1.5 rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250'>
                                                       Updating
                                                  </button>
                                             </div>
                                        </form>
                                   )
                              )}

                              {creatingStatus && (
                                   <div className='absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-5 backdrop-blur-[3px] flex flex-col items-center justify-center'>
                                        <div className='bg-white p-8 rounded shadow-search flex flex-col items-center justify-center'>
                                             {creatingStatus === "loading" && <img src={load} width="60" alt="loading" />}
                                             {creatingStatus === "unvalide" && (
                                                  <div className='flex flex-col gap-4 items-center justify-center'>
                                                       <img src={unvalide} width="60" alt="unvalide" />
                                                       <h3 className='text-red-500 font-Poppins font-regular'>You cannot Update this book because {statusMessage}</h3>
                                                       <button
                                                            onClick={() => { setStatusMessage(""); setCreatingStatus(""); }}
                                                            className="w-full px-6 border-2 border-red-600 bg-red-600 text-white py-1.5 rounded-md hover:bg-transparent hover:text-red-600 font-semibold transition ease-out duration-250"
                                                       >
                                                            Understood
                                                       </button>
                                                  </div>
                                             )}
                                             {creatingStatus === "valid" && (
                                                  <div className='flex flex-col gap-4 items-center justify-center'>
                                                       <img src={valide} width="60" alt="valide" />
                                                       <h3 className='text-green-600 font-Poppins font-regular'>Book Updated successfully</h3>
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
               <Toaster expand={false} position="bottom-right" richColors />
          </div>
     );
};

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
               <div className={` ${isOpen ? "block" : "hidden"} text-zinc-800 p-3 rounded border mt-2 flex space-x-4`}>
                    <ul className="w-full">
                         {dropdownItems.map((item, index) => (
                              <li
                                   className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full"
                                   key={index}
                                   onClick={() => {
                                        setSelected(item);
                                        onSelect(item);
                                        setIsOpen(false);
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

export default Dash_UpdateBook;
