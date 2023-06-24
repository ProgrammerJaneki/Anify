import axios from 'axios';
import { MiniTopMangaModel } from '../../interface/manga/MiniTopMangaModel';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchedTopMangaData = async (page: number) => {
   const baseUrl = `https://api.jikan.moe/v4/top/manga?page=${page}`;
   const listTopMangaData = await axios.get(baseUrl);
   const { data } = listTopMangaData.data;
   const topMangaDataList = data.map((manga: MiniTopMangaModel) => {
      const topMangaData: MiniTopMangaModel = {
         mal_id: manga.mal_id,
         images: manga.images,
         title: manga.title,
         type: manga.type,
         chapters: manga.chapters,
         published: manga.published,
         score: manga.score,
         genres: manga.genres,
      };
      return topMangaData;
   });
   return topMangaDataList
};

const useFetchedTopManga = () => {
   const {
      data: topMangaData,
      fetchNextPage: fetchNextTopMangaList,
      isFetching: isTopMangaListFetching,
      hasNextPage: hasNextMangaPage,
      isSuccess: isTopMangaListSuccess,
      isError: isTopMangaListError,
   } = useInfiniteQuery<MiniTopMangaModel[]>({
      queryKey: ['topMangaList'],
      queryFn: ({ pageParam = 1 }) => fetchedTopMangaData(pageParam),
      cacheTime: 0,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
         return lastPage.length === 25 ? allPages.length + 1 : undefined;
      },
   });
   return {
      topMangaData,
      fetchNextTopMangaList,
      isTopMangaListFetching,
      hasNextMangaPage,
      isTopMangaListSuccess,
      isTopMangaListError,
   };
};

export default useFetchedTopManga;
