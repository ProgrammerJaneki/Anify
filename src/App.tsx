import Navigation from './components/Navigation';
import { Routes, Route, useLocation } from 'react-router-dom';
import SearchFilter from './components/home/SearchFilter';
import { Suspense, lazy, ChangeEvent, useState } from 'react';
import useDebounce from './utilities/useDebounce';
import { FilterModel } from './interface/FilterModel';
import 'react-loading-skeleton/dist/skeleton.css';
import useCheckReso from './utilities/useCheckReso';
// Contexts
import { SearchFilterContext } from './utilities/contexts/SearchFilterContext';
import { GlobalContext } from './utilities/contexts/GlobalContext';
// Lazy Imports
const Home = lazy(() => import('./pages/home/Home'));
const PopularAnime = lazy(
   () => import('./pages/main-anime-sections/PopularAnime')
);
const UpcomingAnime = lazy(
   () => import('./pages/main-anime-sections/UpcomingAnime')
);
const TopAnime = lazy(() => import('./pages/main-anime-sections/TopAnime'));
const FilteredAnime = lazy(
   () => import('./pages/main-anime-sections/FilteredAnime')
);
const IndividualAnime = lazy(
   () => import('./pages/main-anime-sections/individual-anime/IndividualAnime')
);
const SearchTags = lazy(() => import('./components/home/SearchTags'));
const IndividualOverview = lazy(
   () =>
      import('./pages/main-anime-sections/individual-anime/IndividualOverview')
);
const IndividualCharacters = lazy(
   () =>
      import(
         './pages/main-anime-sections/individual-anime/IndividualCharacters'
      )
);
const IndividualStaff = lazy(
   () => import('./pages/main-anime-sections/individual-anime/IndividualStaff')
);
const IndividualStats = lazy(
   () => import('./pages/main-anime-sections/individual-anime/IndividualStats')
);
const IndividualReviews = lazy(
   () =>
      import('./pages/main-anime-sections/individual-anime/IndividualReviews')
);

