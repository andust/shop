"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Select, { components } from "react-select";

import ProductByCategorySearchForm from "../../_molecules/ProductByCategorySearchForm/ProductByCategorySearchForm";
import { SLIDE_EFFECT_CLASSES } from "../../_constants/style";
import { Category } from "../../_models/category";

import cardIcon from "../../_assets/img/card.svg";
import heartIcon from "../../_assets/img/heart.svg";
import headerUserIcon from "../../_assets/img/header-user.svg";
import logo from "../../_assets/img/logo.webp";
import phoneIcon from "../../_assets/img/phone.svg";
import reloadIcon from "../../_assets/img/reload.svg";

import "./header.css";

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("http://localhost:7007/api/v1/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      });
  }, []);

  const options = categories.map(({ id, name, icon }) => ({
    value: id,
    label: name,
    icon,
  }));

  return (
    <header>
      <div className="bg-light-green border-b border-light-green py-3">
        <div className="flex justify-between text-sm container">
          <nav className="space-x-5">
            <Link href="/account">Account</Link>
            <Link href="/track-order">Track Order</Link>
            <Link href="/support">Support</Link>
          </nav>
          <div className="divide-x">
            <span className="pr-3">
              <Image
                priority
                src={phoneIcon}
                alt="phone"
                className="inline mr-2"
              />
              + 00645 4568
            </span>
            <span className="pl-3">Youremai@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="container flex justify-between py-5">
        <Image src={logo} alt="Logo" className="h-[33px]" />
        <ProductByCategorySearchForm options={options} />
        <div className="flex items-center gap-x-4">
          <Image src={reloadIcon} alt="Reload" />
          <Image src={heartIcon} alt="Heart" />
          <Image src={cardIcon} alt="Card" />
          <Image src={headerUserIcon} alt="User" />
        </div>
      </div>
      <div className="bg-green py-3">
        <div className="container flex justify-between">
          <div className="flex items-center">
            <Select
              placeholder="All categories"
              options={options}
              classNames={{
                control: () => "w-64 mr-12 py-2 px-3",
              }}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 0,
                  boxShadow: "none",
                }),
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "black",
                }),
              }}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <span className="icon-arrow-down text-icon-xs"></span>
                ),
                Control: ({ children, ...rest }) => (
                  <components.Control {...rest}>
                    <span className="icon-toggle text-xs"></span> {children}
                  </components.Control>
                ),
                Option: (props) => {
                  console.log(props);

                  return (
                    <div
                      {...props.innerProps}
                      className="flex items-center justify-between hover:bg-green hover:text-white hover:fill-white"
                    >
                      <div className="flex items-center ">
                        <span
                          className="w-4 m-3"
                          dangerouslySetInnerHTML={{ __html: props.data.icon }}
                        />{" "}
                        <span className="group-hover:color-green">
                          {props.data.label}
                        </span>
                      </div>
                      <span className="icon-arrow-right text-xs right mr-3"></span>
                    </div>
                  );
                },
              }}
            />
            <nav>
              <ul className="flex gap-10 text-white typography-heading3">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products">Shop +</Link>
                </li>
                <li>Pages +</li>
                <li>About</li>
                <li>Blog</li>
                <li>User Dashboard</li>
              </ul>
            </nav>
          </div>
          <a
            className={`py-4 px-7 bg-orange font-bold text-black ${SLIDE_EFFECT_CLASSES}`}
          >
            Seller Login
          </a>
        </div>
      </div>
    </header>
  );
}
