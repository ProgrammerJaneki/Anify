import React from 'react';
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
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion, AnimatePresence } from 'framer-motion';

interface DropDownModel {
   selectedLanguage: string;
   showDropDown: boolean;
   languageList: string[];
   toggleDropDown: () => void;
   handleLanguageSelect: (language: string) => void;
}

const DropDown: React.FC<DropDownModel> = ({
   selectedLanguage,
   showDropDown,
   languageList,
   toggleDropDown,
   handleLanguageSelect,
}) => {
   const { refs, floatingStyles, context } = useFloating({
      open: showDropDown,
      onOpenChange: toggleDropDown,
      placement: 'bottom',
      middleware: [offset(8), ],
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
   // what we need? 1. dataList, activeData, setter

   return (
      <motion.button
         className="bg-[#14181d] text-[#676C75] text-sm font-semibold py-2 px-4 ml-auto rounded-md min-w-[150px] z-50"
         animate={showDropDown ? 'open' : 'close'}
         ref={refs.setReference}
         {...getReferenceProps()}
      >
         {/* Active Data */}
         <div className="flex items-center justify-between gap-x-2">
            <h1 className="capitalize">{selectedLanguage}</h1>
            <motion.span variants={iconVariants} transition={{ duration: 0.2 }}>
               <Icon
                  icon="ic:baseline-keyboard-arrow-down"
                  width="20"
                  height="20"
               />
            </motion.span>
         </div>
         {/* Drop down */}
         <AnimatePresence>
            {showDropDown && (
               <motion.div
                  animate="open"
                  initial="close"
                  exit="close"
                  variants={dropDownVariants}
                  className="relative"
               >
                  <ul
                     className="bg-[#14181d] absolute flex flex-col p-2 gap-2 rounded-md z-20 shadow-lg"
                     ref={refs.setFloating}
                     style={floatingStyles}
                     {...getFloatingProps()}
                  >
                     {languageList.map((item) => (
                        <motion.li
                           key={item}
                           className={`${
                              item.toLowerCase() === selectedLanguage
                                 ? 'text-[#4fbdb5]'
                                 : ''
                           } hover:bg-[#0d1116] capitalize text-left py-2 px-2 z-50 rounded-sm w-[140px]`}
                           onClick={() => handleLanguageSelect(item)}
                           variants={childrenVariants}
                        >
                           {item}
                        </motion.li>
                     ))}
                  </ul>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.button>
   );
};

const childrenVariants = {
   open: {
      opacity: 1,
      transition: {
         stiffness: 1000,
         velocity: 1000,
      },
   },
   close: {
      opacity: 0,
      transition: {
         stiffness: 1000,
         duration: 0.1,
      },
   },
};
const dropDownVariants = {
   open: {
      scaleY: 1,
      opacity: 1,
      transition: {
         type: 'spring',
         bounce: 0,
         duration: 0.3,
         delayChildren: 0.01,
         staggerChildren: 0.05,
      },
   },
   close: {
      scaleY: 0.5,
      opacity: 0,
      transition: {
         type: 'spring',
         bounce: 0,
         duration: 0.3,
         delayChildren: 0.02,
         staggerChildren: 0.02,
      },
   },
};

const iconVariants = {
   open: { rotate: 180 },
   close: { rotate: 0 },
};

export default DropDown;
