import { useContext, useId, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { FilterModel } from '../../interface/FilterModel';
import useAnimeSeason from '../../services/useAnimeSeason';
import {
   SearchFilterContext,
   SearchFilterContextType,
} from '../../utilities/contexts/SearchFilterContext';
import {
   GlobalContext,
   GlobalContextType,
} from '../../utilities/contexts/GlobalContext';
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

interface SearchTagsModel {
   totalFilterLength: number;
}

interface FilterItemModel {
   filterItem: FilterModel[];
   handleFilter: (value: string) => void;
}

const SearchTags = ({ totalFilterLength }: SearchTagsModel) => {
   const {
      handleRemoveFilter,
      filteredGenre,
      filteredYear,
      filteredStatus,
      filteredSeason,
   } = useContext(SearchFilterContext) as SearchFilterContextType;
   return (
      <div className=" flex gap-x-8 items-start justify-between mt-6">
         <div className="group flex flex-wrap items-center gap-x-2 gap-y-4 text-xs w-full">
            <Icon
               className="text-[#676c75]"
               icon="mingcute:tag-2-fill"
               width="20"
               height="20"
            />
            <SearchQueryWrapper />
            <FilterWrapper
               filterItem={filteredGenre}
               handleFilter={handleRemoveFilter}
            />
            <FilterWrapper
               filterItem={filteredYear}
               handleFilter={handleRemoveFilter}
            />
            <FilterWrapper
               filterItem={filteredStatus}
               handleFilter={handleRemoveFilter}
            />
            <FilterWrapper
               filterItem={filteredSeason}
               handleFilter={handleRemoveFilter}
            />
            <ClearAllFilterButton totalFilterLength={totalFilterLength} />
         </div>
         <SeasonFilter />
      </div>
   );
};
const FilterWrapper = ({ filterItem, handleFilter }: FilterItemModel) => {
   return (
      <>
         {filterItem.map((item) => (
            <div
               key={item.name}
               className="bg-[#4fbdb5] flex items-center gap-x-2 py-1 px-2 rounded-lg"
            >
               <span>{item.name}</span>
               <button
                  className="block transition-none duration-500 ease-linear"
                  onClick={() => {
                     handleFilter(item.name);
                  }}
               >
                  <Icon icon="ep:close-bold" width="12" height="12" />
               </button>
            </div>
         ))}
      </>
   );
};

const SearchQueryWrapper = () => {
   const { handleRemoveFilter, searchQuery } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;
   return (
      <>
         {searchQuery && (
            <div className="bg-[#4fbdb5] flex items-center gap-x-2 py-1 px-2 rounded-lg capitalize">
               <span>Search: {searchQuery}</span>
               <button
                  className="block transition-none duration-500 ease-linear"
                  onClick={() => {
                     handleRemoveFilter('Search');
                  }}
               >
                  <Icon icon="ep:close-bold" width="12" height="12" />
               </button>
            </div>
         )}
      </>
   );
};

const ClearAllFilterButton = ({ totalFilterLength }: SearchTagsModel) => {
   const { handleClearFilteredItems, filteredSeason } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;
   return (
      <>
         {(totalFilterLength > 1 || filteredSeason.length !== 0) && (
            <div className="group-hover:flex flex sm:hidden items-center gap-x-2 font-bold bg-[#676c75] text-[#dedede] py-1 px-2 rounded-lg transition-all duration-150 ease-linear">
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
      </>
   );
};

const SeasonFilter = () => {
   const { iconSizes } = useContext(GlobalContext) as GlobalContextType;
   const { filteredSeason, setFilteredSeason, filteredYear, setFilteredYear } =
      useContext(SearchFilterContext) as SearchFilterContextType;
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { handleClearFilteredItems } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;
   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom',
      middleware: [offset(2), flip({}), shift()],
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

   const handleSetFilteredSeason = (item: FilterModel) => {
      const itemName = { id: '1', name: '2023' };
      handleClearFilteredItems('season');
      if (filteredYear.length === 0) {
         setFilteredYear([itemName]);
         setFilteredSeason([item]);
      } else setFilteredSeason([item]);
   };
   return (
      <>
         <button
            className="relative font-semibold text-sm px-3 py-1 text-[#676c75] "
            ref={refs.setReference}
            {...getReferenceProps()}
            onClick={() => {
               setIsOpen(!isOpen);
            }}
         >
            <div className="flex items-center gap-x-2">
               <span className="capitalize ">
                  {filteredSeason[0]?.name || 'Season'}
               </span>
               <span className="">
                  <Icon
                     icon="fa6-solid:sort"
                     width={iconSizes.sortIcon}
                     height={iconSizes.sortIcon}
                  />
               </span>
            </div>

            {isOpen && (
               <div
                  className="bg-[#14181d] absolute text-left z-20 rounded-md space-y-1 px-3 sm:px-2 py-4 w-[120px] "
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
               >
                  {useAnimeSeason.map((item) => {
                     return (
                        <div
                           key={item.name}
                           className={`${
                              item.name === filteredSeason[0]?.name
                                 ? 'text-[#4fbdb5]'
                                 : 'hover:bg-[#0d1116] hover:text-[#4fbdb5]'
                           } p-2 rounded-md capitalize`}
                           onClick={() => handleSetFilteredSeason(item)}
                        >
                           {item.name}
                        </div>
                     );
                  })}
               </div>
            )}
         </button>
      </>
   );
};

export default SearchTags;
