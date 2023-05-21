import React, { useState, useEffect } from 'react';
import HoverModal from '../HoverModal';
import { AnimeDataModel } from '../../interface/AnimeDataModel';

interface AnimeListModel {
   animeListData: AnimeDataModel[];
}

// This component will the ff. props:
// the anime data | fetchedAnimeData

const AnimeList = ({ animeListData }: AnimeListModel) => {
   const [hoveredItem, setHoveredItem] = useState<number | null>(null);
   const handleHoverEnter = (item: number) => {
      setHoveredItem(item);
   };
   const handleHoverLeave = () => {
      setHoveredItem(null);
   };

   return (
      <div className="grid grid-cols-3 md:grid-cols-4  gap-y-4 gap-x-8 w-ful">
         {/* I'll make this reusable */}
         {animeListData.map((item) => (
            <div
               key={item.mal_id}
               className="group relative font-semibold  text-[#676c75] cursor-pointer"
               onMouseEnter={() => handleHoverEnter(item.mal_id)}
               onMouseLeave={handleHoverLeave}
            >
               {/* Modal */}
               {hoveredItem === item.mal_id && (
                  // <ModalContent name={item.title} />
                  <HoverModal key={item.mal_id} animeModalData={item} />
               )}
               <div className="aspect-[5/7] ">
                  <img
                     className="object-fill rounded-sm h-full w-full"
                     src={item.images.jpg.image_url}
                     alt="img"
                  />
               </div>
               <h2 className="text-sm group-hover:text-[#4fbdb5] pt-2 transition-all duration-100 ease-linear">
                  {item?.title}
               </h2>
            </div>
         ))}
      </div>
   );
};

export default AnimeList;
