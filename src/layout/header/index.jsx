import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, NavLink } from "react-router-dom";
import {
  HiOutlineArrowLeftEndOnRectangle,
  HiOutlineMoon,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import {
  IoLanguageOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const navbar = [
  {
    name: "زنانه",
    submenu: [
      {
        name: "لباس",
        description: "زیباترین  و با کیفیت ترین لباس های زنانه",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های زنانه",
        href: "#",
        image: "/navbar/WomanBag.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های زنانه",
        href: "#",
        image: "/navbar/WomanShoe.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های زنانه",
        href: "#",
        image: "/navbar/WomanAccessories.webp",
      },
    ],
  },
  {
    name: "مردانه",
    submenu: [
      {
        name: "لباس",
        description: "زیباترین  و با کیفیت ترین لباس های مردانه",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های مردانه",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های مردانه",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های مردانه",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
    ],
  },
  {
    name: "نوجوان",
    submenu: [
      {
        name: "لباس",
        description: "زیباترین  و با کیفیت ترین لباس های نوجوان",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های نوجوان",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های نوجوان",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های نوجوان",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
    ],
  },
  {
    name: "کودک",
    submenu: [
      {
        name: "لباس",
        description: "زیباترین  و با کیفیت ترین لباس های کودک",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های کودک",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های کودک",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های کودک",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
    ],
  },
  {
    name: "اسپرت",
    submenu: [
      {
        name: "زنامه",
        description: "زیباترین  و با کیفیت ترین لباس های اسپرت",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های اسپرت",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های اسپرت",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های اسپرت",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
    ],
  },
  {
    name: "برندها",
    submenu: [
      {
        name: "لباس",
        description: "با کیفیت تیرن برندهای لباس",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کیف",
        description: "با کیفیت ترین برندهای  کیف",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کفش",
        description: "با کیفیت ترین برندهای کفش",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "اکسسوری",
        description: "با کیفیت ترین برندهای اکسسوری های",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
    ],
  },
  {
    name: "جدیدترین ها",
    submenu: [
      {
        name: "لباس",
        description: "زیباترین  و با کیفیت ترین لباس ها",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف ها",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش ها",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری ها",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Headre() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 ${
        isMenuHovered || isScrolled
          ? "bg-white border-b border-gray-300 text-black"
          : "bg-transparent text-white"
      }`}
    >
      {/* top header */}
      <div className="flex justify-between px-4 pt-3 pb-0">
        {/* top header right */}
        <div>
          <ul className="flex justify-between gap-4">
            <li>
              <NavLink to={""}>
                <span>
                  <HiOutlineShoppingBag className=" h-5 w-5" />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to={""}>
                <span>
                  <MdOutlineFavoriteBorder className=" h-5 w-5" />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to={""}>
                <span>
                  <IoSearchOutline className="h-5 w-5" />
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* top header left */}
        <div>
          <ul className="flex justify-between gap-4">
            <li>
              <NavLink to={""}>
                <span>
                  <IoLocationOutline className=" h-5 w-5" />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to={""}>
                <span>
                  <IoLanguageOutline className=" h-5 w-5" />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to={""}>
                <span>
                  <HiOutlineMoon className=" h-5 w-5" />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to={""}>
                <span>
                  <HiOutlineArrowLeftEndOnRectangle className="h-5 w-5" />
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* logo */}
      {!isScrolled ? (
        <div>
          <h1 className="block text-center mb-1  leading-0">
            <NavLink className="inline-block -mt-5" to={""}>
              <img
                className="h-20 w-28"
                src={`${
                  isMenuHovered
                    ? "../public/FayraLogoB.png"
                    : "../public/FayraLogoW.png"
                }`}
                alt="Logo"
              />
            </NavLink>
          </h1>
        </div>
      ) : (
        ""
      )}

      {/* navbar */}
      <nav>
        {/* descktop navbar */}
        <div className="relative flex justify-center items-center">
          {/* <div className="hidden fixed w-screen h-screen z-0 top-48 "></div> */}
          <ul
            className={`w-fit flex justify-center gap-14 ${
              isScrolled ? "p-0 mt-0 -mt-6 " : "pt-6 pb-2"
            }`}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
          >
            {navbar.map((item, index) => (
              <li key={index} className="h-fit group">
                <NavLink className="block cursor-pointer" to={""}>
                  {item.name}
                </NavLink>
                {/* sub menu */}
                <div className="absolute left-0 right-0 top-full bg-white text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible ">
                  <div
                    className={`relative flex w-full border-t border-t-gray-300 transition-all duration-800 ease-in-out ${
                      isMenuHovered ? " translate-y-0" : " -translate-y-3"
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
                    {/* Dress */}
                    {item.submenu.map((subItem, subIndex) => (
                      <div className="basis-1/4 p-0 w-full max-w-1/4">
                        <NavLink
                          key={subIndex}
                          className="block relative bg-transparent decoration-0 cursor-pointer "
                          to={subItem.href}
                        >
                          <img
                            className="w-full h-96 object-cover"
                            src={subItem.image}
                            alt=""
                          />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50">
                            <span className="block text-white text-lg">
                              {subItem.name}
                            </span>
                            <span className="block w-20 h-[2px] bg-white mt-2 mx-auto" />
                          </div>
                        </NavLink>
                      </div>
                    ))}
                  </div>
                  <div className="block w-full p-4 border-y border-gray-300 border-solid text-center">
                    <NavLink className="inline-block p-2 transition-all">
                      <span className="p-1 text-gray-900 border-b border-black border-solid">
                        مشاهده همه محصولات
                      </span>
                    </NavLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* mobile navbar */}
        <div></div>
      </nav>
    </header>
  );
}

export default Headre;
