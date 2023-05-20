import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import useFetchPopular from '../../services/useFetchPopular';
import HoverModal from '../HoverModal';
import { AnimeDataModel } from '../../interface/AnimeDataModel';

interface PopularAnimeModel {
   dataLimit: number;
   page: number;
}

const PopularAnime = ({ dataLimit, page }: PopularAnimeModel) => {
   const [popularAnimeData, setPopularAnimeData] = useState<AnimeDataModel[]>(
      []
   );
   const [isHovered, setIsHovered] = useState<boolean>(false);
   const [hoveredItems, setHoveredItems] = useState<number | null>(null);
   const { fetchPopularData, loading, error } = useFetchPopular(
      dataLimit,
      page
   );

   const handleHoverEnter = (item: number) => {
      setHoveredItems(item);
   };
   const handleHoverLeave = () => {
      setHoveredItems(null);
   };

   useEffect(() => {
      setPopularAnimeData(fetchPopularData);
   }, [fetchPopularData]);

   return (
      <div className="grid grid-cols-3 md:grid-cols-4  gap-y-4 gap-x-8 w-ful">
         <div className="font-semibold flex justify-between items-center col-span-full w-full">
            <h1 className="-full ">POPULAR THIS SEASON</h1>
            <button className="text-xs text-[#676c75]">View All</button>
         </div>

         {popularAnimeData.map((item) => (
            <div
               key={item.mal_id}
               className="group relative font-semibold  text-[#676c75] cursor-pointer"
               onMouseEnter={() => handleHoverEnter(item.mal_id)}
               onMouseLeave={handleHoverLeave}
            >
               {/* Modal */}
               {hoveredItems === item.mal_id && (
                  // <ModalContent name={item.title} />
                  <HoverModal
                     key={item.mal_id}
                     episodes={item.episodes}
                     genres={item.genres}
                     score={item.score}
                     season={item.season}
                     studios={item.studios}
                     type={item.type}
                     year={item.year}
                  />
               )}
               <div className="aspect-[5/7] ">
                  <img
                     className="object-fill rounded-sm h-full w-full"
                     // src="https:\/\/cdn.myanimelist.net\/images\/anime\/1075\/131925.jpg"
                     // src={fetchPopularData[0]?.images.jpg.image_url}
                     src={item.images.jpg.image_url}
                     alt="img"
                  />
               </div>
               <h2 className="group-hover:text-[#4fbdb5] pt-2 transition-all duration-100 ease-linear">
                  {/* {item} */}
                  {/* {item.studios[0]?.name} */}
                  {item?.title}
                  {/* {item.studios.map((studio) => {
                     return studio.name;
                  })} */}
               </h2>
            </div>
         ))}
      </div>
   );
};

export default PopularAnime;
