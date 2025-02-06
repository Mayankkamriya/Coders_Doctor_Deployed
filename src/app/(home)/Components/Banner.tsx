import React from 'react';
import Image from 'next/image';
// import PaperBg from '../../public/paper-bg.png';
// import BookImage from '../../../../public/about_image.png';
import header_img from '../../../../public/header_img.png';
const Banner = () => {
        return (
        <div className="mx-auto max-w-7xl px-5 py-10">
            <div className="relative">
                <Image
                    src={'/paper-bg.png'} // Second way of use image without any other import syntex
                    alt="billboard"
                    className="h-72 w-full rounded-lg"
                    height={0}
                    width={0}
                    sizes="100vw"
                />
                <div className="absolute inset-0 h-full w-full rounded-lg bg-gray-950 opacity-30" />
                <Image
                    src={header_img}
                    alt="billboard"
                    className="absolute bottom-0 right-5"
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{ width: 'auto', height: '18rem' }}
                />
                <h3 className="absolute left-10 top-1/2 w-full max-w-3xl -translate-y-1/2 text-5xl font-semibold tracking-tight text-white">
                    {/* Connect, Share and Trade Your Favourite Reads... */}
                    Your Health, Your Priority <br /> Book Checkups with Ease!
                </h3>
            </div>
        </div>
    );
};
export default Banner;

// below code is just the update the ui/ux in mobile also 
// import React from 'react';
// import Image from 'next/image';
// import header_img from '../../../../public/header_img.png';

// const Banner = () => {
//     return (
//         <div className="mx-auto max-w-7xl px-5 py-10">
//             {/* Large Screen Layout */}
//             <div className="relative hidden md:block">
//                 <Image
//                     src={'/paper-bg.png'}
//                     alt="billboard"
//                     className="h-72 w-full rounded-lg"
//                     height={0}
//                     width={0}
//                     sizes="100vw"
//                 />
//                 <div className="absolute inset-0 h-full w-full rounded-lg bg-gray-950 opacity-30" />
//                 <Image
//                     src={header_img}
//                     alt="billboard"
//                     className="absolute bottom-0 right-5"
//                     height={0}
//                     width={0}
//                     sizes="100vw"
//                     style={{ width: 'auto', height: '18rem' }}
//                 />
//                 <h3 className="absolute left-10 top-1/2 w-full max-w-3xl -translate-y-1/2 text-5xl font-semibold tracking-tight text-white">
//                     Your Health, Your Priority <br /> Book Checkups with Ease!
//                 </h3>
//             </div>

//             {/* Mobile Layout */}
//             <div className="relative md:hidden w-full flex justify-center">
//                 {/* Paper Background */}
//                 <Image
//                     src={'/paper-bg.png'}
//                     alt="paper background"
//                     className="w-full rounded-lg"
//                     height={0}
//                     width={0}
//                     sizes="100vw"
//                 />
                
//                 {/* Text & Header Image inside Paper Image */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
//                     <h3 className="text-center text-2xl font-semibold tracking-tight text-white px-4">
//                         Your Health, Your Priority <br /> Book Checkups with Ease!
//                     </h3>
//                     <Image
//                         src={header_img}
//                         alt="header image"
//                         className="w-2/4"
//                         height={0}
//                         width={0}
//                         sizes="100vw"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Banner;