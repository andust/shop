"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Select, { components } from "react-select";

import Badge from "../../_atoms/badge/Badge";
import ProductByCategorySearchForm from "../../_molecules/product-by-category-search-form/ProductByCategorySearchForm";

import { BasketContext } from "../../_context/basketContext";
import { SLIDE_EFFECT_CLASSES } from "../../_constants/style";

import cardIcon from "../../_assets/img/card.svg";
import headerUserIcon from "../../_assets/img/header-user.svg";
import logo from "../../_assets/img/logo.webp";

import { Category } from "../../_models/category";

import "./header.css";

export default function Header() {
  const { products } = useContext(BasketContext);
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Array.from(formData.entries())
      .map(([k, v]) => [k, v.toString().trim()])
      .filter(([_, v]) => v) as string[][];
    const queryString = new URLSearchParams(data).toString();
    if (queryString) {
      router.push(`/products?${queryString}`);
    }
  };

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
                <i className="icon-phone1 text-green pr-1"></i>+ 00645 4568
              </span>
              <span className="pl-3">Youremai@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="container flex justify-between py-5">
          <Image src={logo} alt="Logo" className="h-[33px]" />
          <ProductByCategorySearchForm
            options={options}
            onSubmitHandler={onSubmitHandler}
            searchDefaultValue={searchParams.get("product") ?? undefined}
            selectDefaultValue={searchParams.get("category") ?? undefined}
          />
          <div className="flex items-center gap-x-4">
            <i className="icon-spinner9"></i>
            <i className="icon-heart"></i>
            <Badge number={products.length}>
              <Image src={cardIcon} className="max-w-none" alt="Card" />
            </Badge>
            <Link href="/account" className="text-black"><Image className="max-w-none" src={headerUserIcon} alt="User" /></Link>
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
                    <span className="icon-arrow-down2 text-sm"></span>
                  ),
                  Control: ({ children, ...rest }) => (
                    <components.Control {...rest}>
                      <span className="icon-toggle text-xs"></span> {children}
                    </components.Control>
                  ),
                  Option: (props) => {
                    return (
                      <div
                        {...props.innerProps}
                        className="flex items-center justify-between hover:bg-green hover:text-white hover:fill-white"
                      >
                        <div className="flex items-center ">
                          <span className={`w-4 m-3 ${props.data.icon}`} />{" "}
                          <span className="group-hover:color-green">
                            {props.data.label}
                          </span>
                        </div>
                        <span className="icon-arrow-right2 text-xs right mr-3"></span>
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
            <Link
              className={`py-4 px-7 bg-orange font-bold text-black ${SLIDE_EFFECT_CLASSES}`}
              href="/auth/login"
            >
              Seller Login
            </Link>
          </div>
        </div>
      </header>
  );
}
