import React, { useEffect, useRef, useState } from 'react';
import { FilterModel } from '../interface/FilterModel';
import { Icon } from '@iconify/react/dist/iconify.js';

const FilterComponent = ({
   value,
   setValue,
   dropDown,
   setActiveDropDown,
   valueOptions,
   filterName,
}: FilterModel) => {
   const handleValueChange = (newValue: string) => {
      setValue(newValue);
      setActiveDropDown(!dropDown); // Toggle the genreActive value
   };
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
                  value.toString().toLowerCase() === 'any'
                     ? 'text-[#676c75]'
                     : 'text-[#4fbdb5]'
               }`}
            >
               {value}
            </div>
            <Icon
               icon="ic:baseline-keyboard-arrow-down"
               width="20"
               height="20"
            />
            {dropDown && (
               <div className="z-10 bg-[#14181d] absolute space-y-2 top-12 left-0 py-2 px-2 rounded-md w-full">
                  {valueOptions.map((item) => (
                     <div
                        key={item}
                        className="hover:bg-[#0d1116] hover:text-[#4fbdb5] cursor-pointer p-2 rounded-md"
                        onClick={() => handleValueChange(item)}
                     >
                        {item}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default FilterComponent;
