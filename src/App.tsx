import axios from 'axios';
import Home from './components/Home';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import PopularAnime from './components/anime-sections/PopularAnime';
import SearchFilter from './components/SearchFilter';
import { useEffect, useState } from 'react';
import UpcomingAnime from './components/anime-sections/UpcomingAnime';

function App() {
   // Filter datas
   const [filteredGenre, setFilteredGenre] = useState<string>('Any');
   const [filteredYear, setFilteredYear] = useState<string>('Any');
   const [filteredStatus, setFilteredStatus] = useState<string>('Any');
   const [genreActive, setGenreActive] = useState<boolean>(false);
   const [yearActive, setYearActive] = useState<boolean>(false);
   const [statusActive, setStatusActive] = useState<boolean>(false);
   const [genreOptions, setGenreOptions] = useState<string[]>([
      'Action',
      'Adventure',
      'Comedy',
   ]);
   const [yearOptions, setYearOptions] = useState<string[]>([
      '2023',
      '2022',
      '2021',
   ]);
   const [statusOptions, setStatusOptions] = useState<string[]>([
      'airing',
      'complete',
      'upcoming',
   ]);

   const handleSearchFilterProps = {
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
   };

   return (
      <>
         <div className="bg-[#0d1116] text-[#ffffff] grid place-items-center content-start min-h-screen">
            <Navigation></Navigation>
            <div className="grid place-items-center px-4 w-full">
               <div className="space-y-8 py-8 max-w-4xl w-full">
                  <SearchFilter {...handleSearchFilterProps} />
                  <Routes>
                     <Route path="/" element={<Home />}></Route>
                     <Route path="/anime/popular" element={<PopularAnime />} />
                     <Route
                        path="/anime/upcoming"
                        element={<UpcomingAnime />}
                     />
                  </Routes>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
