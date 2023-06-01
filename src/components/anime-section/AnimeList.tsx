import { useState } from 'react';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import AnimeCards from './AnimeCards';
import SkeletonLoading from '../../utilities/SkeletonLoading';
import 'react-loading-skeleton/dist/skeleton.css';
import { AnimatePresence } from 'framer-motion';

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
   const [showMessage, setShowMessage] = useState<boolean>(false);
   setTimeout(() => {
      setShowMessage(true);
   }, 1000);
   return (
      <>
         {showMessage &&
            animeListData.length === 0 &&
            !loading &&
            error === '' && (
               <div className="flex justify-center items-center w-full">
                  No Results
               </div>
            )}

         {error !== '' && (
            <div className="flex justify-center items-center w-full">Error</div>
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
