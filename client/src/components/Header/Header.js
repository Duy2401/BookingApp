import { useState } from "react";
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";
import { locales } from "../../i18n/i18n";

function Header() {
  const { t, i18n } = useTranslation();
  const currentLanguage = locales[i18n.language];

  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handletoggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <header className="bg-backgroud h-36 px-9 pt-2">
      <div className="flex items-center text-white h-16 mx-20 p-">
        <div className="logo flex-grow">
          <p className="font-Nunito font-bold text-3xl">Booking.com</p>
        </div>
        <div className="flex items-center ">
          <div className="language px-3 relative">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-black bg-white p-2   shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              aria-expanded="true"
              aria-haspopup="true"
              data-dropdown-toggle="dropdown"
              onClick={handletoggleDropdown}
            >
              {currentLanguage}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    onClick={() => changeLanguage("vi")}
                  >
                    Tiếng Việt
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    onClick={() => changeLanguage("en")}
                  >
                    English
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="contact px-3">
            <button className="inline align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path d="M12 13.496c0-2.003 2-1.503 2-3.506c0-2.659-4-2.659-4 0m2 6.007v-.5" />
                  <circle cx="12" cy="12" r="9" />
                </g>
              </svg>
            </button>
          </div>
          <div className="Login px-3">
            <button className="bg-white text-black p-2 mr-5 rounded">
              <span>{t("common.button.signin")}</span>
            </button>
            <button className="bg-white text-black p-2 rounded">
              <span>{t("common.button.register")}</span>
            </button>
          </div>
        </div>
      </div>
      <Search />
    </header>
  );
}
export default Header;
