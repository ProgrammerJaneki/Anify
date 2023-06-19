import { useContext, useState } from 'react';
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
} from '@floating-ui/react';
import {
   IndividualAnimeContext,
   IndividualAnimeContextType,
} from '../../../utilities/contexts/IndividualAnimeContext';
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useCheckReso from '../../../utilities/useCheckReso';

interface RelationsModel {
   relation: string;
   entry: { mal_id: number; type: string; name: string; url: string };
   hideTitle: boolean | undefined;
}

const AnimeRelations: React.FC = () => {
   const { fullAnimeData } = useContext(
      IndividualAnimeContext
   ) as IndividualAnimeContextType;
   const relations = fullAnimeData?.relations;
   const hideTitle = relations?.some((item) => item.entry.length > 5);

   return fullAnimeData?.relations.length === 0 ? (
      <></>
   ) : (
      <div className="space-y-2 w-full">
         <h1 className="font-semibold text-sm text-[#9FADBD] ">Relations</h1>
         <div
            className={`${
               relations?.length === 1
                  ? 'w-full md:w-[50%] grid grid-cols-2 grid-rows-1 sm:pr-3 '
                  : ''
            } flex sm:grid grid-cols-2 sec-md:grid-cols-relations-auto grid-rows-2 sec-md:grid-rows-1  gap-4 rounded-md snap-x snap-mandatory overflow-auto sm:overflow-visible w-full`}
         >
            {relations?.map((item) => {
               return item.entry.map((entry, index) => (
                  <Entries
                     key={index}
                     relation={item.relation}
                     entry={entry}
                     hideTitle={hideTitle}
                  />
               ));
            })}
         </div>
      </div>
   );
};

const Entries: React.FC<RelationsModel> = ({ relation, entry, hideTitle }) => {
   const { resolutionWidth } = useCheckReso();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'right',
      whileElementsMounted: autoUpdate,
      middleware: [offset(10), flip()],
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
   return (
      <AnimatePresence>
         <NavLink
            to={entry.url}
            key={entry.mal_id}
            className="bg-[#14181d] flex rounded-sm snap-start sm:aspect-2/4 "
            ref={refs.setReference}
            {...getReferenceProps()}
         >
            <div className="relative flex flex-col justify-between group rounded-sm gap-2 text-xs p-3 w-[200px]">
               <div className="flex flex-col gap-y-2">
                  <h1 className="text-[#59dfd6] font-medium text-sm">
                     {relation}
                  </h1>
                  {hideTitle && resolutionWidth > 640 ? (
                     isOpen && (
                        <div
                           className="flex items-center justify-center text-center cursor-pointer p-2 bg-[#0d1116] sm:bg-[#14181d] shadow-xl  rounded-sm z-50 w-[200px] min-h-[70px]"
                           ref={refs.setFloating}
                           style={floatingStyles}
                           {...getFloatingProps()}
                        >
                           <span className="font-medium text-sm text-[#9FADBD] sm:w-3/4 md:w-auto">
                              {entry.name}
                           </span>
                        </div>
                     )
                  ) : (
                     <span className="font-medium text-[#9FADBD] sm:w-3/4 md:w-auto">
                        {entry.name}
                     </span>
                  )}
               </div>
               <div className="flex items-center font-semibold capitalize">
                  <h2 className=" ">{entry.type}</h2>
               </div>
            </div>
         </NavLink>
      </AnimatePresence>
   );
};

export default AnimeRelations;
