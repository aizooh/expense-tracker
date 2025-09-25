import React, {useContext} from 'react';
// import Navbar from './Navbar';
import SideMenu from './SideMenu';
import {userContext} from '../../context/userContext';
// import SideMenu from './SideMenu';
import Navbar from './Navbar';


const DashboardLayout = ({ activeMenu,  children }) => {
    const  { user }= useContext(userContext)
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (  
        <div className="flex flex-1">
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