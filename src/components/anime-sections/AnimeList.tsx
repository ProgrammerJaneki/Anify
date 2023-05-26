import React, { useState, useEffect } from 'react';
import HoverModal from '../HoverModal';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import AnimeCards from './AnimeCards';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonLoading from '../utilities/SkeletonLoading';
import 'react-loading-skeleton/dist/skeleton.css';

interface AnimeListModel {
   animeListData: AnimeDataModel[];
   loading: boolean;
   error: string;
   handleNextPopularPage: () => void;
   hasMore: boolean;
   page: number;
}

// Create a component here for anime cards

// This component will the ff. props:
// the anime data | fetchedAnimeData

const AnimeList = ({
   animeListData,
   loading,
   error,
   handleNextPopularPage,
   hasMore,
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
         <InfiniteScroll
            dataLength={animeListData.length}
            next={handleNextPopularPage}
            hasMore={hasMore}
            loader={null}
            scrollThreshold={0.8}
         >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-y-4 gap-x-8 w-ful">
               {/* I'll make this reusable */}
               {/* {!loading && animeListData.length === 0 && <div>No Results</div>} */}
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
               {/* I don't want to re-render the Anime Card during scrolling. Only when it's in page 1 and loading */}
               {loading && <SkeletonLoading amount={8} />}
            </div>
         </InfiniteScroll>
      </>
   );
};

export default AnimeList;
