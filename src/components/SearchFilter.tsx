import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import FilterComponent from './FilterComponent';

interface SearchFillterModel {
   filteredGenre: string;
   filteredYear: string;
   filteredStatus: string;
   setFilteredGenre: React.Dispatch<React.SetStateAction<string>>;
   setFilteredYear: React.Dispatch<React.SetStateAction<string>>;
   setFilteredStatus: React.Dispatch<React.SetStateAction<string>>;
   genreActive: boolean;
   yearActive: boolean;
   statusActive: boolean;
   setGenreActive: React.Dispatch<React.SetStateAction<boolean>>;
   setYearActive: React.Dispatch<React.SetStateAction<boolean>>;
   setStatusActive: React.Dispatch<React.SetStateAction<boolean>>;
   genreOptions: string[];
   yearOptions: string[];
   statusOptions: string[];
}

const SearchFilter = ({
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
   genreOptions,
   yearOptions,
   statusOptions,
}: SearchFillterModel) => {
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
               />
            </div>
         </div>
         <FilterComponent
            filterName="Genre"
            value={filteredGenre}
            setValue={setFilteredGenre}
            dropDown={genreActive}
            setActiveDropDown={setGenreActive}
            valueOptions={genreOptions}
         />
         <FilterComponent
            filterName="Year"
            value={filteredYear}
            setValue={setFilteredYear}
            dropDown={yearActive}
            setActiveDropDown={setYearActive}
            valueOptions={yearOptions}
         />
         <FilterComponent
            filterName="Status"
            value={filteredStatus}
            setValue={setFilteredStatus}
            dropDown={statusActive}
            setActiveDropDown={setStatusActive}
            valueOptions={statusOptions}
         />
      </div>
   );
};

export default SearchFilter;
