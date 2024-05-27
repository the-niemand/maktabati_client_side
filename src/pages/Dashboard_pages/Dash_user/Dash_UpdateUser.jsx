import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import generateIcon from '../../../assets/magic.png';
import { Dropdown } from '../Dash_book/Dash_NewBook';
import axios from 'axios';
import load from '../../../assets/loading.gif';
import valide from '../../../assets/valide.gif'
import unvalide from '../../../assets/unvalide.gif'

const Dash_UpdateUser = () => {
     const URL = import.meta.env.APP_API_URL;

     const navigate = useNavigate()
     const { id } = useParams();
     const [userData, setUserData] = useState(null);
     const [loading, setLoading] = useState(true);





     const [firstname, setFirstname] = useState('');
     const [lastname, setLastname] = useState('');
     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('')
     const [role, setRole] = useState('')




     const [messageFirstname, setMessageFirstname] = useState('');
     const [messageLastname, setMessageLastname] = useState('');
     const [messageEmail, setMessageEmail] = useState('');
     const [messagePhone, setMessagePhone] = useState('');


     const [selectedType, setSelectedType] = useState('');


     const [creatingStatus, setCreatingStatus] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");


     useEffect(() => {
          const fetchUsers = async () => {
               try {
                    const fetch_url = `${URL}users/fetchUser/${id}`;
                    const response = await axios.get(fetch_url);
                    setUserData(response.data.data);
                    setLoading(false);
                    setFirstname(response.data.data.firstname)
                    setLastname(response.data.data.lastname)
                    setEmail(response.data.data.email)
                    setPhone(response.data.data.phone)
                    setRole(response.data.data.role)
               } catch (error) {
                    console.log('Error fetching users:', error);
                    setLoading(false);
               }
          };

          fetchUsers();
          const handleCreationSuccess = async () => {
               if (creatingStatus === "valid") {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    navigate('/maktabati_client_side/Adminpage/users');
               }
          };

          handleCreationSuccess();

     }, [creatingStatus, URL]);









     const handleUpdatingUser = async (e) => {
          if (!firstname) {
               setMessageFirstname('First name is required');
          }
          if (!email) {
               setMessageEmail("Email is required")
          }
          if (!lastname) {
               setMessageLastname('Last name is required');
          }
          if (!phone) {
               setMessagePhone('Phone number is required');
               setCreatingStatus(null)
          }
          if (firstname, email, lastname, phone) {
               try {
                    setCreatingStatus("loading")
                    const data = {
                         firstname: firstname,
                         lastname: lastname,
                         email: email,
                         phone: phone
                    };

                    if (selectedType) {
                         data.role = selectedType;
                    }

                    const fetch_url = `${URL}users/updateUserById/${id}`;
                    const response = await axios.put(fetch_url, data);
                    if (response.status === 200) {
                         setCreatingStatus("valid")
                    }
               } catch (error) {
                    setCreatingStatus("unvalide")
                    setStatusMessage(error.response.data.message)
               }
          }

     };

     const handleTypeSelect = (type) => {
          setSelectedType(type);
     };

     const generateRandomNumber = () => {
          const length = Math.floor(Math.random() * 4) + 1;
          let randomNumber = '';
          for (let i = 0; i < length; i++) {
               const digit = i === 0 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 10);
               randomNumber += digit.toString();
          }
          return parseInt(randomNumber, 10);
     };





     const handleEmailGeneration = () => {
          setMessageFirstname("")
          setMessageLastname("")
          if (!firstname && !lastname) {
               setMessageFirstname('First name is required');
               setMessageLastname('Last name is required');
          } else if (!firstname) {
               setMessageFirstname('First name is required');
          } else if (!lastname) {
               setMessageLastname('Last name is required');
          } else {
               const generatedEmail = `${firstname.toLowerCase()}${lastname.toLowerCase()}_${generateRandomNumber()}@gmail.com`;
               setEmail(generatedEmail);
               setMessageEmail("")
          }

     };



     const Handlefirstname = (e) => {
          if (e.target.value.length == 0) {
               setMessageFirstname('First name is required')
          }
          else {
               setMessageFirstname('')
          }
          setFirstname(e.target.value);
     }

     const Handlelastname = (e) => {
          if (e.target.value.length == 0) {
               setMessageLastname('Last name is required')
          }
          else {
               setMessageLastname('')
          }
          setLastname(e.target.value);
     }



     const HandleEmail = (e) => {
          if (e.target.value.length == 0) {
               setMessageEmail('Last name is required')
          }
          else {
               setMessageEmail('')
          }
          setEmail(e.target.value);
     }




     const handlePhoneChange = (e) => {
          const value = e.target.value;
          if (e.target.value.length == 0) {
               setMessagePhone('Phone number is required')
          }
          else {
               setMessagePhone('')
          }
          const numericValue = value.replace(/[^0-9]/g, '');
          if (numericValue.length > 9) {
               return;
          }
          setPhone(numericValue);
     };



     const handleSubmit = (e) => {
          e.preventDefault()
     }




     const CheckPhonenumber = (e) => {
          if (e.target.value.length !== 0 && e.target.value.length < 9) {
               setMessagePhone('phone number should contain 9 numbers');
          } else {
               setMessagePhone("")
          }

     }




     return (
          <div className="flex flex-col gap-8 mb-12">
               <div className="flex flex-col">
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">New User Creation</div>
                    <CurrentDateLogger />
               </div>
               <div className="flex flex-col gap-10">
                    <div className="flex justify-start">
                         <Link to="/maktabati_client_side/Adminpage/users" className="w-fit bg-yellow-400 rounded-md py-2 px-4 flex justify-center items-center space-x-2 cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                                   <polyline points="15 18 9 12 15 6" />
                              </svg>
                              <div className="text-base font-bold font-['DM Sans'] text-white mr-2">Back</div>
                         </Link>
                    </div>


                    <div className="flex justify-center items-center w-full">
                         <div className="relative bg-white shadow-search rounded p-16 w-2/4">

                              {loading ? (
                                   <div className='w-full h-full flex flex-col items-center justify-center'>
                                        <div>
                                             <img src={load} width="60" alt="loading" />
                                        </div>
                                   </div>
                              ) : (
                                   <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

                                        {/* // firstname and last name */}
                                        <div className="flex w-full justify-between items-start">
                                             <div className="w-[48%]">
                                                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="firstName">
                                                       First Name
                                                  </label>
                                                  <input
                                                       className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                       id="firstName"
                                                       type="text"
                                                       placeholder="First Name..."
                                                       value={firstname}
                                                       onChange={(e) => Handlefirstname(e)}
                                                  />
                                                  <div
                                                       className="text-red-500"
                                                       style={{ visibility: messageFirstname ? 'visible' : 'hidden' }}
                                                  >
                                                       {messageFirstname}
                                                  </div>

                                             </div>

                                             <div className="w-[48%]">
                                                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="lastName">
                                                       Last Name
                                                  </label>
                                                  <input
                                                       className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                       id="lastName"
                                                       type="text"
                                                       placeholder="Last Name..."
                                                       value={lastname}
                                                       onChange={(e) => Handlelastname(e)}
                                                  />
                                                  <div
                                                       className="text-red-500"
                                                       style={{ visibility: messageLastname ? 'visible' : 'hidden' }}
                                                  >
                                                       {messageLastname}
                                                  </div>
                                             </div>
                                        </div>

                                        {/* //email */}
                                        <div >
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
                                                  Email
                                             </label>
                                             <div className="w-full border rounded flex items-center pr-3">
                                                  <input
                                                       className="shadow appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600  focus:shadow-outline"
                                                       id="email"
                                                       type="email"
                                                       placeholder="Email address..."
                                                       value={email}
                                                       onChange={HandleEmail}
                                                       autoComplete='username'
                                                  />
                                                  <img src={generateIcon} className="cursor-pointer w-5 h-5 opacity-40 hover:opacity-100 transition ease-out duration-150" alt="generate-icon" onClick={handleEmailGeneration} />
                                             </div>
                                             <div
                                                  className="text-red-500"
                                                  style={{ visibility: messageEmail ? 'visible' : 'hidden' }}
                                             >
                                                  {messageEmail}
                                             </div>

                                        </div>




                                        {/* //phone and type*/}
                                        <div>
                                             <div className='flex justify-between items-start'>
                                                  <div className='w-[68%]' >
                                                       <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="passwordConfirmation">
                                                            phone number
                                                       </label>
                                                       <div className="w-full border rounded flex items-center pr-3">
                                                            <div className='bg-gray-300 h-full'>
                                                                 <p className='text-gray-600 font-regular p-2'>+212</p>
                                                            </div>
                                                            <input
                                                                 className="shadow appearance-none rounded w-full p-3 text-gray-700 leading-tight outline-none focus:outline-none focus:ring-0 focus:border-gray-600 focus:shadow-outline"
                                                                 id="phone"
                                                                 type="tel"
                                                                 placeholder="Enter phone number..."
                                                                 value={phone}
                                                                 onChange={handlePhoneChange}
                                                                 onBlur={CheckPhonenumber}
                                                            />

                                                       </div>

                                                  </div>

                                                  <div className='w-[30%]'>
                                                       <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="copies">
                                                            Type
                                                       </label>
                                                       <Dropdown name={role} dropdownItems={["member", "admin"]} onSelect={handleTypeSelect} />
                                                  </div>

                                             </div>


                                             <div
                                                  className="text-red-500"
                                                  style={{ visibility: messagePhone ? 'visible' : 'hidden' }}
                                             >
                                                  {messagePhone}
                                             </div>
                                        </div>



                                        <div className="w-full mt-6">
                                             <button onClick={handleUpdatingUser} className="w-full px-6 border-2 border-green-500 bg-green-500 text-white font-medium py-1.5 rounded-md hover:bg-transparent hover:text-green-500 font-semibold transition ease-out duration-250" >
                                                  update
                                             </button>
                                        </div>
                                   </form>
                              )}
                              {
                                   creatingStatus && (
                                        <div className='absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-5 backdrop-blur-[3px] flex flex-col items-center justify-center'>
                                             <div className='bg-white p-8 rounded shadow-search flex flex-col items-center justify-center'>
                                                  {creatingStatus === "loading" && (
                                                       <img src={load} width="60" alt="loading" />
                                                  )}
                                                  {creatingStatus === "unvalide" && (
                                                       <div className='flex flex-col gap-4 items-center justify-center'>
                                                            <img src={unvalide} width="60" alt="unvalide" />
                                                            <h3 className='text-red-500 font-Poppins font-regular'>You cannot create a new user because {statusMessage}</h3>
                                                            <button
                                                                 onClick={() => { setStatusMessage(""); setCreatingStatus(""); }}
                                                                 className="w-full px-6 border-2 border-red-600 bg-red-600 text-white py-1.5 rounded-md hover:bg-transparent hover:text-red-600 font-semibold transition ease-out duration-250"
                                                            >
                                                                 understood
                                                            </button>
                                                       </div>
                                                  )}
                                                  {creatingStatus === "valid" && (
                                                       <div className='flex flex-col gap-4 items-center justify-center'>
                                                            <img src={valide} width="60" alt="valide" />
                                                            <h3 className='text-green-600 font-Poppins font-regular'>User Updated successfully</h3>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   )
                              }



                         </div>
                    </div>
               </div >
          </div >
     );
};

export default Dash_UpdateUser;
