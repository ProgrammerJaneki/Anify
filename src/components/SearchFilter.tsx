import React, { ChangeEvent } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import FilterComponent from './FilterComponent';
import useAnimeGenre from '../services/useAnimeGenre';
import useAnimeYear from '../services/useAnimeYear';
import useAnimeStatus from '../services/useAnimeStatus';
import { FilterModel } from '../interface/FilterModel';

interface SearchFillterModel {
   filteredItems: FilterModel[];
   setFilteredItems: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   handleSetSearchQuery: (event: ChangeEvent<HTMLInputElement>) => void;
   searchQuery: string;
   filteredGenre: FilterModel[];
   filteredYear: FilterModel[];
   filteredStatus: FilterModel[];
   setFilteredGenre: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   setFilteredYear: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   setFilteredStatus: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   genreActive: boolean;
   yearActive: boolean;
   statusActive: boolean;
   setGenreActive: React.Dispatch<React.SetStateAction<boolean>>;
   setYearActive: React.Dispatch<React.SetStateAction<boolean>>;
   setStatusActive: React.Dispatch<React.SetStateAction<boolean>>;
   handleRemoveFilter: (value: string) => void;
   handleClearFilteredItems: (filterName: string) => void;
}

const SearchFilter = ({
   filteredItems,
   setFilteredItems,
   handleSetSearchQuery,
   searchQuery,
   filteredGenre,
   filteredYear,
   filteredStatus,
   setFilteredGenre,
   setFilteredYear,
   setFilteredStatus,
   genreActive,
   yearActive,
   statusActive,
   setGenreActive,
   setYearActive,
   setStatusActive,
   handleRemoveFilter,
   handleClearFilteredItems,
}: SearchFillterModel) => {
   const handleClearGenre = () => {
      handleClearFilteredItems('genre');
   };
   const handleClearYear = () => {
      handleClearFilteredItems('year');
   };
   const handleClearStatus = () => {
      handleClearFilteredItems('status');
   };
   return (
      <div className="flex items-center gap-x-4 text-sm ">
         {/* Search */}
         <div className="flex flex-col text-[#676c75] font-semibold gap-y-2 w-full">
            <h1 className="text-[#c9d7d7]">Search</h1>
            <div className="flex items-center gap-x-2 bg-[#14181d]  py-2 px-4 rounded-md w-full">
               <Icon icon="iconamoon:search" width="20" height="20" />
               <input
                  className="bg-transparent focus:outline-none w-full"
                  type="text"
                  placeholder=""
                  onChange={handleSetSearchQuery}
                  value={searchQuery}
               />
            </div>
         </div>
         <FilterComponent
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems}
            filterName="Genre"
            filterValue={filteredGenre}
            setFilterValue={setFilteredGenre}
            dropDown={genreActive}
            setActiveDropDown={setGenreActive}
            valueOptions={useAnimeGenre}
            handleRemoveFilter={handleRemoveFilter}
            handleClearFilteredItems={handleClearGenre}
         />
         <FilterComponent
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems}
            filterName="Year"
            filterValue={filteredYear}
            setFilterValue={setFilteredYear}
            dropDown={yearActive}
            setActiveDropDown={setYearActive}
            valueOptions={useAnimeYear}
            handleRemoveFilter={handleRemoveFilter}
            handleClearFilteredItems={handleClearYear}
         />
         <FilterComponent
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems}
            filterName="Status"
            filterValue={filteredStatus}
            setFilterValue={setFilteredStatus}
            dropDown={statusActive}
            setActiveDropDown={setStatusActive}
            valueOptions={useAnimeStatus}
            handleRemoveFilter={handleRemoveFilter}
            handleClearFilteredItems={handleClearStatus}
         />
      </div>
   );
};

export default SearchFilter;
