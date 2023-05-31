import { useEffect, useState } from 'react';

const useCheckReso = () => {
   const [resolution, _setResolution] = useState({ width: 0, height: 0 });
   const [resolutionWidth, setResolutionWidth] = useState(0);
   const [resolutonHeight, setResolutionHeight] = useState(0);
   useEffect(() => {
      const handleResize = () => {
         setResolutionWidth(window.innerWidth);
         setResolutionHeight(window.innerHeight);
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
   });

   return { resolutionWidth, resolutonHeight };
};

export default useCheckReso;
