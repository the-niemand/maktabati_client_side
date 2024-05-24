import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import axios from "axios";
import load from '../../../assets/loading.gif';
import valide from '../../../assets/valide.gif';
import unvalide from '../../../assets/unvalide.gif';
import DropBooks from "../../../components/DropBooks";
import DropUsers from "../../../components/DropUsers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './calender.css';

const Dash_NewBorrow = () => {


     const navigate = useNavigate();
     const URL = import.meta.env.APP_API_URL;
     const [creatingStatus, setCreatingStatus] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");
     const today = new Date(Date.now() + 24 * 60 * 60 * 1000);
     const [startDate, setStartDate] = useState(today);
     const [formData, setFormData] = useState({
          userId: "",
          bookId: "",
          expectedDeliveryDate: today,
          status: "borrowed"
     });

     useEffect(() => {
          const handleCreationSuccess = async () => {
               if (creatingStatus === "valid") {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    navigate('/maktabati_client_side/Adminpage/borrows');
               }
          };

          handleCreationSuccess();
     }, [creatingStatus, navigate]);

     const handleDateChange = (date) => {
          setFormData({
               ...formData,
               expectedDeliveryDate: date,
          });
     };

     const handleBookSelect = (book_id) => {
          setFormData({
               ...formData,
               bookId: book_id,
          });
     };

     const handleUserSelect = (user_id) => {
          setFormData({
               ...formData,
               userId: user_id,
          });
     };

     const handleCreatingCar = async () => {
          try {
               setCreatingStatus("loading");
               const response = await axios.post(`${URL}reservations/createReservation`, formData);
               if (response.status === 201 || response.status === 200) {
                    setCreatingStatus("valid");
               }
          } catch (error) {
               console.log(error);
               setCreatingStatus("unvalide");
               setStatusMessage(error.response?.data?.message || "Error occurred");
          }
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          handleCreatingCar();
     };

     return (
          <>
               <div className='flex flex-col'>
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">New Borrow Creation</div>
                    <CurrentDateLogger />
               </div>
               <div className='flex flex-col space-y-4 mt-10'>
                    <div className='flex justify-start'>
                         <Link to="/maktabati_client_side/Adminpage/borrows" className="w-fit bg-yellow-400 rounded-md py-2 px-4 flex justify-center items-center space-x-2 cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                              <div className="text-base font-bold font-['DM Sans'] text-white mr-2">Back</div>
                         </Link>
                    </div>

                    <div className='flex justify-center items-center mt-10 w-full'>
                         <div className='bg-white shadow-search rounded p-16 w-2/4'>
                              <form onSubmit={handleSubmit}>
                                   <DropUsers onSelect={handleUserSelect} />
                                   <DropBooks onSelect={handleBookSelect} />
                                   <div className='flex flex-col gap-2 mb-4 '>
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Brand">
                                             Expected Delivery Date
                                        </label>
                                        <div className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                             <DatePicker
                                                  selected={formData.expectedDeliveryDate}
                                                  onChange={handleDateChange}
                                                  name="expected_deliveryDate"
                                                  dateFormat="dd/MM/yyyy"
                                                  minDate={startDate}
                                             />
                                        </div>
                                   </div>
                                   <div className="w-full">
                                        <button type="submit" className='w-full px-6 border-2 border-yellow-400 bg-yellow-400 text-white py-1.5 rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250'>
                                             Create
                                        </button>
                                   </div>
                              </form>
                              {creatingStatus && (
                                   <div className='absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-5 backdrop-blur-[3px] flex flex-col items-center justify-center'>
                                        <div className='bg-white p-8 rounded shadow-search flex flex-col items-center justify-center'>
                                             {creatingStatus === "loading" && (
                                                  <img src={load} width="60" alt="loading" />
                                             )}
                                             {creatingStatus === "unvalide" && (
                                                  <div className='flex flex-col gap-4 items-center justify-center'>
                                                       <img src={unvalide} width="60" alt="unvalide" />
                                                       <h3 className='text-red-500 font-Poppins font-regular'>You cannot create a new Car because {statusMessage}</h3>
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
                                                       <h3 className='text-green-600 font-Poppins font-regular'>Car created successfully</h3>
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </>
     );
};


export default Dash_NewBorrow;
