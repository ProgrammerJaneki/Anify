import { Icon } from '@iconify/react/dist/iconify.js';

const ErrorMessage = () => {
   return (
      <>
         <div className="flex flex-col justify-center space-y-1 items-center w-full h-[calc(100vh-50vh)]">
            <Icon
               className="text-red-400"
               icon="bxs:error"
               width="60"
               height="60"
            />
            <span className="text-[#9FADBD] text-2xl font-bold">
               An error has occured!
            </span>
         </div>
      </>
   );
};

export default ErrorMessage;
