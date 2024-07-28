import Image from "next/image";
import Link from "next/link";

import Button from "./_atoms/Button/Button";
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
import logo from "./_assets/img/logo.webp";
import Headline from "./_atoms/Headline/Headline";

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
          <Headline level={2} className="font-bold">Market Category</Headline>
          <a className="font-bold">View All</a>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <h5>Fruits</h5>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <h5>Fruits</h5>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <h5>Fruits</h5>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <h5>Fruits</h5>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <h5>Fruits</h5>
          </a>
          <a className="text-center">
            <div className="bg-emerald-200 p-8 rounded">
              <Image src={cImg1} alt="Fruits" width={80} className="m-auto" />
            </div>
            <h5>Fruits</h5>
          </a>
        </div>
      </section>
      <FadeWrapper>
        <section className="grid grid-cols-3 gap-4 container">
          <div className="bg-c-bg-img-1 bg-center bg-cover">
            <div className="p-4">
              <h5 className="uppercase text-sm mb-2">Fruits</h5>
              <h2 className="font-bold text-3xl mb-7">Health & Goods Fruits</h2>
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
              <h5 className="uppercase text-sm mb-2">VEGETABLE</h5>
              <h2 className="font-bold text-3xl mb-7">
                Frash & Goods Vegetable
              </h2>
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
              <h5 className="uppercase text-sm mb-2">Fruits</h5>
              <h2 className="font-bold text-3xl mb-7">Health & Goods Fruits</h2>
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
              <h2 className="text-5xl font-bold">Fresh Vegetables</h2>
              <Link href={"/products"} className="font-bold">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductBaseDisplay product={p} />
              ))}
            </div>
          </div>
        </section>
      </FadeWrapper>
      <footer className="bg-black relative top-[50px] pt-[400px]">
        <section className="bg-footer-top-bg bg-center bg-cover absolute top-[-100px] w-full h-full h-[460px]">
          <div className="flex h-full justify-end items-center">
            <div className="basis-8/12 text-center">
              <h4 className="text-3xl font-bold mb-4 text-white">
                Get <span className="text-orange">20%</span> Off Discount Coupon
              </h4>
              <p className="font-semibold text-lg text-white mb-9">
                by Subscibe our Newsletter
              </p>
              <form className="text-sm">
                <i className="icon-envelop relative text-slate-400 left-[30px]"></i>
                <input
                  className="w-[320px] pl-12 py-3 rounded-l"
                  placeholder="EMAIL ADDRESS"
                />
                <Button className="bg-orange py-3 px-6 rounded-r">
                  Get the Coupon
                </Button>
              </form>
            </div>
          </div>
        </section>
        <div className="container text-white pb-12 flex justify-between">
          <div>
            <Image src={logo} alt="logo" />
            <ul>
              <li>Track Order</li>
              <li>Delivery & Returns</li>
              <li>Warranty</li>
            </ul>
          </div>
          <div>
            <h3>About Us</h3>
            <ul>
              <li>Rave’s Story</li>
              <li>Work With Us</li>
              <li>Coporate News</li>
              <li>Investors</li>
            </ul>
          </div>
          <div>
            <h3>Useful Links</h3>
            <ul>
              <li>Rave’s Story</li>
              <li>Work With Us</li>
              <li>Coporate News</li>
              <li>Investors</li>
            </ul>
          </div>
          <div>
            <h3>Contact Info</h3>
            <ul>
              <li>Rave’s Story</li>
              <li>Work With Us</li>
              <li>Coporate News</li>
              <li>Investors</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
