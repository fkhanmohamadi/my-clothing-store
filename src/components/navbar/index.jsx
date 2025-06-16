import React from "react";
import { NavLink } from "react-router-dom";

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
        image: "/navbar/ManDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های مردانه",
        href: "#",
        image: "/navbar/ManBag.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های مردانه",
        href: "#",
        image: "/navbar/ManShoe.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های مردانه",
        href: "#",
        image: "/navbar/ManAccessories.webp",
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
        image: "/navbar/TeenagerDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های نوجوان",
        href: "#",
        image: "/navbar/TeenagerBag.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های نوجوان",
        href: "#",
        image: "/navbar/TeenagerShoe.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های نوجوان",
        href: "#",
        image: "/navbar/TeenagerAccessories.webp",
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
        image: "/navbar/KidDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های کودک",
        href: "#",
        image: "/navbar/KidBag.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های کودک",
        href: "#",
        image: "/navbar/KidShoe.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های کودک",
        href: "#",
        image: "/navbar/KidAccessories.avif",
      },
    ],
  },
  {
    name: "اسپرت",
    submenu: [
      {
        name: "لباس",
        description: "زیباترین  و با کیفیت ترین لباس های اسپرت",
        href: "#",
        image: "/navbar/SportDress.webp",
      },
      {
        name: "کیف",
        description: "زیباترین  و با کیفیت ترین کیف های اسپرت",
        href: "#",
        image: "/navbar/SportBag.webp",
      },
      {
        name: "کفش",
        description: "زیباترین  و با کیفیت ترین کفش های اسپرت",
        href: "#",
        image: "/navbar/SportShoe.webp",
      },
      {
        name: "اکسسوری",
        description: "زیباترین  و با کیفیت ترین اکسسوری های اسپرت",
        href: "#",
        image: "/navbar/SportAccessories.webp",
      },
    ],
  },
  {
    name: "برندها",
  },
  {
    name: "جدیدترین ها",
    submenu: [
      {
        name: "زنانه",
        description: "جدیدترین های زنانه",
        href: "#",
        image: "/navbar/WomanDress.webp",
      },
      {
        name: "مردانه",
        description: "جدیدترین های مردانه",
        href: "#",
        image: "/navbar/ManDress.webp",
      },
      {
        name: "نوجوان",
        description: "جدیدترین های نوجوان",
        href: "#",
        image: "/navbar/TeenagerDress.webp",
      },
      {
        name: "کودک",
        description: "جدیدترین های کودک",
        href: "#",
        image: "/navbar/KidDress.webp",
      },
    ],
  },
];

function Navbar({ isMenuHovered, setIsMenuHovered, isScrolled }) {
  return (
    <nav>
      {/* descktop navbar */}
      <div className="relative hidden lg:flex justify-center items-center">
        {/* <div className="hidden fixed w-screen h-screen z-0 top-48 "></div> */}
        <ul
          className={`w-fit flex justify-center gap-14 ${
            isScrolled ? "p-0 pb-2 -mt-6 " : "pt-6 pb-2"
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
              {item.submenu && (
                <div className="absolute left-0 right-0 top-full bg-white text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible ">
                  <div
                    className={`relative flex w-full border-t border-t-gray-300 transition-all duration-800 ease-in-out ${
                      isMenuHovered ? " translate-y-0" : " -translate-y-3"
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
                    {item.submenu.map((subItem, subIndex) => (
                      <div
                        className="basis-1/4 p-0 w-full max-w-1/4"
                        key={subIndex}
                      >
                        <NavLink
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
                    <NavLink
                      className="inline-block p-2 transition-all"
                      to={"/"}
                    >
                      <span className="p-1 text-gray-900 border-b border-black border-solid">
                        مشاهده همه محصولات
                      </span>
                    </NavLink>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
