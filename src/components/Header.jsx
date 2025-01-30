import { BiMenu, BiX } from "react-icons/bi";
import { useState } from "react";
import { navItems } from "../constants";
import ApiTestReport from "./Report/ApiTestReport";

export default function Header() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    /*backdrop-blur-lg*/
    <nav className="w-full z-50 py-3 border-b border-neutral-700/80">
      <div className="container px-8 mx-auto  lg:text-sm">
        <div className="flex justify-between items-center">
          <a className="flex items-center flex-shrink-0" href="/">
            <img
              src="public\pwa-192x192.png"
              className="h-10 w-10 mr-2"
              alt="BiBook"
            />
            <span className="text-xl tracking-tight">knoWord</span>
          </a>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex  space-x-12 items-center">
            <a href="/sign-in" className="py-2 px-3 border rounded-md">
              Sign In
            </a>
            <ApiTestReport />
          </div>
          <div className="lg:hidden md:flex">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <BiX /> : <BiMenu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed left-0 z-20 bg-neutral-900 w-full p-12 flex flex-col items-center lg:hidden border-b border-neutral-700">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="/sign-in" className="py-2 px-3 border rounded-md">
                Sign In
              </a>
              <ApiTestReport />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
