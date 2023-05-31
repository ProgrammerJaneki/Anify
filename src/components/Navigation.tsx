import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useCheckReso from '../utilities/useCheckReso';
import {
   SearchFilterContext,
   SearchFilterContextType,
} from '../utilities/contexts/SearchFilterContext';
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

const Navigation = () => {
   const [scrollPosition, setScrollPosition] = useState(0);
   const [scrollLatest, setScrollLatest] = useState(true);
   const { scrollY } = useScroll();
   const { handleClearFilteredItems } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;

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
            className="bg-[#14181d] opacity-10 sticky top-0 left-0 z-20 grid place-items-center py-4 px-4 w-full"
         >
            <header className=" flex justify-between items-center w-full max-w-4xl">
               {/* Left */}
               <NavLink
                  to="/"
                  className="font-extrabold text-3xl sm:text-4xl"
                  onClick={() => handleClearFilteredItems('')}
               >
                  A<span className="text-[#59dfd6]">F</span>
               </NavLink>
               {resolutionWidth < 640 ? (
                  <MenuBar />
               ) : (
                  <>
                     <nav className="hidden sm:flex text-[#c9d7d7] text-md font-medium ">
                        <ul className="text-[#40454f] flex gap-x-6 font-semibold">
                           <LinkLists />
                        </ul>
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

const MenuBar = () => {
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
      <>
         <button
            className="relative"
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
                     <LinkLists />
                  </ul>
               </div>
            )}
         </button>
      </>
   );
};

const LinkLists = () => {
   const { handleClearFilteredItems } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;
   return (
      <>
         <li>
            <NavLink
               to="/"
               className={({ isActive }) =>
                  isActive ? 'text-[#c9d7d7] ' : 'hover:text-[#c9d7d7] '
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
                     ? 'text-[#c9d7d7] font-bold'
                     : 'hover:text-[#c9d7d7] '
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
                     ? 'text-[#c9d7d7] font-bold'
                     : 'hover:text-[#c9d7d7] '
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
                     ? 'text-[#c9d7d7] font-bold'
                     : 'hover:text-[#c9d7d7] '
               }
               onClick={() => handleClearFilteredItems('')}
            >
               Schedule
            </NavLink>
         </li>
      </>
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
