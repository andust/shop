import Image from "next/image";

import Headline from "../../_atoms/Headline/Headline";
import { UnorderedList } from "../../_atoms/List/List";
import DiscountCouponForm from "../../_molecules/DiscountCouponForm/DiscountCouponForm";

import logo from "../../_assets/img/logo.webp";

export default () => (
  <footer className="bg-black relative top-[120px] pt-[400px]">
    <section className="bg-footer-top-bg bg-center bg-cover absolute top-[-170px] w-full h-full h-[460px]">
      <div className="flex h-full justify-end items-center">
        <div className="basis-8/12 text-center">
          <Headline level={3} isBold className="text-white">
            Get <span className="text-orange">20%</span> Off Discount Coupon
          </Headline>

          <p className="font-semibold text-lg text-white mb-9">
            by Subscibe our Newsletter
          </p>
          <DiscountCouponForm />
        </div>
      </div>
    </section>
    <div className="container text-white pb-12 flex justify-between">
      <div>
        <Image src={logo} alt="logo" />
        <UnorderedList
          listItem={["Track Order", "Delivery & Returns", "Warranty"]}
        />
      </div>
      <div>
        <Headline level={4}>About Us</Headline>
        <UnorderedList
          listItem={[
            "Rave’s Story",
            "Work With Us",
            "Coporate News",
            "Investors",
          ]}
        />
      </div>
      <div>
        <Headline level={4}>Useful Links</Headline>
        <UnorderedList
          listItem={[
            "Rave Story",
            "Work With Us",
            "Coporate News",
            "Investors",
          ]}
        />
      </div>
      <div>
        <Headline level={4}>Contact Info</Headline>
        <UnorderedList
          listItem={["Rave Story", "Work With Us", "Coporate News"]}
        />
      </div>
    </div>
  </footer>
);
