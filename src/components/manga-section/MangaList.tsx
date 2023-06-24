import { useState } from 'react';
import { MiniTopMangaModel } from '../../interface/manga/MiniTopMangaModel';
import MangaCard from './MangaCard';
import SkeletonLoading from '../../utilities/SkeletonLoading';
import 'react-loading-skeleton/dist/skeleton.css';
import { AnimatePresence } from 'framer-motion';

interface AnimeListModel {
   mangaListData: MiniTopMangaModel[] | undefined;
   loading: boolean;
   skeletonAmount: number;
}

const MangaList = ({
   mangaListData,
   loading,
   skeletonAmount,
}: AnimeListModel) => {
   const [hoveredItem, setHoveredItem] = useState<number | null>(null);

   return (
      <>
         {JSON.stringify(mangaListData) === '[[]]' && (
            <div className="flex justify-center items-center w-full">
               No Results
            </div>
         )}
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-y-4 gap-x-4 sm:gap-x-8 w-full">
            {
               // mangaListData?.map((animeData) =>
               mangaListData?.map((item: MiniTopMangaModel) => (
                  <MangaCard
                     key={item.mal_id}
                     mangaModalData={item}
                     hoveredItem={hoveredItem}
                     setHoveredItem={setHoveredItem}
                  />
                  // <AnimeCards
                  //    key={item.mal_id}
                  //    animeModalData={item}
                  //    hoveredItem={hoveredItem}
                  //    setHoveredItem={setHoveredItem}
                  // />
               ))
               // )
            }
            <AnimatePresence>
               {(loading || loading) && (
                  <SkeletonLoading amount={skeletonAmount} />
               )}
            </AnimatePresence>
         </div>
      </>
   );
};

export default MangaList;
