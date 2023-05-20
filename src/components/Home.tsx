import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import PopularAnime from './anime-sections/PopularAnime';
import UpcomingAnime from './anime-sections/UpcomingAnime';
import FilterComponent from './FilterComponent';
import { Icon } from '@iconify/react';

interface FilterModel {
   value: string | number;
   setValue: React.Dispatch<React.SetStateAction<string>>;
   dropDown: boolean;
   setActiveDropDown: (dropDown: React.SetStateAction<boolean>) => void;
   valueOptions: string[];
   filterName: string;
}

const Home = () => {
   const [filteredGenre, setFilteredGenre] = useState<string>('Any');
   const [filteredYear, setFilteredYear] = useState<string>('Any');
   const [filteredStatus, setFilteredStatus] = useState<string>('Any');
   const [dataLimit, setDataLImit] = useState<number>(4);
   const [page, setPage] = useState<number>(1);

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
   const [genreActive, setGenreActive] = useState<boolean>(false);
   const [yearActive, setYearActive] = useState<boolean>(false);
   const [statusActive, setStatusActive] = useState<boolean>(false);

   return (
      <div className="grid text-[#c9d7d7]">
         {/* Filter Section */}
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
         {/* Container */}
         <div className="grid gap-y-12 text-sm py-8">
            {/* Popular this Season Component */}
            <PopularAnime dataLimit={dataLimit} page={page} />
            <UpcomingAnime />
         </div>
      </div>
   );
};

export default Home;
