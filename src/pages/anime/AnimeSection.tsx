import React, { Suspense, lazy, useContext, useState } from 'react';
import SearchFilter from '../../components/home/SearchFilter';
import { useLocation, Routes, Route } from 'react-router-dom';
import {
   SearchFilterContext,
   SearchFilterContextType,
} from '../../utilities/contexts/SearchFilterContext';
const HomeAnime = lazy(() => import('./HomeAnime'));
const PopularAnime = lazy(() => import('../main-anime-sections/PopularAnime'));
const TopAnime = lazy(() => import('../main-anime-sections/TopAnime'));
const UpcomingAnime = lazy(
   () => import('../main-anime-sections/UpcomingAnime')
);
const FilteredAnime = lazy(
   () => import('../main-anime-sections/FilteredAnime')
);
const IndividualAnime = lazy(
   () => import('../main-anime-sections/individual-anime/IndividualAnime')
);
const SearchTags = lazy(() => import('../../components/home/SearchTags'));
const IndividualOverview = lazy(
   () => import('../main-anime-sections/individual-anime/IndividualOverview')
);
const IndividualCharacters = lazy(
   () => import('../main-anime-sections/individual-anime/IndividualCharacters')
);
const IndividualStaff = lazy(
   () => import('../main-anime-sections/individual-anime/IndividualStaff')
);
const IndividualStats = lazy(
   () => import('../main-anime-sections/individual-anime/IndividualStats')
);
const IndividualReviews = lazy(
   () => import('../main-anime-sections/individual-anime/IndividualReviews')
);

const AnimeSection: React.FC = () => {
   const [genreActive, setGenreActive] = useState<boolean>(false);
   const [yearActive, setYearActive] = useState<boolean>(false);
   const [statusActive, setStatusActive] = useState<boolean>(false);
   // Context
   const {
      debouncedSearchQuery,
      setFilteredYear,
      setFilteredGenre,
      setFilteredStatus,
      searchQuery,
      filteredGenre,
      filteredYear,
      filteredStatus,
   } = useContext(SearchFilterContext) as SearchFilterContextType;
   const totalFilterLength =
      filteredGenre.length + filteredYear.length + filteredStatus.length;
   const shouldRenderFilteredAnime =
      totalFilterLength > 0 || debouncedSearchQuery;
   const { pathname } = useLocation();
   const isMainRoute = /^\/anime(?!.*(upcoming|popular|top)).*$/.test(pathname);
   const isHome = pathname.match(/^\/$/);

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
         <div
            className={`${
               isMainRoute ? 'px-0' : 'px-4'
            } grid place-items-center w-full`}
         >
            <div
               className={`${
                  isMainRoute ? 'max-w-none' : 'py-8 px-0 max-w-4xl'
               } overflow-x-hidden sm:overflow-x-visible w-full max-w-4xl`}
            >
               <div className="w-full">
                  {isHome || !isMainRoute ? (
                     <SearchFilter {...handleSearchFilterProps} />
                  ) : null}
                  {(totalFilterLength > 0 || searchQuery) && (
                     <Suspense fallback={<div></div>}>
                        <SearchTags totalFilterLength={totalFilterLength} />
                     </Suspense>
                  )}
                  {/* Routes */}
                  <Routes>
                     <Route
                        path="/"
                        element={
                           <Suspense fallback={<div></div>}>
                              {shouldRenderFilteredAnime ? (
                                 <FilteredAnime />
                              ) : (
                                 <HomeAnime />
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
                              <Suspense fallback={<div>Loading...</div>}>
                                 <IndividualCharacters />
                              </Suspense>
                           }
                        />
                        <Route
                           path="staff"
                           element={
                              <Suspense fallback={<div>Loading...</div>}>
                                 <IndividualStaff />
                              </Suspense>
                           }
                        />
                        <Route
                           path="stats"
                           element={
                              <Suspense fallback={<div>Loading...</div>}>
                                 <IndividualStats />
                              </Suspense>
                           }
                        />
                        <Route
                           path="reviews"
                           element={
                              <Suspense fallback={<div>Loading...</div>}>
                                 <IndividualReviews />
                              </Suspense>
                           }
                        />
                     </Route>

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
      </>
   );
};

export default AnimeSection;
