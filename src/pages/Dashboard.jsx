import React from 'react'
import Sidebar from '../components/sidebar'
import { Routes, Route } from 'react-router-dom'
import Dash_Books from './Dashboard_pages/Dash_book/Dash_Books';
import Dash_Users from './Dashboard_pages/Dash_user/Dash_Users';
import Dash_NewBook from './Dashboard_pages/Dash_book/Dash_NewBook';
import Dash_NewUser from './Dashboard_pages/Dash_user/Dash_NewUser';
import Dash_UpdateUser from './Dashboard_pages/Dash_user/Dash_UpdateUser';
import Dash_Borrows from './Dashboard_pages/Dash_Borrows/Dash_Borrows';
import Dash_NewBorrow from './Dashboard_pages/Dash_Borrows/Dash_NewBorrow';
import Dash_UpdateBook from './Dashboard_pages/Dash_book/Dash_UpdateBook';

const Dashboard = () => {
     return (
          <div className='flex'>
               <Sidebar />
               <div className='w-screen flex flex-col px-16 py-10 relative'>
                    <Routes>

                         <Route path='/books' element={<Dash_Books />} />
                         <Route path='/books/Create_Book' element={<Dash_NewBook />} />
                         <Route path='/books/Update_Book/:id' element={<Dash_UpdateBook />} />

                         <Route path='/users' element={<Dash_Users />} />
                         <Route path='/users/Create_User' element={<Dash_NewUser />} />
                         <Route path='/users/Update_User/:id' element={<Dash_UpdateUser />} />

                         <Route path='/borrows' element={<Dash_Borrows />} />
                         <Route path='/borrows/Create_borrow' element={<Dash_NewBorrow />} />

                    </Routes>
               </div>
          </div>
     )
}

export default Dashboard