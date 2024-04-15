import React from 'react'
import Sidebar from '../components/sidebar'
import { Routes, Route } from 'react-router-dom'
import Dash_Books from './Dashboard_pages/Dash_Books';
import Dash_Users from './Dashboard_pages/Dash_Users';

const Dashboard = () => {
     return (
          <div className='flex '>
               <Sidebar />
               <div className='w-screen flex flex-col px-16 py-10 space-y-8'>
                    <Routes>
                         <Route path='/*' element={<Dash_Books />} />
                         <Route path='/users' element={<Dash_Users />} />
                    </Routes>
               </div>
          </div>
     )
}

export default Dashboard