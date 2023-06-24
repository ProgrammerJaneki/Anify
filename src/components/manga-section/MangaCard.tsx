import React, { useState } from 'react';
import { MiniTopMangaModel } from '../../interface/manga/MiniTopMangaModel';
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
import { format } from 'fecha';
import { motion, AnimatePresence } from 'framer-motion';
import useCheckReso from '../../utilities/useCheckReso';

interface HoverModalModel {
   mangaModalData: MiniTopMangaModel;
   hoveredItem: number | null;
   setHoveredItem: React.Dispatch<React.SetStateAction<number | null>>;
}

const MangaCard = ({ mangaModalData, setHoveredItem }: HoverModalModel) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'right',
      whileElementsMounted: autoUpdate,
      middleware: [offset(10), flip({})],
   });
   const { resolutionWidth } = useCheckReso();

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
   const handlePublishedDate = (
      from: string | undefined,
      to: string | undefined
   ) => {
      const formattedFromDate = from
         ? format(new Date(from ?? ''), 'YYYY')
         : '';
      const formattedToDate = to ? format(new Date(to ?? ''), 'YYYY') : '';
      if (from && to) {
         return `${formattedFromDate} - ${formattedToDate}`;
      }
      return formattedFromDate + formattedToDate;
   };
   const handleHoverEnter = (item: number) => {
      setHoveredItem(item);
   };
   const handleHoverLeave = () => {
      setHoveredItem(null);
   };
   return (
      <AnimatePresence>
         {/* <NavLink
            to={`/anime/${mangaModalData.mal_id}/${mangaModalData.title}/`}
            onClick={() => handleClearFilteredItems('')}
         > */}
         <motion.div
            key={mangaModalData.mal_id}
            className="group relative font-semibold  text-[#676c75] cursor-pointer"
            initial="close"
            animate="open"
            exit="close"
            variants={cardVariant}
            onMouseEnter={() => handleHoverEnter(mangaModalData.mal_id)}
            onMouseLeave={handleHoverLeave}
            ref={refs.setReference}
            {...getReferenceProps()}
         >
            <div className="aspect-[5/7] ">
               <img
                  className="object-fill rounded-sm h-full w-full"
                  src={mangaModalData.images.jpg.image_url}
                  alt="img"
               />
            </div>
            <h2 className="text-sm group-hover:text-[#4fbdb5] pt-2 transition-all duration-100 ease-linear">
               {mangaModalData?.title}
            </h2>

            <FloatingPortal>
               {resolutionWidth > 640 && isOpen && (
                  // hoveredItem === mangaModalData.mal_id &&
                  <motion.div
                     className="z-10 bg-[#171d24] text-[#acbfd0] py-6 px-6 rounded-md w-[18.5rem]"
                     key={mangaModalData.mal_id}
                     ref={refs.setFloating}
                     initial="close"
                     animate="open"
                     exit="close"
                     variants={modalVariant}
                     style={floatingStyles}
                     {...getFloatingProps()}
                  >
                     <div className="flex items-center justify-between">
                        {mangaModalData.published ? (
                           <div className="capitalize flex">
                              {handlePublishedDate(
                                 mangaModalData.published.from,
                                 mangaModalData.published.to
                              )}
                           </div>
                        ) : (
                           'Unknown'
                        )}
                        {mangaModalData.score ? (
                           <div className="inline-flex items-center gap-x-1">
                              <Icon
                                 icon="ph:star-fill"
                                 color="#ffc107"
                                 width="14"
                                 height="14"
                              />
                              <h1>{mangaModalData.score}</h1>
                           </div>
                        ) : (
                           ''
                        )}
                     </div>
                     {/* Type . Chapters */}
                     <div className="flex text-xs py-3 gap-x-2">
                        <h1 className="capitalize">{mangaModalData.type}</h1>
                        &#x2022;
                        <div className="flex gap-x-2">
                           {mangaModalData.chapters ? (
                              <h1>{mangaModalData.chapters} chapters</h1>
                           ) : (
                              'Airing'
                           )}
                        </div>
                     </div>
                     {/* Genre */}
                     <div className="text-xs text-[#ffff] mt-2 font-medium flex items-center flex-wrap gap-2">
                        {mangaModalData.genres?.map((genre) => {
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
         {/* </NavLink> */}
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

export default MangaCard;
