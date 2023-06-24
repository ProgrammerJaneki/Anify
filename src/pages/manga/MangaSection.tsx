import React, { Suspense, lazy } from 'react';
const TopManga = lazy(() => import('./TopManga'));

const MangaSection: React.FC = () => {
   return (
      <div className="grid place-items-center px-4 w-full">
         <div className="w-full max-w-4xl">
            <Suspense fallback={<div>Loading...</div>}>
               <TopManga />
            </Suspense>
         </div>
      </div>
   );
};

export default MangaSection;
