import React, { ChangeEvent } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { FilterModel } from '../interface/FilterModel';

interface SearchTagsModel {
   filteredGenre: FilterModel[];
   filteredYear: FilterModel[];
   filteredStatus: FilterModel[];
   handleSetSearchQuery: (event: ChangeEvent<HTMLInputElement>) => void;
   searchQuery: string;
   setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
   filteredItems: FilterModel[];
   setFilteredItems: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   handleClearFilteredItems: (filterName: string) => void;
   handleRemoveFilter: (value: string) => void;
   totalFilterLength: number;
}

// we'll have each item.
// Search, genre (mappable), year, & status

const SearchTags = ({
   filteredGenre,
   filteredYear,
   filteredStatus,
   filteredItems,
   setFilteredItems,
   searchQuery,
   setSearchQuery,
   handleClearFilteredItems,
   handleRemoveFilter,
   totalFilterLength,
}: SearchTagsModel) => {
   // const handleClearFilteredItems = () => {
   //    setFilteredItems([]);
   // };
   const handleRemove = (value: string) => {
      console.log('value: ', value);
      const updatedFilteredItems = filteredItems.filter(
         (item) => item.name !== value
      );
      // const updatedValue = value.filter((item) => item !== value)
      setFilteredItems(updatedFilteredItems);
      // setValue('');
   };
   return (
      <div className="group flex flex-wrap items-center gap-x-2 py-2 text-xs w-full">
         <Icon
            className="text-[#676c75]"
            icon="mingcute:tag-2-fill"
            width="20"
            height="20"
         />
         {searchQuery && (
            <div className="bg-[#4fbdb5] flex items-center gap-x-2 py-1 px-2 rounded-lg capitalize">
               <span>Search: {searchQuery}</span>
               <button className="block transition-none duration-500 ease-linear">
                  <Icon icon="ep:close-bold" width="12" height="12" />
               </button>
            </div>
         )}
         {filteredGenre.map((item) => (
            <div
               key={item.name}
               className="bg-[#4fbdb5] flex items-center gap-x-2 py-1 px-2 rounded-lg"
            >
               <span>{item.name}</span>
               <button
                  className="block transition-none duration-500 ease-linear"
                  onClick={() => {
                     handleRemoveFilter(item.name);
                  }}
               >
                  <Icon icon="ep:close-bold" width="12" height="12" />
               </button>
            </div>
         ))}
         {filteredYear.map((item) => (
            <div
               key={item.name}
               className="bg-[#4fbdb5] flex items-center gap-x-2 py-1 px-2 rounded-lg"
            >
               <span>{item.name}</span>
               <button
                  className="block transition-none duration-500 ease-linear"
                  onClick={() => {
                     handleRemoveFilter(item.name);
                  }}
               >
                  <Icon icon="ep:close-bold" width="12" height="12" />
               </button>
            </div>
         ))}
         {filteredStatus.map((item) => (
            <div
               key={item.name}
               className="bg-[#4fbdb5] flex items-center gap-x-2 py-1 px-2 rounded-lg"
            >
               <span>{item.name}</span>
               <button
                  className="block transition-none duration-500 ease-linear"
                  onClick={() => {
                     handleRemoveFilter(item.name);
                  }}
               >
                  <Icon icon="ep:close-bold" width="12" height="12" />
               </button>
            </div>
         ))}
         {totalFilterLength > 1 && (
            <div className="group-hover:flex hidden items-center gap-x-2 font-bold bg-[#676c75] text-[#dedede] py-1 px-2 rounded-lg transition-all duration-150 ease-linear">
               <span>Clear</span>
               <button
                  onClick={() => {
                     handleClearFilteredItems('tag');
                  }}
               >
                  <Icon icon="ep:close-bold" width="12" height="12" />
               </button>
            </div>
         )}
      </div>
   );
};

export default SearchTags;
