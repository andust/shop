import Image from "next/image";

import shippingIcon from "../../_assets/img/shipping.svg";
import reload2Icon from "../../_assets/img/reload2.svg";
import shieldIcon from "../../_assets/img/shield.svg";
import trophyIcon from "../../_assets/img/trophy.svg";

const HeroServices = () => (
  <section className="bg-green p-6 mt-12 rounded text-white flex justify-between">
    <div className="flex items-center">
      <Image src={shippingIcon} alt="Free shipping" className="mr-5" />
      <div>
        <h4>Free Shipping</h4>
        <p>When ordering over $100</p>
      </div>
    </div>
    <div className="flex items-center">
      <Image src={reload2Icon} alt="Free shipping" className="mr-5" />
      <div>
        <h4>Free Shipping</h4>
        <p>When ordering over $100</p>
      </div>
    </div>
    <div className="flex items-center">
      <Image src={shieldIcon} alt="Free shipping" className="mr-5" />
      <div>
        <h4>Free Shipping</h4>
        <p>When ordering over $100</p>
      </div>
    </div>
    <div className="flex items-center">
      <Image src={trophyIcon} alt="Free shipping" className="mr-5" />
      <div>
        <h4>Free Shipping</h4>
        <p>When ordering over $100</p>
      </div>
    </div>
  </section>
);

export default HeroServices;
