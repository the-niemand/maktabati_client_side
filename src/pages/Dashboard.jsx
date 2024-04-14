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
          <div>
               Books
          </div>
     )
}
const Users = () => {
     return (
          <div>
               Users
          </div>
     )
}
const Borrows = () => {
     return (
          <div>
               Borrows
          </div>
     )
}

export default Dashboard