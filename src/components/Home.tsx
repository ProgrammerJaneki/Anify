import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import AnimeList from './anime-sections/AnimeList';
import useFetchPopular from '../services/useFetchPopular';
import useFetchUpcoming from '../services/useFetchUpcoming';
import useFetchTop from '../services/useFetchTop';
import { AnimeDataModel } from '../interface/AnimeDataModel';
import { NavLink } from 'react-router-dom';

interface FilterModel {
   value: string | number;
   setValue: React.Dispatch<React.SetStateAction<string>>;
   dropDown: boolean;
   setActiveDropDown: (dropDown: React.SetStateAction<boolean>) => void;
   valueOptions: string[];
   filterName: string;
}

const Home = () => {
   const [contentLimit, setContentLimit] = useState<number>(8);
   const [page, setPage] = useState<number>(1);
   const [popularAnimeData, setPopularAnimeData] = useState<AnimeDataModel[]>(
      []
   );
   const [upcomingAnimeData, setUpcomingAnimeData] = useState<AnimeDataModel[]>(
      []
   );
   const [topAnimeData, setTopAnimeData] = useState<AnimeDataModel[]>([]);
   const { fetchedPopularData, loadingPopular, errorPopular } = useFetchPopular(
      4,
      1
   );
   const { fetchedUpcomingData, loadingUpcoming, errorUpcoming } =
      useFetchUpcoming(4, 1);
   const { fetchedTopData, loadingTop, errorTop } = useFetchTop(4, 1);

   useEffect(() => {
      setPopularAnimeData(fetchedPopularData);
      setUpcomingAnimeData(fetchedUpcomingData);
      setTopAnimeData(fetchedTopData);
   }, [fetchedPopularData, fetchedUpcomingData, fetchedTopData]);

   return (
      <div className="grid text-[#c9d7d7]">
         <div className="grid gap-y-12 text-sm py-0">
            <div className="space-y-4 w-full">
               <div className="font-bold flex justify-between items-center w-full">
                  <h1 className="text-xs sm:text-sm">POPULAR THIS SEASON</h1>
                  <NavLink
                     to="/anime/popular"
                     className="text-xs text-[#676c75]"
                  >
                     View All
                  </NavLink>
               </div>
               <AnimeList animeListData={popularAnimeData} />
            </div>
            <div className="space-y-4 w-full">
               <div className="font-bold flex justify-between items-center w-full">
                  <h1 className="text-xs sm:text-sm">UPCOMING SEASON</h1>
                  <NavLink
                     to="/anime/upcoming"
                     className="text-xs text-[#676c75]"
                  >
                     View All
                  </NavLink>
               </div>
               <AnimeList animeListData={upcomingAnimeData} />
            </div>
            <div className="space-y-4 w-full">
               <div className="font-bold flex justify-between items-center w-full">
                  <h1 className="text-xs sm:text-sm">TOP ANIME</h1>
                  <NavLink to="/anime/top" className="text-xs text-[#676c75]">
                     View All
                  </NavLink>
               </div>
               <AnimeList animeListData={topAnimeData} />
            </div>
         </div>
      </div>
   );
};

export default Home;
