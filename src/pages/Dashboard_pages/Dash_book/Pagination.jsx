import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.map((page, index) => {
        return (
          <div key={index} className='border border-gray-400 rounded-sm'>
            <button
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? 'bg-yellow-400 text-white font-bold rounded-sm px-4 py-2'
                  : 'text-black font-medium  rounded-sm px-4 py-2'
              }
            >
              {page}
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Pagination;
