import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { HoverModalDataModel } from '../interface/HoverModalDataModel';

const HoverModal = ({
   episodes,
   genres,
   score,
   season,
   studios,
   type,
   year,
}: HoverModalDataModel) => {
   return (
      <div className="z-10 absolute left-full translate-x-4 top-1 bg-[#171d24] text-[#acbfd0] py-6 px-6 rounded-md w-[18.5rem]">
         <div className="flex items-center justify-between">
            <h1>
               {season} {year}
            </h1>
            <div className="inline-flex items-center gap-x-1">
               <Icon
                  icon="ph:star-fill"
                  color="#ffc107"
                  width="14"
                  height="14"
               />
               <h1>{score}</h1>
            </div>
         </div>
         <div className="text-xs py-3">
            {studios.map((studio) => {
               return <h1 key={studio.name}>{studio.name}</h1>;
            })}
            <div className="flex gap-x-2">
               <h1>{type} Show</h1>&#x2022;
               {episodes ? <h1>{episodes} episodes</h1> : 'Airing'}
            </div>
         </div>
         {/* Genre */}
         <div className="text-xs text-[#ffff] mt-2 font-medium flex items-center flex-wrap gap-2">
            {genres.map((genre) => {
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
   );
};

export default HoverModal;
