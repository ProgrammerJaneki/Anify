import React, { useEffect, useRef, useState } from 'react';
import { FilterModel } from '../interface/FilterModel';
import { Icon } from '@iconify/react/dist/iconify.js';

interface FilterComponentModel {
   filterValue: FilterModel[]; // FilteredIGenre/Year/Status that will store them in order to pass to the baseUrl for fetching
   setFilterValue: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   dropDown: boolean;
   setActiveDropDown: (dropDown: React.SetStateAction<boolean>) => void;
   valueOptions: FilterModel[];
   filterName: string;
   filteredItems: FilterModel[];
   setFilteredItems: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   handleRemoveFilter: (value: string) => void;
   handleClearFilteredItems: () => void;
}

const FilterComponent = ({
   filterValue,
   setFilterValue,
   dropDown,
   setActiveDropDown,
   valueOptions,
   filterName,
   filteredItems,
   setFilteredItems,
   handleRemoveFilter,
   handleClearFilteredItems,
}: FilterComponentModel) => {
   const handleValueChange = (newValue: FilterModel) => {
      // setFilterValue([newValue]);
      if (filterName.toLowerCase() !== 'genre') {
         setFilterValue([newValue]);
      } else {
         setFilterValue([...filterValue, newValue]);
      }
      setActiveDropDown(!dropDown); // Toggle the genreActive filterValue
   };

   // Ill add a isGenre prop to check if i need to display more than one filters
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
      <div
         ref={modalRef}
         className="flex flex-col font-semibold gap-y-2 w-full"
      >
         <h1 className="">{filterName}</h1>
         <div
            className="relative font-semibold flex justify-between items-center cursor-pointer gap-x-2 bg-[#14181d] text-[#676c75] py-2 px-4 rounded-md w-full"
            onClick={() => setActiveDropDown(!dropDown)}
         >
            <div
               className={`${
                  filterValue.length > 0
                     ? 'text-[#4fbdb5] text-xs flex items-center gap-x-2'
                     : 'text-[#676c75]'
               } capitalize`}
            >
               {filterValue.length > 0 ? filterValue[0].name : 'any'}
               {filterValue.length > 1 && (
                  <div className=" text-[#4fbdb5] inline-flex items-center text-xs rounded-sm">
                     <Icon icon="jam:plus" width="12" height="12" />
                     <span>{filterValue.length - 1}</span>
                  </div>
               )}
            </div>
            {filterValue.length > 0 ? (
               <button
                  className="block hover:text-[#dedede] transition-none duration-500 ease-linear"
                  onClick={handleClearFilteredItems}
               >
                  <Icon icon="ep:close-bold" width="16" height="16" />
               </button>
            ) : (
               <Icon
                  icon="ic:baseline-keyboard-arrow-down"
                  width="20"
                  height="20"
               />
            )}
            {dropDown && (
               <div className="z-10 bg-[#14181d] absolute space-y-2 top-12 left-0 py-2 px-2 rounded-md overflow-y-auto w-full max-h-[500px]">
                  {valueOptions.map((item) => (
                     <button
                        key={item.name}
                        className="hover:bg-[#0d1116] hover:text-[#4fbdb5] capitalize cursor-pointer p-2 rounded-md w-full text-left"
                        onClick={() => handleValueChange(item)}
                        disabled={filteredItems.includes(item)}
                     >
                        {item.name}
                     </button>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default FilterComponent;
