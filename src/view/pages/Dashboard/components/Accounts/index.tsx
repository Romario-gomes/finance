import 'swiper/swiper.css';
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderNavitagion } from "./SliderNavigation";
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { useAccountsController } from './useAccountsController';

export function Accounts() {
  const { sliderState, setSliderState, windowWidth } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col ">
      <div>
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">R$100,00</strong>
          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        <div>
          <Swiper
          spaceBetween={16}
          slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
          onSlideChange={swiper => {
            console.log("state ",swiper.isEnd);
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            })
          }}
        >
          <div slot="container-start" className="flex items-center justify-between  mb-4">
            <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
            <SliderNavitagion isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd}/>
          </div>
            <SwiperSlide><AccountCard color="#7950F2" type="CASH" name="Nubank" balance={1000.23} /></SwiperSlide>
            <SwiperSlide><AccountCard color="#7950F2" type="INVESTMENT" name="XP" balance={1000.23} /></SwiperSlide>
            <SwiperSlide><AccountCard color="#0f0" type="CASH" name="Carteira" balance={1000.23} /></SwiperSlide>
        </Swiper>
        </div>
      </div>

    </div>
  )
}