import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import bin from '../../../assets/bin.png';
import ReactDatePicker from "react-datepicker";
import axios from "axios";
import borrowBook from "../../../assets/book.png";
import { Toaster, toast } from 'sonner'

const TableData = ({ data }) => {
  const URL = import.meta.env.APP_API_URL;
  const [borrowsData, setBorrowsData] = useState(data);
  const [action, setAction] = useState(null);
  const [target, setTarget] = useState(null);
  const [selectedSize, setSelectedSize] = useState(10);
  const [actualDeliveryDate, setActualDeliveryDate] = useState()
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState()
  const [messageReturning, setMessageReturning] = useState(null)
  const [messageDeleting, setMessageDeleting] = useState(null)
  const weeks = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const today = new Date(Date.now());
  const [startDate, setStartDate] = useState(today);

  useEffect(() => {
    const handleActionEvent = async () => {
      if (messageReturning == "Book has been returned successfuly" || "Book has been borrowed successfuly" || "Expected delivery date has been changed successfuly" || messageDeleting == "Borrowing has been deleted successfuly") {
        await new Promise(resolve => setTimeout(resolve, 800));
        handleClose()
      }
    }

    handleActionEvent()
  }, [messageReturning, messageDeleting])

  const asc = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="15"
      width="15"
      style={{ color: "#424242" }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.76 22.7794L12 1.2206L0.24 22.7794H23.76Z"
        strokeWidth="1"
      />
    </svg>
  );

  const desc = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="15"
      width="15"
      style={{ color: "#424242", transform: "rotate(180deg)" }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.76 22.7794L12 1.2206L0.24 22.7794H23.76Z"
        strokeWidth="1"
      />
    </svg>
  );

  const modifiedBorrowsData = useMemo(() => borrowsData.map(borrow => ({
    user: `${borrow.user.firstname} ${borrow.user.lastname}`,
    book: borrow.book.title,
    pickupDate: new Date(borrow.reservation.pickupDate).toLocaleDateString('en-GB'),
    expected_deliveryDate: new Date(borrow.reservation.expected_deliveryDate).toLocaleDateString('en-GB'),
    actual_deliveryDate: borrow.reservation.actual_deliveryDate ? new Date(borrow.reservation.actual_deliveryDate).toLocaleDateString('en-GB') : "...",
    status: borrow.reservation.status,
    id: borrow.reservation._id,
  })), [borrowsData, messageReturning, messageDeleting]);

  const columns = useMemo(
    () => [
      { Header: "User", accessor: "user" },
      { Header: "Book", accessor: "book" },
      { Header: "Pickup Date", accessor: "pickupDate" },
      { Header: "Expected Delivery Date", accessor: "expected_deliveryDate" },
      { Header: "Actual Delivery Date", accessor: "actual_deliveryDate" },
      { Header: "Status", accessor: "status" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize },
    pageCount,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: modifiedBorrowsData,
      initialState: { pageIndex: 0, pageSize: selectedSize },
    },
    useSortBy,
    usePagination
  );

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <li key={i}>
          <button
            onClick={() => gotoPage(i)}
            className={`px-3 h-8 leading-tight ${pageIndex === i ? "font-bold bg-yellow-50" : "text-gray-500 bg-white"} border border-gray-300 hover:bg-yellow-100 hover:text-gray-700`}
          >
            {i + 1}
          </button>
        </li>
      );
    }
    return pages;
  };

  const handleIconsClick = (act, id) => {
    setAction(act);
    setTarget(id);
  };

  const handleClose = () => {
    setAction(null);
    setTarget(null);
    setMessageReturning(null)
    setMessageDeleting(null)
  };

  const handleReturnBook = async () => {
    try {

      const newData = { actual_deliveryDate: new Date(Date.now()), status: "returned" };
      await axios.put(`${URL}reservations/updateReservationById/${target}`, newData);
      setMessageReturning("Book has been returned successfuly")
    } catch (error) {
      console.log(error);
    }
  }


  const handleBorrowBook = async () => {
    try {
      const newData = { expected_deliveryDate: expectedDeliveryDate, status: "borrowed" };
      await axios.put(`${URL}reservations/updateReservationById/${target}`, newData);
      setMessageReturning("Book has been borrowed successfuly")
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditBook = async () => {
    try {
      if(!expectedDeliveryDate){
        toast.error('all fields are required');
        return ;
      }
      const newData = { expected_deliveryDate: expectedDeliveryDate };
      await axios.put(`${URL}reservations/updateReservationById/${target}`, newData);
      setMessageReturning("Expected delivery date has been changed successfuly")
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletedBorrow = async () => {
    try {
      await axios.delete(`${URL}reservations/deleteReservationById/${target}`);
      setMessageDeleting("Borrowing has been deleted successfuly");
      setBorrowsData(prevBorrowsData =>
        prevBorrowsData.filter(borrow => borrow.reservation._id !== target)
      );
    } catch (error) {
      console.log(error);
    }
  }


  const handleActions = () => {
    if (action == "edit") {
      return (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="absolute top-2 right-2" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#282828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center">

            <div className="font-medium font-Poppins text-gray-600 flex flex-col items-center">
              <p className="">This action cannot be undone.</p>
              Are you sure you want to change expected delivery date
            </div>

            <div className='flex flex-col gap-2'>
              <div className="w-full px-2 py-2 bg-white rounded-md shadow-search justify-start items-center flex space-x-4">
                <div className="flex-1">
                  <ReactDatePicker
                    selected={expectedDeliveryDate}
                    onChange={setExpectedDeliveryDate}
                    name="expected_deliveryDate"
                    dateFormat="dd/MM/yyyy"
                    minDate={today}
                    maxDate={weeks}
                    placeholderText="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div className="text-[10px] font-Poppins font-bold">
              </div>
            </div>






            <div>
              {messageReturning && (
                <p className="text-green-600 font-Poppins text-[13px] font-bold">
                  {messageReturning}
                </p>
              )}
            </div>
          </div>
          <div
            onClick={handleEditBook}
            className="flex cursor-pointer items-center justify-center w-full px-6 border-2 border-green-600 bg-green-600 text-white py-1.5 rounded-md hover:bg-transparent hover:text-green-600 font-semibold transition ease-out duration-250"
          >
            Save
          </div>
        </div>)
    }
    if (action === "borrow") {
      return (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="absolute top-2 right-2" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#282828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center">

            <div className="font-medium font-Poppins text-gray-600 flex flex-col items-center">
              <p className="">This action cannot be undone.</p>
              Are you sure this reservation is borrowed ?
            </div>

            <div className='flex flex-col gap-2'>
              <div className="w-full px-2 py-2 bg-white rounded-md shadow-search justify-start items-center flex space-x-4">
                <div className="flex-1">
                  <ReactDatePicker
                    selected={expectedDeliveryDate}
                    onChange={setExpectedDeliveryDate}
                    name="expected_deliveryDate"
                    dateFormat="dd/MM/yyyy"
                    minDate={today}
                    maxDate={weeks}
                    placeholderText="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div className="text-[10px] font-Poppins font-bold">
                if you did not enter a date , the expected delivery date won't change
              </div>
            </div>






            <div>
              {messageReturning && (
                <p className="text-green-600 font-Poppins text-[13px] font-bold">
                  {messageReturning}
                </p>
              )}
            </div>
          </div>
          <div
            onClick={handleBorrowBook}
            className="flex cursor-pointer items-center justify-center w-full px-6 border-2 border-green-600 bg-green-600 text-white py-1.5 rounded-md hover:bg-transparent hover:text-green-600 font-semibold transition ease-out duration-250"
          >
            Save
          </div>
        </div>)
    }
    if (action === "return") {
      return (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="absolute top-2 right-2" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#282828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <dic className="font-medium font-Poppins text-gray-600 flex flex-col items-center">
              <p className="">This action cannot be undone.</p>
              Are you sure  this Borrow is returned ?
            </dic>
            <div>
              {messageReturning && (
                <p className="text-green-600 font-Poppins text-[13px] font-bold">
                  {messageReturning}
                </p>
              )}
            </div>
          </div>
          <div
            onClick={handleReturnBook}
            className="flex cursor-pointer items-center justify-center w-full px-6 border-2 border-green-600 bg-green-600 text-white py-1.5 rounded-md hover:bg-transparent hover:text-green-600 font-semibold transition ease-out duration-250"
          >
            Save
          </div>
        </div>
      );
    }
    if (action === "delete") {
      return (
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="absolute top-2 right-2" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#282828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>

          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex flex-col gap-2 items-center">
                <img src={bin} width={"60"} alt="trash" />
                <h1 className="text-[25px] font-Poppins">Delete Borrow</h1>
              </div>
              <div>
                <h4 className="font-medium font-Poppins text-gray-600">
                  This action cannot be undone. Are you sure you want to delete this Borrow?
                </h4>
              </div>
            </div>
            <div
              className="text-red-700 font-bold"
              style={{ visibility: messageDeleting ? "visible" : "hidden" }}
            >
              {messageDeleting}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="w-fit px-10 border-2 border-red-600 bg-red-600 text-white py-1.5 rounded-md hover:bg-transparent hover:text-red-600 font-semibold transition ease-out duration-250"
              onClick={handleDeletedBorrow}
            >
              Delete
            </button>
            <button
              className="w-fit px-10 border-[2px] border-gray-400 bg-gray-200 text-gray-800 font-bold py-1.5 rounded-md hover:bg-gray-300 font-semibold transition ease-out duration-250"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
  };


  return (
    <div className="flex flex-col gap-6 mt-6">
      {action && (
        <div className="z-20 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
          <div className="w-fit bg-white pt-14 pb-8 px-5 rounded flex flex-col items-center justify-center relative">
            {handleActions()}
          </div>
        </div>
      )}
      <div className="z-10 relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500" {...getTableProps()}>
          <thead className="text-xs text-gray-700 uppercase bg-yellow-100">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 font-Poppins text-[15px]">
                    <div className="flex items-center justify-between">
                      <span>{column.render("Header")}</span>
                      <span>{column.isSorted ? (column.isSortedDesc ? desc : asc) : ""}</span>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-center font-Poppins text-[15px]">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr className="bg-white border-b" {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td className="font-Mulish px-6 py-4 font-medium text-gray-900 whitespace-nowrap" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-5">

                      {row.original.status == "reserved" && (
                        <div onClick={() => handleIconsClick('borrow', row.original.id)}>
                          <img src={borrowBook} className="w-[25px] md:shrink-0 h-[25px] transition ease-out duration-200 cursor-pointer opacity-60 hover:opacity-100" />
                        </div>

                      )}
                      {row.original.status ==  "borrowed" && (
                        <div onClick={() => handleIconsClick('edit', row.original.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" transition ease-out duration-200 cursor-pointer opacity-60 hover:opacity-100 feather feather-edit">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </div>
                      )}

                      {row.original.status != "returned" && (
                        <div onClick={() => handleIconsClick('return', row.original.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition ease-out duration-200 cursor-pointer opacity-60 hover:opacity-100 feather feather-corner-down-left">
                            <polyline points="9 10 4 15 9 20"></polyline>
                            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                          </svg>
                        </div>
                      )}

                      <div onClick={() => handleIconsClick('delete', row.original.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition ease-out duration-200 cursor-pointer opacity-60 hover:opacity-100 feather feather-trash">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </div>


                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <nav className="mt-3 flex items-center flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span className="font-semibold text-gray-900">{pageIndex * pageSize + 1}-{Math.min((pageIndex + 1) * pageSize, borrowsData.length)}</span> of <span className="font-semibold text-gray-900">{borrowsData.length}</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button onClick={previousPage} disabled={!canPreviousPage} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-yellow-100 hover:text-gray-700 cursor-pointer ${!canPreviousPage ? 'opacity-40 cursor-not-allowed' : ''}`}>
                Previous
              </button>
            </li>
            {generatePageNumbers()}
            <li>
              <button onClick={nextPage} disabled={!canNextPage} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-yellow-100 hover:text-gray-700 cursor-pointer ${!canNextPage ? 'opacity-40 cursor-not-allowed' : ''}`}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Toaster expand={false} position="bottom-right" richColors />
    </div>
  );
};

export default TableData;
