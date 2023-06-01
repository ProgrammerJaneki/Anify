import React, { MouseEvent, useContext, useEffect, useRef } from 'react';
import { FilterModel } from '../../interface/FilterModel';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
   SearchFilterContext,
   SearchFilterContextType,
} from '../../utilities/contexts/SearchFilterContext';
import {
   GlobalContext,
   GlobalContextType,
} from '../../utilities/contexts/GlobalContext';
import useCheckReso from '../../utilities/useCheckReso';

interface FilterComponentModel {
   filterValue: FilterModel[];
   setFilterValue: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   dropDown: boolean;
   setActiveDropDown: (dropDown: React.SetStateAction<boolean>) => void;
   valueOptions: FilterModel[];
   filterName: string;
}
interface FilterButtonModel {
   filterValue: FilterModel[];
}
interface FilterClearModel {
   filterValue: FilterModel[];
   filterName: string;
   setActiveDropDown: (dropDown: React.SetStateAction<boolean>) => void;
}

const FilterComponent = ({
   filterValue,
   setFilterValue,
   dropDown,
   setActiveDropDown,
   valueOptions,
   filterName,
}: FilterComponentModel) => {
   const { setFilteredSeason } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;
   const handleValueChange = (newValue: FilterModel) => {
      if (filterName.toLowerCase() === 'genre') {
         setFilteredSeason([]);
         setFilterValue([...filterValue, newValue]);
      } else if (filterName.toLowerCase() === 'year') {
         setFilterValue([newValue]);
      } else {
         setFilteredSeason([]);
         setFilterValue([newValue]);
      }
      setActiveDropDown(!dropDown);
   };
   const { resolutionWidth } = useCheckReso();
   const modalRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handler = (e: Event) => {
         if (dropDown && !modalRef.current?.contains(e.target as Node)) {
            setActiveDropDown(false);
         }
      };
      document.addEventListener('mousedown', handler);

      return () => {
         document.removeEventListener('mousedown', handler);
      };
   });
   return (
      <div className="flex flex-col font-semibold gap-y-2 w-full">
         <h1 className="">{filterName}</h1>
         <motion.div
            ref={modalRef}
            className="relative font-semibold flex justify-between items-center cursor-pointer gap-x-2 bg-[#14181d] text-[#676c75] py-2 px-4 rounded-md w-[170px] sm:w-full"
            onClick={() => {
               setActiveDropDown(!dropDown);
            }}
            animate={dropDown ? 'open' : 'close'}
         >
            <FilterButton filterValue={filterValue} />
            <AnimatePresence>
               {dropDown && (
                  <div
                     className={
                        resolutionWidth < 640
                           ? 'bg-transparent fixed flex justify-center pt-48 inset-0 left-0 right-0 z-50 w-full'
                           : ''
                     }
                  >
                     <motion.ul
                        className={`${
                           filterName.toLowerCase() === 'status'
                              ? 'max-h-[180px] h-[180px] sm:h-auto'
                              : ''
                        } 
                        z-10 bg-[#14181d] origin-top sm:absolute left-0 sm:top-12 space-y-2  px-1 sm:px-2 py-2 scrollbar-thin scrollbar-thumb-[#A8A8A8] scrollbar-thumb-rounded-lg overflow-y-scroll overflow-x-hidden rounded-md w-[80%] sm:w-full  max-h-[500px]  
                        `}
                        initial="close"
                        animate="open"
                        exit="close"
                        variants={dropDownVariants}
                     >
                        <motion.div className="" variants={childrenVariants}>
                           {valueOptions.map((item) => (
                              <li key={item.name}>
                                 <button
                                    className={`${
                                       filterValue.includes(item)
                                          ? 'text-[#4fbdb5]'
                                          : 'hover:bg-[#0d1116] hover:text-[#4fbdb5]'
                                    } capitalize cursor-pointer px-2 py-4 sm:py-2 rounded-md w-full text-left `}
                                    onClick={() => handleValueChange(item)}
                                    disabled={filterValue.includes(item)}
                                 >
                                    {item.name}
                                 </button>
                              </li>
                           ))}
                        </motion.div>
                     </motion.ul>
                  </div>
               )}
            </AnimatePresence>
            <FilterClearButton
               filterValue={filterValue}
               filterName={filterName}
               setActiveDropDown={setActiveDropDown}
            />
         </motion.div>
      </div>
   );
};

const FilterButton = ({ filterValue }: FilterButtonModel) => {
   return (
      <button
         className={`${
            filterValue.length > 0
               ? 'text-[#4fbdb5] flex items-center gap-x-2'
               : 'text-[#676c75] '
         } capitalize py-1 sm:py-0 text-ellipsis whitespace-nowrap`}
      >
         {filterValue.length > 0 ? filterValue[0].name : 'any'}
         {filterValue.length > 1 && (
            <div className=" text-[#4fbdb5] inline-flex items-center text-xs rounded-sm">
               <Icon icon="jam:plus" width="12" height="12" />
               <span>{filterValue.length - 1}</span>
            </div>
         )}
      </button>
   );
};

const FilterClearButton = ({
   filterValue,
   filterName,
   setActiveDropDown,
}: FilterClearModel) => {
   const { handleClearFilteredItems } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;
   const { iconSizes } = useContext(GlobalContext) as GlobalContextType;
   const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
      handleClearFilteredItems(filterName);
      e.stopPropagation();
      setActiveDropDown(false);
   };
   return filterValue.length > 0 ? (
      <button className="block hover:text-[#dedede] " onClick={handleClose}>
         <Icon
            icon="ep:close-bold"
            width={iconSizes.closeIcon}
            height={iconSizes.closeIcon}
         />
      </button>
   ) : (
      <motion.span variants={iconVariants} transition={{ duration: 0.2 }}>
         <Icon icon="ic:baseline-keyboard-arrow-down" width="20" height="20" />
      </motion.span>
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
      transition: {
         type: 'spring',
         bounce: 0,
         duration: 0.5,
         delayChildren: 0.01,
         staggerChildren: 0.05,
      },
   },
   close: {
      scaleY: 0,
      transition: {
         type: 'spring',
         bounce: 0,
         duration: 0.3,
      },
   },
};

const iconVariants = {
   open: { rotate: 180 },
   close: { rotate: 0 },
};

export default FilterComponent;
