import { Icon } from '@iconify/react/dist/iconify.js';

export const ReviewIcons = {
   nice: {
      name: 'Nice',
      icon: <Icon icon="mdi:like" color="#facc15" width="14" height="14" />,
   },
   funny: {
      name: 'Funny',
      icon: <Icon icon="bxs:laugh" color="#facc15" width="14" height="14" />,
   },
   love_it: {
      name: 'Love it',
      icon: (
         <Icon icon="ph:heart-fill" color="#f87171" width="14" height="14" />
      ),
   },
   confusing: {
      name: 'Confusing',
      icon: <Icon icon="bxs:confused" color="#facc15" width="14" height="14" />,
   },
   informative: {
      name: 'Informative',
      icon: (
         <Icon
            icon="ant-design:bulb-filled"
            color="#f9e076"
            width="14"
            height="14"
         />
      ),
   },
   well_written: {
      name: 'Well-written',
      icon: (
         <Icon
            icon="dashicons:welcome-write-blog"
            color="#f3eaaf"
            width="14"
            height="14"
         />
      ),
   },
   creative: {
      name: 'Creative',
      icon: <Icon icon="mdi:art" color="#9a7b4f" width="14" height="14" />,
   },
};

// export const miniorIcons = {
//    score: {
//       icon: (
//          <Icon icon="solar:star-bold" color="#676c75" width="14" height="14" />
//       ),
//    },
// };
