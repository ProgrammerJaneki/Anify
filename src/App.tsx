import axios from 'axios';
import Home from './components/Home';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
   return (
      <>
         <div className="bg-[#0d1116] text-[#ffffff] grid place-items-center content-start min-h-screen">
            <Navigation></Navigation>
            <div className="grid place-items-center px-4 w-full">
               <div className="py-8 max-w-4xl w-full">
                  <Routes>
                     <Route path="/" element={<Home />}></Route>
                  </Routes>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
