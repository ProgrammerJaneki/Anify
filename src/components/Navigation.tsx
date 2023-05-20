import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Navigation = () => {
   return (
      <>
         <div className="bg-[#14181d] grid place-items-center py-4 px-4 w-full">
            <header className=" flex justify-between items-center w-full max-w-4xl">
               {/* Left */}
               <div className="font-extrabold text-4xl">
                  A<span className="text-[#59dfd6]">F</span>
               </div>
               {/* Middle */}
               <nav className="text-[#c9d7d7] text-md font-medium">
                  <ul className="text-[#40454f] flex gap-x-6 font-semibold">
                     <li>
                        <NavLink
                           to="/"
                           className={({ isActive }) =>
                              isActive
                                 ? 'text-[#c9d7d7] '
                                 : 'hover:text-[#c9d7d7] '
                           }
                        >
                           Home
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="/manga"
                           className={({ isActive }) =>
                              isActive
                                 ? 'text-[#c9d7d7] font-bold'
                                 : 'hover:text-[#c9d7d7] '
                           }
                        >
                           Manga
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="/genre"
                           className={({ isActive }) =>
                              isActive
                                 ? 'text-[#c9d7d7] font-bold'
                                 : 'hover:text-[#c9d7d7] '
                           }
                        >
                           Genre
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="/schedule"
                           className={({ isActive }) =>
                              isActive
                                 ? 'text-[#c9d7d7] font-bold'
                                 : 'hover:text-[#c9d7d7] '
                           }
                        >
                           Schedule
                        </NavLink>
                     </li>
                  </ul>
               </nav>
               {/* Right */}
               <div>
                  {/* will show a modal at hover */}
                  <button>
                     <Icon
                        icon="game-icons:perspective-dice-six-faces-random"
                        color="white"
                        width="28"
                        height="28"
                     />
                  </button>
               </div>
            </header>
         </div>
      </>
   );
};

export default Navigation;
