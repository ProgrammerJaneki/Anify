import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import FilterComponent from './FilterComponent';
import useAnimeGenre from '../../services/useAnimeGenre';
import useAnimeYear from '../../services/useAnimeYear';
import useAnimeStatus from '../../services/useAnimeStatus';
import { FilterModel } from '../../interface/FilterModel';
import useCheckReso from '../../utilities/useCheckReso';
import {
   SearchFilterContext,
   SearchFilterContextType,
} from '../../utilities/contexts/SearchFilterContext';
import {
   GlobalContext,
   GlobalContextType,
} from '../../utilities/contexts/GlobalContext';

interface SearchFillterModel {
   setFilteredGenre: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   setFilteredYear: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   setFilteredStatus: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   genreActive: boolean;
   yearActive: boolean;
   statusActive: boolean;
   setGenreActive: React.Dispatch<React.SetStateAction<boolean>>;
   setYearActive: React.Dispatch<React.SetStateAction<boolean>>;
   setStatusActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SearchBarModel {
   resolutionWidth: number;
   isFilterHidden: boolean;
   setIsFilterHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFilter = ({
   setFilteredGenre,
   setFilteredYear,
   setFilteredStatus,
   genreActive,
   yearActive,
   statusActive,
   setGenreActive,
   setYearActive,
   setStatusActive,
}: SearchFillterModel) => {
   const [isFilterHidden, setIsFilterHidden] = useState<boolean>(false);
   const { filteredGenre, filteredYear, filteredStatus } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;
   const { resolutionWidth } = useCheckReso();
   // grid-cols-3 sm:grid-cols-4 flex-wrap sm:flex-nowrap
   const list = ['New', 'Hot', 'Gaming', 'Coding', 'Vlogs', 'Sport', 'Gym'];
   return (
      <div className="md:flex grid-cols-1 md:gap-4 space-y-4 md:space-y-0 text-sm w-full ">
         <SearchBar
            resolutionWidth={resolutionWidth}
            isFilterHidden={isFilterHidden}
            setIsFilterHidden={setIsFilterHidden}
         />
         {resolutionWidth > 768 || isFilterHidden ? (
            <div className="flex flex-row justify-between gap-x-4 w-full overflow-x-auto sm:overflow-visible">
               <FilterComponent
                  filterName="Genre"
                  filterValue={filteredGenre}
                  setFilterValue={setFilteredGenre}
                  dropDown={genreActive}
                  setActiveDropDown={setGenreActive}
                  valueOptions={useAnimeGenre}
               />
               <FilterComponent
                  filterName="Year"
                  filterValue={filteredYear}
                  setFilterValue={setFilteredYear}
                  dropDown={yearActive}
                  setActiveDropDown={setYearActive}
                  valueOptions={useAnimeYear}
               />
               <FilterComponent
                  filterName="Status"
                  filterValue={filteredStatus}
                  setFilterValue={setFilteredStatus}
                  dropDown={statusActive}
                  setActiveDropDown={setStatusActive}
                  valueOptions={useAnimeStatus}
               />
            </div>
         ) : null}
      </div>
   );
};

const SearchBar = ({
   resolutionWidth,
   setIsFilterHidden,
   isFilterHidden,
}: SearchBarModel) => {
   const { handleSetSearchQuery, handleRemoveFilter, searchQuery } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;
   const { iconSizes } = useContext(GlobalContext) as GlobalContextType;

   return (
      <div className="flex md:flex-col items-center text-[#676c75] font-semibold gap-y-2 gap-x-4 w-full md:w-auto ">
         <div className="space-y-0 md:space-y-2 w-full ">
            <h1 className="hidden md:block text-[#fff]">Search</h1>
            <div className="flex justify-between bg-[#14181d] py-3 md:py-2 px-4 gap-x-4 rounded-md w-full">
               <div className="flex items-center text-sm gap-x-4 md:gap-x-2 w-full">
                  <Icon
                     className=""
                     icon="charm:search"
                     width={iconSizes.searchIcon}
                     height={iconSizes.searchIcon}
                  />
                  <input
                     className="bg-transparent placeholder-[#676c75] focus:outline-none w-full"
                     type="text"
                     placeholder={resolutionWidth < 768 ? 'Search' : ''}
                     onChange={handleSetSearchQuery}
                     value={searchQuery}
                  />
               </div>
               {searchQuery && (
                  <button
                     onClick={() => {
                        handleRemoveFilter('Search');
                     }}
                  >
                     <Icon
                        icon="ep:close-bold"
                        width={iconSizes.closeIcon}
                        height={iconSizes.closeIcon}
                     />
                  </button>
               )}
            </div>
         </div>
         {resolutionWidth < 768 && (
            <button
               className="bg-[#14181d] rounded-md p-3"
               onClick={() => setIsFilterHidden(!isFilterHidden)}
            >
               <Icon icon="mi:filter" width="20" height="20" />
            </button>
         )}
      </div>
   );
};

export default SearchFilter;
