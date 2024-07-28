"use client";
import Image, { StaticImageData } from "next/image";

import S from "react-slick";

import { SLIDE_EFFECT_CLASSES } from "../../_constants/style";
import { leagueSpartan } from "../../_utils/fonts";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const caruseleOptions = [
//   {
//     head: "Fresh grocery1",
//     text: "There's you can Buy your all of Grocery Products.",
//     buttonLink: "/example1",
//     image: image1,
//   },
//   {
//     head: "Fresh grocery2",
//     text: "We Provide Fresh and Organic Fruits To Your Door.2",
//     buttonLink: "/example2",
//     image: image2,
//   },
//   {
//     head: "Fresh grocery3",
//     text: "We Provide Fresh and Organic Fruits To Your Door.3",
//     buttonLink: "/example3",
//     image: image3,
//   },
// ];

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
const Slider = ({options} : SliderProps) => (
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
