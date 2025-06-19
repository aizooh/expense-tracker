import React, {useContext} from 'react';
// import Navbar from './Navbar';
// import SideMenu from './SideMenu';
import {UserContext} from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';


const DashboardLayout = ({ activeMenu,  children }) => {
    const  {user }= useContext(UserContext)
  return (
    <div>
      <Navbar activeManu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;