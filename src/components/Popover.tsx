import React, { ReactNode, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
   FloatingFocusManager,
   FloatingPortal,
   autoUpdate,
   flip,
   offset,
   shift,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useRole,
} from '@floating-ui/react';
import { FilterModel } from '../interface/FilterModel';

interface FilterButtonModel {
   filterValue: FilterModel[];
}

interface ChildrenModel {
   Children: ReactNode;
}

interface PopoverModel {
   Children: ReactNode;
   name: string;
}

const Popover: React.FC<PopoverModel> = ({ name, Children }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom',
      middleware: [
         offset(10),
         flip({}),
         // flip({ fallbackAxisSideDirection: 'start' }),
         shift(),
      ],
      whileElementsMounted: autoUpdate,
   });
   const click = useClick(context);
   const dismiss = useDismiss(context);
   const role = useRole(context);

   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      role,
   ]);
   return (
      <>
         <button
            className="p-4 bg-red-400 flex items-center gap-x-8 w-[100px]"
            ref={refs.setReference}
            {...getReferenceProps()}
            onClick={() => setIsOpen(!isOpen)}
         >
            <div>TESTING</div>
            {isOpen && (
               <div
                  className="relative font-semibold flex flex-col cursor-pointer gap-x-2 bg-[#14181d] text-[#676c75] py-2 px-4 rounded-md w-[170px] sm:w-[200px] z-20"
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
               >
                  <span className="text-sm">{name}</span>
                  <div>THIS:</div>
                  {Children}
               </div>
            )}
         </button>
      </>
   );
};

export default Popover;
