import React from 'react'
import Sidebar from '../components/sidebar'
import { Routes, Route } from 'react-router-dom'

const Dashboard = () => {
     return (
          <div className='flex'>
               <Sidebar />
               <div>
                    <Routes>
                         <Route path='/*' element={<Books />} />
                         <Route path='/users' element={<Users />} />
                         <Route path='/borrows' element={<Borrows />} />
                    </Routes>
               </div>
          </div>
     )
}

const Books = () => {
     return (
          <div className='font-bold'>
               Skarta7
          </div>
     )
}
const Users = () => {
     return (
          <div className='font-bold'>
               will conquer the world
          </div>
     )
}
const Borrows = () => {
     return (
          <div className='font-bold'>
               9lawa
          </div>
     )
}

export default Dashboard