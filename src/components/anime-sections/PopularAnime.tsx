import { useEffect, useState } from 'react';
import useFetchPopular from '../../services/useFetchPopular';
import AnimeList from './AnimeList';
import { AnimeDataModel } from '../../interface/AnimeDataModel';

const PopularAnime = () => {
   const [contentLimit, setContentLimit] = useState<number>(25);
   const [page, setPage] = useState<number>(1);
   const [popularAnimeData, setPopularAnimeData] = useState<AnimeDataModel[]>(
      []
   );
   const { fetchedPopularData, loadingPopular, errorPopular } = useFetchPopular(
      contentLimit,
      page
   );

   useEffect(() => {
      setPopularAnimeData(fetchedPopularData);
      console.log('Fetch: ', fetchedPopularData);
   }, [fetchedPopularData]);

   return (
      <div className="space-y-4 w-full">
         <div className="font-semibold flex justify-between items-center col-span-full w-full">
            <h1 className="">POPULAR THIS SEASON</h1>
            <button className="text-xs text-[#676c75]">View All</button>
         </div>
         <AnimeList animeListData={popularAnimeData} />
      </div>
   );
};

export default PopularAnime;
