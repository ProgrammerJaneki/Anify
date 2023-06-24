import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, ChangeEvent, useState } from 'react';
import useDebounce from './utilities/useDebounce';
import { FilterModel } from './interface/anime/FilterModel';
import 'react-loading-skeleton/dist/skeleton.css';
import useCheckReso from './utilities/useCheckReso';
// Contexts
import { SearchFilterContext } from './utilities/contexts/SearchFilterContext';
import { GlobalContext } from './utilities/contexts/GlobalContext';
import MangaSection from './pages/manga/MangaSection';
// import AnimeSection from './pages/anime/AnimeSection';
// Lazy Imports
const AnimeSection = lazy(() => import('./pages/anime/AnimeSection'));

const App = () => {
   // States
   const [filteredGenre, setFilteredGenre] = useState<FilterModel[]>([]); // stores the current filters for genre
   const [filteredYear, setFilteredYear] = useState<FilterModel[]>([]);
   const [filteredStatus, setFilteredStatus] = useState<FilterModel[]>([]);
   const [filteredSeason, setFilteredSeason] = useState<FilterModel[]>([]);
   const [searchQuery, setSearchQuery] = useState<string>('');

   // Array | Objects | Hooks
   const debouncedSearchQuery = useDebounce(searchQuery, 500);
   const { resolutionWidth } = useCheckReso();
   const iconSizes = {
      searchIcon: resolutionWidth < 640 ? '18' : '20',
      closeIcon: resolutionWidth < 640 ? '14' : '18',
      sortIcon: resolutionWidth < 640 ? '12' : '14',
   };

   // Handlers
   const handleRemoveFilter = (value: string) => {
      const updatedGenre = filteredGenre.filter((item) => item.name !== value);
      const updatedYear = filteredYear.filter((item) => item.name !== value);
      const updatedStatus = filteredStatus.filter(
         (item) => item.name !== value
      );
      setFilteredGenre(updatedGenre);
      setFilteredYear(updatedYear);
      setFilteredStatus(updatedStatus);
      if (value.toLowerCase() === 'search') {
         setSearchQuery('');
      } else {
         setFilteredSeason([]);
         setFilteredYear([]);
      }
   };
   // for filter component
   const handleClearFilteredItems = (filterName: string) => {
      const filteredNameLowerCase = filterName.toLowerCase();
      switch (filteredNameLowerCase) {
         case 'genre':
            setFilteredGenre([]);
            break;
         case 'year':
            setFilteredYear([]);
            setFilteredSeason([]);
            break;
         case 'status':
            setFilteredStatus([]);
            break;
         case 'season':
            setSearchQuery('');
            setFilteredGenre([]);
            setFilteredStatus([]);
            break;
         default:
            setSearchQuery('');
            setFilteredGenre([]);
            setFilteredYear([]);
            setFilteredStatus([]);
            setFilteredSeason([]);
      }
   };
   const handleSetSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
   };

   return (
      <>
         <GlobalContext.Provider value={{ iconSizes }}>
            <div className="bg-[#0d1116] text-[#676C75] grid place-items-center content-start min-h-screen">
               <Navigation
                  handleClearFilteredItems={handleClearFilteredItems}
               />
               {/* ANime Section */}
               <SearchFilterContext.Provider
                  value={{
                     handleSetSearchQuery,
                     handleRemoveFilter,
                     handleClearFilteredItems,
                     searchQuery,
                     debouncedSearchQuery,
                     filteredGenre,
                     filteredYear,
                     filteredStatus,
                     filteredSeason,
                     setFilteredSeason,
                     setFilteredYear,
                     setFilteredGenre,
                     setFilteredStatus,
                  }}
               >
                  <div className="w-full ">
                     {/* <Home /> */}
                     <Routes>
                        <Route
                           path="/*"
                           element={
                              <Suspense fallback={<div></div>}>
                                 <AnimeSection />
                              </Suspense>
                           }
                        />
                        <Route path="/manga" element={<MangaSection />} />
                     </Routes>
                     {/* <Home/> */}
                  </div>
               </SearchFilterContext.Provider>
               {/* </div> */}
            </div>
         </GlobalContext.Provider>
      </>
   );
};

export default App;
