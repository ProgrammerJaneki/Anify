import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
   useFloating,
   autoUpdate,
   offset,
   flip,
   useHover,
   useFocus,
   useDismiss,
   useRole,
   useInteractions,
   FloatingPortal,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import useCheckReso from '../../utilities/useCheckReso';
import {
   SearchFilterContext,
   SearchFilterContextType,
} from '../../utilities/contexts/SearchFilterContext';

interface HoverModalModel {
   animeModalData: AnimeDataModel;
   hoveredItem: number | null;
   setHoveredItem: React.Dispatch<React.SetStateAction<number | null>>;
}

const AnimeCards = ({ animeModalData, setHoveredItem }: HoverModalModel) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'right',
      whileElementsMounted: autoUpdate,
      middleware: [offset(10), flip({})],
   });
   const { resolutionWidth } = useCheckReso();
   const { handleClearFilteredItems } = useContext(
      SearchFilterContext
   ) as SearchFilterContextType;

   const hover = useHover(context, { move: false });
   const focus = useFocus(context);
   const dismiss = useDismiss(context);
   const role = useRole(context, { role: 'tooltip' });

   const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
   ]);

   const handleHoverEnter = (item: number) => {
      setHoveredItem(item);
   };
   const handleHoverLeave = () => {
      setHoveredItem(null);
   };
   return (
      <AnimatePresence>
         <NavLink
            to={`/anime/${animeModalData.mal_id}/${animeModalData.title}/`}
            onClick={() => handleClearFilteredItems('')}
         >
            <motion.div
               key={animeModalData.mal_id}
               className="group relative font-semibold  text-[#676c75] cursor-pointer"
               initial="close"
               animate="open"
               exit="close"
               variants={cardVariant}
               onMouseEnter={() => handleHoverEnter(animeModalData.mal_id)}
               onMouseLeave={handleHoverLeave}
               ref={refs.setReference}
               {...getReferenceProps()}
            >
               <div className="aspect-[5/7] ">
                  <img
                     className="object-fill rounded-sm h-full w-full"
                     src={animeModalData.images.jpg.image_url}
                     alt="img"
                  />
               </div>
               <h2 className="text-sm group-hover:text-[#4fbdb5] pt-2 transition-all duration-100 ease-linear">
                  {animeModalData?.title}
               </h2>

               <FloatingPortal>
                  {resolutionWidth > 640 && isOpen && (
                     // hoveredItem === animeModalData.mal_id &&
                     <motion.div
                        className="z-10 bg-[#171d24] text-[#acbfd0] py-6 px-6 rounded-md w-[18.5rem]"
                        key={animeModalData.mal_id}
                        ref={refs.setFloating}
                        initial="close"
                        animate="open"
                        exit="close"
                        variants={modalVariant}
                        style={floatingStyles}
                        {...getFloatingProps()}
                     >
                        <div className="flex items-center justify-between">
                           {animeModalData.season || animeModalData.year ? (
                              <h1 className="capitalize">
                                 {animeModalData.season} {animeModalData.year}
                              </h1>
                           ) : (
                              'Unknown'
                           )}
                           {animeModalData.score ? (
                              <div className="inline-flex items-center gap-x-1">
                                 <Icon
                                    icon="ph:star-fill"
                                    color="#ffc107"
                                    width="14"
                                    height="14"
                                 />
                                 <h1>{animeModalData.score}</h1>
                              </div>
                           ) : (
                              ''
                           )}
                        </div>
                        <div className="text-xs py-3 space-y-1">
                           {animeModalData.studios?.map((studio) => {
                              return (
                                 <h1
                                    className="capitalize text-[#59dfd6]"
                                    key={studio.name}
                                 >
                                    {studio.name}
                                 </h1>
                              );
                           })}
                           <div className="flex gap-x-2">
                              <h1>{animeModalData.type} Show</h1>&#x2022;
                              {animeModalData.episodes ? (
                                 <h1>{animeModalData.episodes} episodes</h1>
                              ) : (
                                 'Airing'
                              )}
                           </div>
                        </div>
                        {/* Genre */}
                        <div className="text-xs text-[#ffff] mt-2 font-medium flex items-center flex-wrap gap-2">
                           {animeModalData.genres?.map((genre) => {
                              return (
                                 <div
                                    key={genre.mal_id}
                                    className="bg-[#59dfd6] rounded-full py-1 px-4"
                                 >
                                    {genre.name}
                                 </div>
                              );
                           })}
                        </div>
                     </motion.div>
                  )}
               </FloatingPortal>
            </motion.div>
         </NavLink>
      </AnimatePresence>
   );
};

const modalVariant = {
   open: {
      opacity: 1,
      transition: {
         type: 'spring',
         duration: 0.5,
      },
   },
   close: {
      opacity: 0,
      transition: {
         duration: 0.2,
      },
   },
};
const cardVariant = {
   open: {
      scale: 1,
      transition: {
         duration: 0.3,
      },
   },
   close: {
      scale: 0.9,
   },
};

export default AnimeCards;
