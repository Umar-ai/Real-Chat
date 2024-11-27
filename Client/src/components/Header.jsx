import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

function Header() {
  const status = useSelector((state) => state.status);
  const userdata = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const navitems = [
    {
      name: 'Home',
      active: status,
      slug: '/chat',
    },
    {
      name: 'All',
      active: status,
      slug: '/all',
    },
    {
      name: 'Login',
      active: !status,
      slug: '/login',
    },
    {
      name: 'Register',
      active: !status,
      slug: '/register',
    }
  ];

  return (
    <div>
      <div className="bg-blue-800 rounded-md text-white shadow-md">
        <nav className="container mx-auto p-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            
            <div className="text-2xl text-white pt-2 uppercase font-extrabold ml-4">
              chat app
            </div>
          </div>
          <div className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row md:gap-7 font-semibold space-y-4 md:space-y-0">
              {navitems.map((item) =>
                item.active ? (
                  <li
                    key={item.slug}
                    className="hover:text-gray-400 text-xl cursor-pointer"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </li>
                ) : null
              )}
              {status && (
            <li>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <Logout/>
              </button>
            </li>
          )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
