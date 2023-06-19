import React, { useState } from 'react';
import { useAnimeData } from './IndividualAnime';
import useFetchedAnimeReco from '../../../services/individual-anime/useFetchedAnimeReco';
import { AnimeRecoModel } from '../../../interface/AnimeRecoModel';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface AnimeCardModel {
   data: AnimeRecoModel;
}

const AnimeReco: React.FC = () => {
   const { mal_id } = useAnimeData();
   const { animeRecoData } = useFetchedAnimeReco(mal_id);
   const [maxItem, setMaxItem] = useState<number>(4);
   const handleSetMax = () => {
      setTimeout(() => {
         if (maxItem === 4) {
            return setMaxItem(animeRecoData?.length ?? 0);
         }
         setMaxItem(4);
      }, 300);
   };
   return animeRecoData?.length === 0 ? (
      <></>
   ) : (
      <div className="space-y-2 w-full">
         <div className="flex justify-between font-semibold text-sm text-[#9FADBD] w-full">
            <h1 className="" onClick={handleSetMax}>
               Recommendations
            </h1>
            <button className="text-xs text-[#676c75]" onClick={handleSetMax}>
               {maxItem === 4 ? <span>View All</span> : <span>View Less</span>}
            </button>
         </div>
         <div className="grid content-around grid-cols-2 sm:grid-cols-4 gap-4">
            {animeRecoData?.slice(0, maxItem).map((item, index) => (
               <AnimeCard key={index} data={item} />
            ))}
         </div>
      </div>
   );
};

const AnimeCard: React.FC<AnimeCardModel> = ({ data }) => {
   const [isHovered, setIsHovered] = useState<boolean>(false);
   const handleHover = () => {
      setIsHovered(true);
   };
   const handleHoverEnd = () => {
      setIsHovered(false);
   };
   return (
      <AnimatePresence>
         <NavLink
            to={`/anime/${data.entry.mal_id}/${data.entry.title}`}
            className="flex flex-col"
         >
            <div className="space-y-3 w-full overflow-hidden">
               <motion.div
                  className="group relative w-full"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHoverEnd}
                  animate="open"
                  initial="close"
                  exit="close"
                  variants={AnimeCardVariant}
               >
                  <img
                     className="w-full aspect-[5/7] rounded-sm"
                     src={data.entry.images.jpg.image_url}
                     alt="reco"
                  />
                  {isHovered && (
                     <motion.div
                        className="bottom-4 text-center text-xs text-[#dedede] absolute w-full "
                        initial="close"
                        animate="open"
                        exit="close"
                        variants={voteVariant}
                     >
                        <span className="bg-smoke-dark backdrop-blur-sm p-2 px-8 rounded-sm ">
                           {data.votes} Votes
                        </span>
                     </motion.div>
                  )}
               </motion.div>
               <h1 className="font-semibold text-xs text-[#9FADBD] leading-none">
                  {data.entry.title}
               </h1>
            </div>
         </NavLink>
      </AnimatePresence>
   );
};

const AnimeCardVariant = {
   open: {
      scale: 1,
      transition: {
         duration: 0.2,
      },
   },
   close: {
      scale: 0.9,
   },
};

const voteVariant = {
   open: {
      y: 0,
      opacity: 1,
      transition: {
         type: 'spring',
         bounce: 0,
         duration: 0.5,
         delayChildren: 0.01,
         staggerChildren: 0.05,
      },
   },
   close: {
      y: 30,
      opacity: 0,
   },
};

export default AnimeReco;
