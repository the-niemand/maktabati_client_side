import React from 'react'
import Sidebar from '../components/sidebar'
import { Routes, Route } from 'react-router-dom'
import Dash_Books from './Dashboard_pages/Dash_Books';
import Dash_Users from './Dashboard_pages/Dash_Users';
import Dash_NewBook from './Dashboard_pages/Dash_NewBook';

const Dashboard = () => {
     return (
          <div className='flex '>
               <Sidebar />
               <div className='w-screen flex flex-col px-16 py-10'>
                    <Routes>
                         {/* <Route path='/*' element={<Dash_Books />} /> */}
                         <Route path='/books' element={<Dash_Books />} />
                         <Route path='/books/Create_Book' element={<Dash_NewBook />} />
                         <Route path='/users' element={<Dash_Users />} />
                    </Routes>
               </div>
          </div>
     )
}

export default Dashboard