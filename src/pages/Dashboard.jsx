import React from 'react'
import Sidebar from '../components/sidebar';
import {
     Routes,
     Route,
} from "react-router-dom";

const Dashboard = () => {
     return (
          <div className='flex'>
               <Sidebar />
               <div className='flex-1 h-screen overflow-auto'>
                    <Routes>
                         <Route exact path="/books" element={<Books />} />
                         <Route exact path="/users" element={<User />} />
                         <Route exact path="/borrows" element={<Borr />} />
                         <Route exact path="/returns" element={<Retu />} />
                         <Route exact path="/settings" element={<Sett />} />
                         <Route exact path="/logout" element={<Log />} />
                    </Routes>
               </div>
          </div>
     );
}


const Books = () => {
     return (
          <div>Books Page</div>
     );
};

const User = () => {
     return (
          <div>User Page</div>
     );
};

const Borr = () => {
     return (
          <div>Borrows Page</div>
     );
};

const Retu = () => {
     return (
          <div>Returns Page</div>
     );
};

const Sett = () => {
     return (
          <div>Settings Page</div>
     );
};

const Log = () => {
     return (
          <div>Logout Page</div>
     );
};

export default Dashboard;