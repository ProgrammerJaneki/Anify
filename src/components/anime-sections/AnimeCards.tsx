import React, { useState } from 'react';
import HoverModal from '../HoverModal';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
   useFloating,
   autoUpdate,
   offset,
   flip,
   shift,
   useHover,
   useFocus,
   useDismiss,
   useRole,
   useInteractions,
   FloatingPortal,
   inline,
} from '@floating-ui/react';
import { start } from '@popperjs/core';

interface HoverModalModel {
   animeModalData: AnimeDataModel;
   hoveredItem: number | null;
   setHoveredItem: React.Dispatch<React.SetStateAction<number | null>>;
}

const AnimeCards = ({
   animeModalData,
   hoveredItem,
   setHoveredItem,
}: HoverModalModel) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { refs, x, y, strategy, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'right',
      whileElementsMounted: autoUpdate,
      middleware: [
         offset(10),
         flip({
            // fallbackAxisSideDirection: 'start',
         }),
         // shift(),
      ],
   });

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
      <div
         key={animeModalData.mal_id}
         className="group relative font-semibold  text-[#676c75] cursor-pointer"
         onMouseEnter={() => handleHoverEnter(animeModalData.mal_id)}
         onMouseLeave={handleHoverLeave}
         ref={refs.setReference}
         {...getReferenceProps()}
      >
         <div className="aspect-[5/7] ">
            <img
               className="object-fill rounded-md h-full w-full"
               src={animeModalData.images.jpg.image_url}
               alt="img"
            />
         </div>
         <h2 className="text-sm group-hover:text-[#4fbdb5] pt-2 transition-all duration-100 ease-linear">
            {animeModalData?.title}
         </h2>
         <FloatingPortal>
            {isOpen && hoveredItem === animeModalData.mal_id && (
               <div
                  className="z-10 bg-[#171d24] text-[#acbfd0] py-6 px-6 rounded-md w-[18.5rem]"
                  key={animeModalData.mal_id}
                  ref={refs.setFloating}
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
                     {animeModalData.studios.map((studio) => {
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
                     {animeModalData.genres.map((genre) => {
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
               </div>
            )}
         </FloatingPortal>
      </div>
   );
};

export default AnimeCards;
