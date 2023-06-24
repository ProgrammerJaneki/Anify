import { useState } from 'react';
import { AnimeDataModel } from '../../interface/anime/AnimeDataModel';
import ErrorMessage from '../../utilities/ErrorMessage';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getFetchPopular from '../../services/anime/getFetchPopular';
import getFetchTop from '../../services/anime/getFetchTop';
import getFetchUpcoming from '../../services/anime/getFetchUpcoming';
import AnimeCards from '../../components/anime-section/AnimeCards';
import { AnimatePresence } from 'framer-motion';
import SkeletonLoading from '../../utilities/SkeletonLoading';

interface WrapperModel {
   wrapperFunction: (contentLimit: number, page: number) => Promise<any>;
   sectionTitle: string;
   sectionKey: string;
   route: string;
}

const Home = () => {
   return (
      <div className=" overflow-x-hidden sm:overflow-x-visible w-full max-w-4xl">
         <MainSection />
      </div>
   );
};

const MainSection: React.FC = () => {
   return (
      <div className="grid text-[#9FADBD] py-8 w-full">
         <div className="grid gap-y-12 text-sm py-2">
            <SectionWrapper
               wrapperFunction={getFetchPopular}
               sectionTitle="POPULAR ANIME"
               sectionKey="popularAnimeData"
               route="popular"
            />
            <SectionWrapper
               wrapperFunction={getFetchUpcoming}
               sectionTitle="UPCOMING ANIME"
               sectionKey="upcomingAnimeData"
               route="upcoming"
            />
            <SectionWrapper
               wrapperFunction={getFetchTop}
               sectionTitle="TOP ANIME"
               sectionKey="topAnimeData"
               route="top"
            />
         </div>
      </div>
   );
};

const SectionWrapper: React.FC<WrapperModel> = ({
   wrapperFunction,
   sectionTitle,
   sectionKey,
   route,
}) => {
   const [page, _setPage] = useState<number>(1);
   const [hoveredItem, setHoveredItem] = useState<number | null>(null);
   const { data, isLoading, isError } = useQuery({
      queryKey: [sectionKey, 4, page],
      queryFn: () => wrapperFunction(4, page),
      cacheTime: 5000,
   });

   return (
      <div className="space-y-4 w-full">
         <div className="font-bold flex justify-between items-center w-full">
            <h1 className="text-xs sm:text-sm capitalize">{sectionTitle}</h1>
            <NavLink to={`/anime/${route}`} className="text-xs text-[#676c75]">
               View All
            </NavLink>
         </div>
         {isError ? (
            <ErrorMessage />
         ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-y-4 gap-x-4 sm:gap-x-8 w-full">
               {data?.map((item: AnimeDataModel) => (
                  <AnimeCards
                     key={item.mal_id}
                     animeModalData={item}
                     hoveredItem={hoveredItem}
                     setHoveredItem={setHoveredItem}
                  />
               ))}
               <AnimatePresence>
                  {isLoading && <SkeletonLoading amount={4} />}
               </AnimatePresence>
            </div>
         )}
      </div>
   );
};
export default Home;
