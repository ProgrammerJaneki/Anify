import React, { useState, useEffect } from 'react';
import HoverModal from '../HoverModal';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import AnimeCards from './AnimeCards';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonLoading from '../../utilities/SkeletonLoading';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimeListModel {
   animeListData: AnimeDataModel[];
   loading: boolean;
   error: string;
   skeletonAmount: number;
   page: number;
}

const AnimeList = ({
   animeListData,
   loading,
   error,
   skeletonAmount,
   page,
}: AnimeListModel) => {
   const [hoveredItem, setHoveredItem] = useState<number | null>(null);
   const [isOverflow, setIsOverflow] = useState<boolean>(false);
   const handleHoverEnter = (item: number) => {
      setHoveredItem(item);
   };
   const handleHoverLeave = () => {
      setHoveredItem(null);
   };

   return (
      <>
         {animeListData.length === 0 && !loading && (
            <div className="flex justify-center items-center w-full ">
               No Results
            </div>
         )}
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-y-4 gap-x-4 sm:gap-x-8 w-ful">
            {loading && page === 1
               ? ''
               : animeListData.map((item) => (
                    <AnimeCards
                       key={item.mal_id}
                       animeModalData={item}
                       hoveredItem={hoveredItem}
                       setHoveredItem={setHoveredItem}
                    />
                 ))}
            <AnimatePresence>
               {loading && <SkeletonLoading amount={skeletonAmount} />}
            </AnimatePresence>
         </div>
      </>
   );
};

export default AnimeList;
