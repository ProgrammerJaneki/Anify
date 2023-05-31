import { ChangeEvent, createContext } from 'react';
import { FilterModel } from '../../interface/FilterModel';

export interface SearchFilterContextType {
   handleSetSearchQuery: (event: ChangeEvent<HTMLInputElement>) => void;
   handleRemoveFilter: (value: string) => void;
   handleClearFilteredItems: (filterName: string) => void;
   searchQuery: string;
   debouncedSearchQuery: any;
   filteredGenre: FilterModel[];
   filteredYear: FilterModel[];
   filteredStatus: FilterModel[];
   filteredSeason: FilterModel[];
   setFilteredSeason: React.Dispatch<React.SetStateAction<FilterModel[]>>;
   setFilteredYear: React.Dispatch<React.SetStateAction<FilterModel[]>>;
}

export const SearchFilterContext =
   createContext<SearchFilterContextType | null>(null);
