"use client";

import Image, { StaticImageData } from "next/image";

import S from "react-slick";

import { SLIDE_EFFECT_CLASSES } from "../../_constants/style";
import { leagueSpartan } from "../../_constants/font";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export interface CaruseleOption {
  head: string;
  text: string;
  buttonLink: string;
  image: StaticImageData;
}

export interface SliderProps {
  options: CaruseleOption[];
}

/**
 * Slider - organism because we use react-slick package
 * @returns JSX.Element
 */
const Slider = ({ options }: SliderProps) => (
  <S
    dots={true}
    adaptiveHeight={true}
    fade={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
  >
    {options.map(({ head, image, text }) => (
      <div
        key={text}
        className="min-h-[650px] !flex md:flex-row font-semibold flex-col-reverse items-center"
      >
        <div className="flex-1">
          <h3 className="text-4xl uppercase text-green mb-10">{head}</h3>
          <p className={`text-7xl ${leagueSpartan.className} font-bold mb-5`}>
            {text}
          </p>
          <a
            className={`py-4 px-7 bg-orange font-bold text-black ${SLIDE_EFFECT_CLASSES}`}
          >
            Shop Now
          </a>
        </div>
        <div className="md:w-[37rem] md:h-[37rem] content-center">
          <Image
            src={image}
            alt={text}
            className="m-auto h-full w-full object-contain"
          />
        </div>
      </div>
    ))}
  </S>
);

export default Slider;
