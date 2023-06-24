import React from 'react';
import useFetchedTopManga from '../../services/manga/useFetchedTopManga';
import InfiniteScroll from 'react-infinite-scroll-component';
import MangaList from '../../components/manga-section/MangaList';

const TopManga: React.FC = () => {
   const {
      topMangaData,
      fetchNextTopMangaList,
      isTopMangaListFetching,
      hasNextMangaPage,
   } = useFetchedTopManga();
   const topMangaDataList = topMangaData?.pages.flat();
   const totalLength = topMangaDataList?.length ?? 0;
   const handleNextPage = () => {
      fetchNextTopMangaList();
   };
   return (
      <div className="space-y-4 py-6 w-full">
         <InfiniteScroll
            dataLength={totalLength}
            next={handleNextPage}
            hasMore={hasNextMangaPage ?? false}
            loader={null}
            scrollThreshold={1}
         >
            <MangaList
               mangaListData={topMangaDataList}
               loading={isTopMangaListFetching}
               skeletonAmount={25}
            />
         </InfiniteScroll>
      </div>
   );
};

export default TopManga;
