import { useEffect, useState } from 'react';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import AnimeCards from './AnimeCards';
import SkeletonLoading from '../../utilities/SkeletonLoading';
import 'react-loading-skeleton/dist/skeleton.css';
import { AnimatePresence } from 'framer-motion';

interface AnimeListModel {
   animeListData: any[] | undefined;
   loading: boolean;
   skeletonAmount: number;
}

const AnimeList = ({
   animeListData,
   loading,
   skeletonAmount,
}: AnimeListModel) => {
   const [hoveredItem, setHoveredItem] = useState<number | null>(null);
   return (
      <>
         {JSON.stringify(animeListData) === '[[]]' && (
            <div className="flex justify-center items-center w-full">
               No Results
            </div>
         )}
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-y-4 gap-x-4 sm:gap-x-8 w-full">
            {animeListData?.map((animeData) =>
               animeData?.map((item: AnimeDataModel) => (
                  <AnimeCards
                     key={item.mal_id}
                     animeModalData={item}
                     hoveredItem={hoveredItem}
                     setHoveredItem={setHoveredItem}
                  />
               ))
            )}
            <AnimatePresence>
               {(loading || loading) && (
                  <SkeletonLoading amount={skeletonAmount} />
               )}
            </AnimatePresence>
         </div>
      </>
   );
};

export default AnimeList;