const App = () => {
   // States
   const [filteredGenre, setFilteredGenre] = useState<FilterModel[]>([]); // stores the current filters for genre
   const [filteredYear, setFilteredYear] = useState<FilterModel[]>([]);
   const [filteredStatus, setFilteredStatus] = useState<FilterModel[]>([]);
   const [genreActive, setGenreActive] = useState<boolean>(false);
   const [yearActive, setYearActive] = useState<boolean>(false);
   const [statusActive, setStatusActive] = useState<boolean>(false);
   const [filteredSeason, setFilteredSeason] = useState<FilterModel[]>([]);
   const [searchQuery, setSearchQuery] = useState<string>('');

   // Router Variables
   const { pathname } = useLocation();
   const isMainRoute = pathname.match(
      /^\/anime(?!.*(upcoming|popular|top)).*$/
   );
   const isHome = pathname.match(/^\/$/);

   // Array | Objects | Hooks
   const debouncedSearchQuery = useDebounce(searchQuery, 500);
   const { resolutionWidth } = useCheckReso();
   const iconSizes = {
      searchIcon: resolutionWidth < 640 ? '18' : '20',
      closeIcon: resolutionWidth < 640 ? '14' : '18',
      sortIcon: resolutionWidth < 640 ? '12' : '14',
   };

   // Conditional variables
   const totalFilterLength =
      filteredGenre.length + filteredYear.length + filteredStatus.length;
   const shouldRenderFilteredAnime =
      totalFilterLength > 0 || debouncedSearchQuery;

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
   const handleSearchFilterProps = {
      setFilteredGenre,
      setFilteredYear,
      setFilteredStatus,
      genreActive,
      yearActive,
      statusActive,
      setGenreActive,
      setYearActive,
      setStatusActive,
   };
   return (
      <>
         <GlobalContext.Provider value={{ iconSizes }}>
            <div className="bg-[#0d1116] text-[#ffffff] grid place-items-center content-start min-h-screen">
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
                  }}
               >
                  <Navigation />
                  <div
                     className={`${
                        isMainRoute !== null ? 'px-0' : 'px-4'
                     } grid place-items-center w-full`}
                  >
                     <div
                        className={`
                     ${
                        isMainRoute !== null
                           ? 'max-w-none'
                           : 'py-8 px-0 max-w-4xl'
                     } 
                     overflow-x-hidden sm:overflow-x-visible w-full max-w-4xl`}
                     >
                        <div
                           className={`
                        py-0 w-full `}
                        >
                           {isHome || isMainRoute === null ? (
                              <SearchFilter {...handleSearchFilterProps} />
                           ) : null}
                           {(totalFilterLength > 0 || searchQuery) && (
                              <Suspense fallback={<div></div>}>
                                 <SearchTags
                                    totalFilterLength={totalFilterLength}
                                 />
                              </Suspense>
                           )}
                           <Routes>
                              <Route
                                 path="/"
                                 element={
                                    <Suspense fallback={<div></div>}>
                                       {shouldRenderFilteredAnime ? (
                                          <FilteredAnime />
                                       ) : (
                                          <Home />
                                       )}
                                    </Suspense>
                                 }
                              />
                              <Route
                                 path="/anime/popular"
                                 element={
                                    <Suspense fallback={<div></div>}>
                                       {shouldRenderFilteredAnime ? (
                                          <FilteredAnime />
                                       ) : (
                                          <PopularAnime />
                                       )}
                                    </Suspense>
                                 }
                              />
                              <Route
                                 path="/anime/upcoming"
                                 element={
                                    <Suspense fallback={<div></div>}>
                                       {shouldRenderFilteredAnime ? (
                                          <FilteredAnime />
                                       ) : (
                                          <UpcomingAnime />
                                       )}
                                    </Suspense>
                                 }
                              />
                              <Route
                                 path="/anime/top"
                                 element={
                                    <Suspense fallback={<div></div>}>
                                       {shouldRenderFilteredAnime ? (
                                          <FilteredAnime />
                                       ) : (
                                          <TopAnime />
                                       )}
                                    </Suspense>
                                 }
                              />
                              <Route
                                 path="/anime/:mal_id/:anime_name/"
                                 element={
                                    <Suspense fallback={<div></div>}>
                                       <IndividualAnime />
                                    </Suspense>
                                 }
                              >
                                 <Route
                                    path="/anime/:mal_id/:anime_name/"
                                    // path=""
                                    element={
                                       <Suspense fallback={<div></div>}>
                                          <IndividualOverview />
                                       </Suspense>
                                    }
                                 />
                                 <Route
                                    path="characters"
                                    element={
                                       <Suspense
                                          fallback={<div>Loading...</div>}
                                       >
                                          <IndividualCharacters />
                                       </Suspense>
                                    }
                                 />
                                 <Route
                                    path="staff"
                                    element={
                                       <Suspense
                                          fallback={<div>Loading...</div>}
                                       >
                                          <IndividualStaff />
                                       </Suspense>
                                    }
                                 />
                                 <Route
                                    path="stats"
                                    element={
                                       <Suspense
                                          fallback={<div>Loading...</div>}
                                       >
                                          <IndividualStats />
                                       </Suspense>
                                    }
                                 />
                                 <Route
                                    path="reviews"
                                    element={
                                       <Suspense
                                          fallback={<div>Loading...</div>}
                                       >
                                          <IndividualReviews />
                                       </Suspense>
                                    }
                                 />
                              </Route>
                              <Route
                                 path="/manga"
                                 element={
                                    <div className="flex justify-center items-center py-8">
                                       Not Available atm
                                    </div>
                                 }
                              />
                              <Route
                                 path="/characters"
                                 element={
                                    <div className="flex justify-center items-center py-8">
                                       Not Available atm
                                    </div>
                                 }
                              />
                              <Route
                                 path="/schedule"
                                 element={
                                    <div className="flex justify-center items-center py-8">
                                       Not Available atm
                                    </div>
                                 }
                              />
                           </Routes>
                        </div>
                     </div>
                  </div>
               </SearchFilterContext.Provider>
            </div>
         </GlobalContext.Provider>
      </>
   );
};

export default App;
