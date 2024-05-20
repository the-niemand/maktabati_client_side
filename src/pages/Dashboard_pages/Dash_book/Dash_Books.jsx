import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios library for making HTTP requests
import CurrentDateLogger from '../../../components/Date';
import addbook from '../../../assets/literature.png';
import { Link } from 'react-router-dom';
import Dropdown from '../../../components/subcomponents/dropdown';
import loadingSpinner from "../../../assets/loading.gif";
import bin from '../../../assets/bin.png'


const Dash_Books = () => {
    const URL = import.meta.env.APP_API_URL;

    const [searchFieldValue, setSearchFieldValue] = useState('');
    const [booksData, setBooksData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Messagedeletion, setMessagedeletion] = useState('');
    const [action, setAction] = useState(null);
    const [target, setTarget] = useState(null);

    useEffect(() => {
        const handleActionEvent = async () => {
            if (Messagedeletion === "Book has been deleted") {
                await new Promise(resolve => setTimeout(resolve, 800));
                handleClose()
            }
        };

        handleActionEvent();
    }, [Messagedeletion]);

    const handleClose = () => {
        setAction(null);
        setTarget(null);
        setMessagedeletion("")
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const fetchUrl = `${URL}books/fetchBooks`;
                const response = await axios.get(fetchUrl);
                setBooksData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching books:', error);
                setLoading(false);
            }
        };
        fetchBooks();

    }, [URL]);

    const clearInput = () => {
        setSearchFieldValue('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const deleteBook = async (id) => {
        try {
            const fetchUrl = `${URL}books/deleteBookById/${id}`;
            const response = await axios.delete(fetchUrl);
            if (response) {
                setMessagedeletion("Book has been deleted")
                setBooksData(prevBooksData => prevBooksData.filter(book => book._id !== id));
            }
        } catch (error) {
            console.log('Error fetching books:', error);
            alert("deletion failed")
        }

    }

    const handleActions = () => {
        if (action == "delete") {
            return (
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="absolute top-2 right-2" onClick={handleClose} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

                    </div>

                    <div className="flex flex-col gap-6 items-center">

                        <div className="flex flex-col gap-1 items-center" >
                            <div className="flex flex-col gap-2 items-center">
                                <img src={bin} width={"60"} alt="trash" />
                                <h1 className="text-[25px] font-Poppins ">Delete Book</h1>
                            </div>

                            <div>
                                <h4 className="font-medium font-Poppins text-gray-600">This action can not be undone. Are you sure you want to delete this Book ? </h4>
                            </div>
                        </div>

                        <div
                            className="text-red-600 font-bold"
                            style={{ visibility: Messagedeletion ? 'visible' : 'hidden' }}
                        >
                            {Messagedeletion}
                        </div>


                    </div>



                    <div className="flex gap-3">
                        <button className="w-fit px-10 border-2 border-red-600 bg-red-600 text-white py-1.5   rounded-md hover:bg-transparent hover:text-red-600 font-semibold transition ease-out duration-250" onClick={() => { deleteBook(target) }}>
                            Delete
                        </button>
                        <button className="w-fit px-10 border-[2px] border-gray-400 bg-gray-200 text-gray-800 font-bold py-1.5   rounded-md hover:bg-gray-300 font-semibold transition ease-out duration-250" onClick={handleClose}>
                            cancel
                        </button>
                    </div>
                </div>
            )
        }

    };


    const handleBookDeletion = (id) => {
        setAction("delete")
        setTarget(id)
    }


    const handleList = (list) => {
        if (list && list.length > 0) {
            return list.join(', ');
        } else {
            return "unknown";
        }
    }

    return (
        <>

            {action && (
                <div className=" z-20 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
                    <div className="w-fit bg-white pt-14 pb-8 px-5 rounded flex flex-col items-center justify-center relative" >
                        {handleActions()}
                    </div>
                </div>
            )}
            <div className='flex flex-col'>
                <div className="text-zinc-800 text-[18px] font-extra font-Mulish">Books management</div>
                <CurrentDateLogger />
            </div>
            <div className='flex flex-col space-y-4'>
                <div className='flex justify-end mb-4'>
                    <Link to={"Create_Book"} className="w-fit bg-yellow-400 rounded-md py-2  px-4 flex justify-center items-center space-x-3 cursor-pointer hover:shadow-button transition ease-out duration-150">
                        <div className=" text-white text-base font-bold font-['DM Sans']">Add new book</div>
                        <img className="w-6 h-6" src={addbook} alt="Add book" />
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
                                className="opacity-60 cursor-pointer hover:opacity-100 transition ease-out duration-150"
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
                                value={searchFieldValue}
                                onChange={(e) => setSearchFieldValue(e.target.value)}
                            />
                        </div>
                        {searchFieldValue && (
                            <div onClick={clearInput}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-fit px-6 border-2 border-yellow-400 bg-yellow-400 text-white py-1.5 rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250"
                        >
                            Search
                        </button>
                    </div>

                </div>
                <div className='flex justify-between mt-10'>
                    <div className='flex space-x-3'>
                        <Dropdown name={"Category"} dropdownItems={["Fantasy", "Horror", "Romance", "Historical fiction", "Science fiction", "Mystery", "Thriller", "Autobiography"]} />
                        <Dropdown name={"Sort by"} dropdownItems={["Release Date", "Price", "Trend"]} />
                    </div>
                    <div>
                        <Dropdown name={"Type"} dropdownItems={["Books", "Novel", "Magazines", "Newspapers"]} />
                    </div>
                </div>
            </div>
            <div className='mt-20 flex flex-wrap justify-center gap-10'>
                {loading ? (
                    <div className='w-full h-full flex items-center justify-center mt-32'>
                        <div className=' w-[180px] h-[180px]  bg-white shadow-lg flex items-center justify-center'>
                            <img src={loadingSpinner} alt="Loading" width={100} />
                        </div>
                    </div>
                ) : (
                    booksData && (
                        booksData.map((book, index) => (
                            <div key={index} className='bg-white shadow-search rounded flex justify-between overflow-hidden gap-4 h-50'>
                                <div className='w-[150px] h-full border-r border-neutral-200'>
                                    <img className="object-cover rounded-tl rounded-bl w-full h-full" src={`${book.image}`} alt={book.title} />
                                </div>

                                <div className='w-fit flex flex-col justify-evenly items-start py-6 pr-8'>
                                    <div>
                                        <p className='text-black text-sm font-extra font-Poppins w-[100px] '>{book.title}</p>
                                        <p className='text-black text-[10px] font-medium font-Poppins w-[100px] '>By {handleList(book.authors)}</p>
                                    </div>
                                    <div className='flex w-full justify-between items-center'>
                                        <div className='w-fit text-justify text-black text-[11.10px] font-normal font-Poppins'>
                                            {book.type}
                                        </div>
                                        <div className='w-fit text-justify text-black text-[11.10px] font-normal font-Poppins'>
                                            {book.copies} copies
                                        </div>
                                    </div>

                                    <div className='w-[100px] text-justify text-black text-[11.10px] font-normal font-Poppins truncate' title={handleList(book.categories)}>
                                        {handleList(book.categories)}
                                    </div>
                                    <div className='flex gap-2'>
                                        <button className='w-fit bg-yellow-400 rounded-sm text-white text-[12px] px-2 py-1 font-bold opacity-70 hover:opacity-100 transition ease-out duration-200'>Edit</button>
                                        <button className='w-fit bg-red-600 rounded-sm text-white text-[12px] px-2 py-1 font-bold opacity-70 hover:opacity-100 transition ease-out duration-200' onClick={() => { handleBookDeletion(book._id) }}>delete</button>
                                    </div>
                                </div>

                            </div>
                        ))
                    )
                )}

            </div>
        </>
    );
}

export default Dash_Books;
