import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function SliderNavigation () {
    const swiper = useSwiper();

    return (
      <>
        <button onClick={() => swiper.slidePrev()} className="absolute bg-grandient-to-r from-gray-100 to-transparent  z-10 left-0 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center"> 
          <ChevronLeftIcon className="w-6 h-6 text-gray-800"  />

        </button>
        <button onClick={() => swiper.slideNext()} className="absolute bg-grandient-to-l from-gray-100 to-transparent z-10 right-0 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center">
          <ChevronRightIcon className="w-6 h-6 text-gray-800"  />
        </button>

      </>
    )
}