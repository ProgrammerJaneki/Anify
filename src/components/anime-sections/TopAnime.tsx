import React, { useEffect, useState } from 'react';

const TopAnime = () => {
   const [resolution, setResolution] = useState({ width: 0, height: 0 });

   useEffect(() => {
      const handleResize = () => {
         setResolution({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };

      // Attach the event listener
      window.addEventListener('resize', handleResize);

      // Call the handleResize function initially
      handleResize();
      if (resolution.width > 1200) {
         console.log('Yes');
      }
      // Clean up the event listener on component unmount
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <div>
         Current Resolution: {resolution.width}x{resolution.height}
      </div>
   );
};

export default TopAnime;
