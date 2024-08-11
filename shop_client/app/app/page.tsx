import Image from "next/image";
import Link from "next/link";

import FadeWrapper from "./_atoms/FadeWrapper/FadeWrapper";
import HeroServices from "./_molecules/HeroServices/HeroServices";
import ProductBaseDisplay from "./_molecules/ProductBaseDisplay/ProductBaseDisplay";
import Slider from "./_organisms/Slider/Slider";

import { FilterResponse } from "./types";
import { SLIDE_EFFECT_CLASSES } from "./_constants/style";
import { Product } from "./_models/product";

import cImg1 from "./_assets/img/c-img-1.webp";
import cShopImg1 from "./_assets/img/c-shop-img-1.webp";
import cShopImg2 from "./_assets/img/c-shop-img-2.webp";
import cShopImg3 from "./_assets/img/c-shop-img-3.webp";
import image1 from "./_assets/img/hero-img-1.webp";
import image2 from "./_assets/img/hero-img-2.webp";
import image3 from "./_assets/img/hero-img-3.webp";
import Headline from "./_atoms/Headline/Headline";
import Footer from "./_organisms/Footer/Footer";

const SLIDER_OPTIONS = [
  {
    head: "Fresh grocery1",
    text: "There's you can Buy your all of Grocery Products.",
    buttonLink: "/example1",
    image: image1,
  },
  {
    head: "Fresh grocery2",
    text: "We Provide Fresh and Organic Fruits To Your Door.2",
    buttonLink: "/example2",
    image: image2,
  },
  {
    head: "Fresh grocery3",
    text: "We Provide Fresh and Organic Fruits To Your Door.3",
    buttonLink: "/example3",
    image: image3,
  },
];

export default async function Home() {
  let products: Product[] = [];
  try {
    const res = await fetch(
      "http://shop_catalog_service:7007/api/v1/products?l=4",
    );
    const productsResponse: FilterResponse<Product> = await res.json();
    products = productsResponse.results;
  } catch (error) {
    console.warn(error);
  }

  return (
    <div className="space-y-[4rem]">
      <div className="bg-hero-pattern bg-center bg-cover">
        <div className="container">
          <Slider options={SLIDER_OPTIONS} />
          <HeroServices />
        </div>
      </div>
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <Headline level={2} isBold>
            Market Category
          </Headline>
          <a className="font-bold">View All</a>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <Headline level={5}>Fruits</Headline>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <Headline level={5}>Fruits</Headline>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <Headline level={5}>Fruits</Headline>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <Headline level={5}>Fruits</Headline>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <Headline level={5}>Fruits</Headline>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <Headline level={5}>Fruits</Headline>
          </a>
        </div>
      </section>
      <FadeWrapper>
        <section className="grid grid-cols-3 gap-4 container">
          <div className="bg-c-bg-img-1 bg-center bg-cover">
            <div className="p-4">
              <Headline level={5} className="uppercase text-sm mb-2">
                Fruits
              </Headline>
              <Headline level={2} isBold className="mb-7">
                Health & Goods Fruits
              </Headline>
              <a
                className={`bg-green p-3 text-white group ${SLIDE_EFFECT_CLASSES}`}
              >
                Shop Now{" "}
                <span className="icon-arrow-right transition-all duration-300 group-hover:translate-x-1 inline-block"></span>
              </a>
            </div>
            <Image src={cShopImg1} alt="Health & Goods Fruits" />
          </div>
          <div className="bg-c-bg-img-2 bg-center bg-cover">
            <Image src={cShopImg2} alt="Health & Goods Fruits" />
            <div className="p-4">
              <Headline level={5} className="uppercase mb-2">
                VEGETABLE
              </Headline>
              <Headline level={2} isBold className="mb-7">
                Frash & Goods Vegetable
              </Headline>
              <a
                className={`bg-red p-3 text-white group ${SLIDE_EFFECT_CLASSES}`}
              >
                Shop Now{" "}
                <span className="icon-arrow-right transition-all duration-300 group-hover:translate-x-1 inline-block"></span>
              </a>
            </div>
          </div>
          <div className="bg-c-bg-img-3 bg-center bg-cover">
            <div className="p-4">
              <Headline level={5} className="uppercase mb-2">
                Fruits
              </Headline>
              <Headline level={2} isBold className="mb-7">
                Health & Goods Fruits
              </Headline>
              <a
                className={`bg-purple p-3 text-white group ${SLIDE_EFFECT_CLASSES}`}
              >
                Shop Now{" "}
                <span className="icon-arrow-right transition-all duration-300 group-hover:translate-x-1 inline-block"></span>
              </a>
            </div>
            <Image src={cShopImg3} alt="Health & Goods Fruits" />
          </div>
        </section>
      </FadeWrapper>
      <FadeWrapper>
        <section className="bg-hero-pattern bg-center bg-cover">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <Headline level={2} isBold>
                Fresh Vegetables
              </Headline>
              <Link href={"/products"} className="font-bold">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {products.map((p) => <ProductBaseDisplay product={p} />)}
            </div>
          </div>
        </section>
      </FadeWrapper>
      <Footer />
    </div>
  );
}
