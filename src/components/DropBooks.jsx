import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DropBooks = ({ onSelect }) => {

     const URL = import.meta.env.APP_API_URL;
     const [carsBrand, setCarsBrand] = useState();
     const [brand, setBrand] = useState("");
     const [isOpen, setIsOpen] = useState(false);

     useEffect(() => {
          const fetchBooks = async () => {
               try {
                    const books = await axios.get(`${URL}books/fetchBooks`)
                    setCarsBrand(books.data.data)
               } catch (err) {
                    console.log(err);
               }
          }
          fetchBooks();
     }, [URL]);

     const handleChange = (e) => {
          const value = e.target.value;
          setBrand(value);
          if (value.length > 0) {
               setIsOpen(true);
          } else {
               setIsOpen(false);
          }
     };

     const filteredBrands = () => {
          if (brand && carsBrand) {
               return carsBrand.filter(item =>
                    item.title.toLowerCase().startsWith(brand.toLowerCase())
               );
          }
          return [];
     };

     return (
          <div className='flex flex-col gap-2 mb-4'>
               <div>
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Brand">
                         Book Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Brand" name="Brand" type="text" placeholder="Brand..." onChange={handleChange} value={brand} />
               </div>

               <div className={` ${brand && isOpen ? "block" : "hidden"} max-h-40 overflow-y-scroll text-zinc-800 p-3 rounded border mt-2 flex space-x-4`}>
                    <ul className="w-full">
                         {filteredBrands().map((item, index) => (
                              <li
                                   className={`cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full ${item.copies === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                                   key={index}
                                   onClick={() => {
                                        setBrand(item.title);
                                        onSelect(item._id);
                                        setIsOpen(false);
                                   }}
                                   disabled={item.copies === 0}
                              >
                                   {item.title}{item.copies === 0 && <p className='text-red-500 font-Poppins text-[13px] font-bold inline ml-5'>book out of stock</p>}
                              </li>
                         ))}

                         <li className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full" onClick={() => {
                              setBrand("other");
                              onSelect("other");
                              setIsOpen(false);
                         }}>
                              Other...
                         </li>

                    </ul>
               </div>

          </div>
     );
};

export default DropBooks;
