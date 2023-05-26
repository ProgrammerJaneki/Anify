import axios from 'axios';
import Home from './components/Home';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import SearchFilter from './components/SearchFilter';
import React, { Suspense, lazy, ChangeEvent, useEffect, useState } from 'react';
const PopularAnime = lazy(
   () => import('./components/anime-sections/PopularAnime')
);
const UpcomingAnime = lazy(
   () => import('./components/anime-sections/UpcomingAnime')
);
const TopAnime = lazy(() => import('./components/anime-sections/TopAnime'));
const FilteredAnime = lazy(
   () => import('./components/anime-sections/FilteredAnime')
);
const SearchTags = lazy(() => import('./components/SearchTags'));
// import SearchTags from
// './components/SearchTags';
import useDebounce from './components/utilities/useDebounce';
import useAnimeGenre from './services/useAnimeGenre';
import { FilterModel } from './interface/FilterModel';

function App() {
   // Filter datas
   const [filteredGenre, setFilteredGenre] = useState<FilterModel[]>([]); // stores the current filters for genre
   const [filteredYear, setFilteredYear] = useState<FilterModel[]>([]);
   const [filteredStatus, setFilteredStatus] = useState<FilterModel[]>([]);
   const [genreActive, setGenreActive] = useState<boolean>(false);
   const [yearActive, setYearActive] = useState<boolean>(false);
   const [statusActive, setStatusActive] = useState<boolean>(false);
   const [searchQuery, setSearchQuery] = useState<string>('');
   const debouncedSearchQuery = useDebounce(searchQuery, 500);
   const [filteredItems, setFilteredItems] = useState<FilterModel[]>([]); // stores the items to show as tags
   const handleRemoveFilter = (value: string) => {
      const updatedGenre = filteredGenre.filter((item) => item.name !== value);
      const updatedYear = filteredYear.filter((item) => item.name !== value);
      const updatedStatus = filteredStatus.filter(
         (item) => item.name !== value
      );
      setFilteredGenre(updatedGenre);
      setFilteredYear(updatedYear);
      setFilteredStatus(updatedStatus);
      // setFilteredGenre([]);
   };
   const handleClearFilteredItems = (filterName: string) => {
      if (filterName.toLowerCase() === 'genre') {
         setFilteredGenre([]);
      } else if (filterName.toLowerCase() === 'year') {
         setFilteredYear([]);
      } else if (filterName.toLowerCase() === 'status') {
         setFilteredStatus([]);
      } else {
         setSearchQuery('');
         setSearchQuery('');
         setFilteredGenre([]);
         setFilteredYear([]);
         setFilteredStatus([]);
      }
      // setFilteredItems([]);
      // setSearchQuery('');
      // setFilteredGenre([]);
      // setFilteredYear([]);
      // setFilteredStatus([]);
   };
   // handlers
   const handleSetSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
   };
   const totalFilterLength =
      filteredGenre.length + filteredYear.length + filteredStatus.length;
   const handleCheckArray = () => {
      console.log('hey');
      if (
         filteredGenre.length > 0 ||
         filteredYear.length > 0 ||
         filteredStatus.length > 0
      ) {
         return true;
      } else {
         return false;
      }
   };
   const handleFilteredAnimeProps = {
      debouncedSearchQuery,
      filteredGenre,
      filteredYear,
      filteredStatus,
      handleRemoveFilter,
   };
   const handleSearchFilterProps = {
      handleSetSearchQuery,
      searchQuery,
      setFilteredItems,
      filteredItems,
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
   };

   return (
      <>
         <div className="bg-[#0d1116] text-[#ffffff] grid place-items-center content-start min-h-screen">
            {/* <Navigation></Navigation> */}
            <Navigation />
            <div className="grid place-items-center px-4 w-full">
               <div className="space-y-8 py-8 max-w-4xl w-full">
                  <SearchFilter {...handleSearchFilterProps} />
                  {totalFilterLength > 0 && (
                     <Suspense fallback={<div>Loading...</div>}>
                        <SearchTags
                           filteredGenre={filteredGenre}
                           filteredYear={filteredYear}
                           filteredStatus={filteredStatus}
                           handleClearFilteredItems={handleClearFilteredItems}
                           handleRemoveFilter={handleRemoveFilter}
                           handleSetSearchQuery={handleSetSearchQuery}
                           filteredItems={filteredItems}
                           setFilteredItems={setFilteredItems}
                           searchQuery={searchQuery}
                           setSearchQuery={setSearchQuery}
                           totalFilterLength={totalFilterLength}
                        />
                     </Suspense>
                  )}
                  <Routes>
                     <Route
                        path="/"
                        element={
                           totalFilterLength > 0 || debouncedSearchQuery ? (
                              <Suspense fallback={<div>Loading...</div>}>
                                 <FilteredAnime {...handleFilteredAnimeProps} />
                              </Suspense>
                           ) : (
                              <Suspense fallback={<div>Loading...</div>}>
                                 <Home />
                              </Suspense>
                           )
                        }
                     ></Route>
                     <Route
                        path="/anime/popular"
                        element={
                           totalFilterLength > 0 || debouncedSearchQuery ? (
                              <Suspense fallback={<div>Loading...</div>}>
                                 <FilteredAnime {...handleFilteredAnimeProps} />
                              </Suspense>
                           ) : (
                              <Suspense fallback={<div>Loading...</div>}>
                                 <PopularAnime />
                              </Suspense>
                           )
                        }
                     />
                     <Route
                        path="/anime/upcoming"
                        element={
                           <Suspense fallback={<div>Loading...</div>}>
                              <UpcomingAnime />
                           </Suspense>
                        }
                     />
                     <Route path="/anime/top" element={<TopAnime />} />
                  </Routes>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
