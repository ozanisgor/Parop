"use client";

import { NavPages } from "./NavPages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faSquareXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-20 text-primary-foreground text-sm font-medium transition-colors duration-300 ease-in-out`}
    >
      <div
        className={`${
          isScrolled ? "bg-primary" : "bg-transparent/40"
        } flex justify-between items-center mx-auto px-16 py-7 max-w-screen-2xl h-20`}
      >
        <div className="">Logo</div>
        <div className="flex items-center">
          <div>
            <NavPages />
          </div>
          <div>
            <svg
              width="1"
              height="20"
              viewBox="0 0 1 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.25"
                x2="0.25"
                y2="20"
                stroke="#E5E5E5"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <div className="px-4 py-2 flex items-center justify-center h-10 gap-4">
            <FontAwesomeIcon
              icon={faYoutube}
              size="lg"
              className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faSquareXTwitter}
              size="lg"
              className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
            />

            {/* to add beat animation */}
            {/* <FontAwesomeIcon icon={faYoutube} beatFade /> */}
          </div>
          <div>
            <svg
              width="1"
              height="20"
              viewBox="0 0 1 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.25"
                x2="0.25"
                y2="20"
                stroke="#E5E5E5"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <div className="pl-4 py-2 flex items-center justify-center h-10">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="lg"
              className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
