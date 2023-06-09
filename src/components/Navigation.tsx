import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import useCheckReso from '../utilities/useCheckReso';
import {
   autoUpdate,
   flip,
   offset,
   shift,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useRole,
} from '@floating-ui/react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface NavigationProps {
   handleClearFilteredItems: (filterName: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
   handleClearFilteredItems,
}) => {
   const [scrollPosition, setScrollPosition] = useState(0);
   const [scrollLatest, setScrollLatest] = useState(true);
   const { scrollY } = useScroll();
   const location = useLocation();
   const isIndividualRoute = /^\/anime\/\d+\/.*$/;
   const isNavBarTransparent = isIndividualRoute.test(location.pathname);

   useMotionValueEvent(scrollY, 'change', (latest) => {
      setScrollPosition(latest);
      if (scrollPosition > latest) {
         setScrollLatest(true);
      } else setScrollLatest(false);
   });
   const { resolutionWidth } = useCheckReso();
   return (
      <>
         <motion.div
            initial="visible"
            animate={scrollLatest ? 'visible' : 'hidden'}
            variants={navbarVariants}
            className={` 
            ${isNavBarTransparent ? 'fixed ' : 'sticky'}
            ${
               scrollLatest && scrollPosition < 100 && isNavBarTransparent
                  ? 'bg-opacity-40 '
                  : 'transition-all duration-300 ease-linear '
            }
            bg-[#14181d] top-0 left-0 z-20 grid place-items-center py-4 px-4 w-full`}
         >
            <header className="flex justify-between items-center w-full max-w-4xl">
               {/* Left */}
               <NavLink
                  to="/"
                  className="text-[#fff] font-extrabold text-3xl sm:text-4xl"
                  onClick={() => handleClearFilteredItems('')}
               >
                  A<span className="text-[#59dfd6]">F</span>
               </NavLink>
               {resolutionWidth < 640 ? (
                  // <button className="" onClick={handleMenuOpen}>
                  //    <Icon icon="ion:menu" width="30" height="30" />
                  // </button>
                  <MenuBar
                     handleClearFilteredItems={handleClearFilteredItems}
                  />
               ) : (
                  <>
                     <nav className="flex text-[#9FADBD] text-md font-medium ">
                        <div
                           className={`${
                              isNavBarTransparent
                                 ? scrollLatest && scrollPosition < 100
                                    ? 'text-[#cecece]'
                                    : 'text-[#676C75]'
                                 : 'text-[#40454f]'
                           }  font-semibold `}
                        >
                           <LinkLists
                              handleClearFilteredItems={
                                 handleClearFilteredItems
                              }
                           />
                        </div>
                     </nav>
                     <div>
                        <button className="hidden sm:block">
                           <Icon
                              icon="game-icons:perspective-dice-six-faces-random"
                              color="white"
                              width="28"
                              height="28"
                           />
                        </button>
                     </div>
                  </>
               )}
            </header>
         </motion.div>
      </>
   );
};

const MenuBar: React.FC<NavigationProps> = ({ handleClearFilteredItems }) => {
   const [menuOpen, setMenuOpen] = useState<boolean>(false);
   const { refs, floatingStyles, context } = useFloating({
      open: menuOpen,
      onOpenChange: setMenuOpen,
      placement: 'bottom',
      middleware: [offset(10), flip({}), shift()],
      whileElementsMounted: autoUpdate,
   });
   const click = useClick(context);
   const dismiss = useDismiss(context);
   const role = useRole(context);

   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      role,
   ]);

   return (
      <button
         className="relative "
         ref={refs.setReference}
         {...getReferenceProps()}
         onClick={() => setMenuOpen(!menuOpen)}
      >
         <Icon icon="ion:menu" width="30" height="30" />

         {menuOpen && (
            <div
               className="absolute bg-[#181c22] text-md text-left shadow-md rounded-md text-[#40454f] px-4 py-5 w-[150px]"
               ref={refs.setFloating}
               style={floatingStyles}
               {...getFloatingProps()}
            >
               <ul className="grid grid-cols-1 text-[#40454f] gap-y-4 font-semibold">
                  <LinkLists
                     handleClearFilteredItems={handleClearFilteredItems}
                  />
               </ul>
            </div>
         )}
      </button>
   );
};

const LinkLists: React.FC<NavigationProps> = ({ handleClearFilteredItems }) => {
   return (
      <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6">
         <li>
            <NavLink
               to="/"
               className={({ isActive }) =>
                  isActive ? 'text-[#9FADBD] ' : 'hover:text-[#9FADBD] '
               }
               onClick={() => handleClearFilteredItems('')}
            >
               Home
            </NavLink>
         </li>
         <li>
            <NavLink
               to="/manga"
               className={({ isActive }) =>
                  isActive
                     ? 'text-[#9FADBD] font-bold'
                     : 'hover:text-[#9FADBD] '
               }
               onClick={() => handleClearFilteredItems('')}
            >
               Manga
            </NavLink>
         </li>
         <li>
            <NavLink
               to="/characters"
               className={({ isActive }) =>
                  isActive
                     ? 'text-[#9FADBD] font-bold'
                     : 'hover:text-[#9FADBD] '
               }
               onClick={() => handleClearFilteredItems('')}
            >
               Characters
            </NavLink>
         </li>
         <li>
            <NavLink
               to="/schedule"
               className={({ isActive }) =>
                  isActive
                     ? 'text-[#9FADBD] font-bold'
                     : 'hover:text-[#9FADBD] '
               }
               onClick={() => handleClearFilteredItems('')}
            >
               Schedule
            </NavLink>
         </li>
      </ul>
   );
};

const navbarVariants = {
   hidden: {
      opacity: 0,
      y: '-100%',
      transition: {
         bounce: 0,
      },
   },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         bounce: 0,
      },
   },
};

export default Navigation;
