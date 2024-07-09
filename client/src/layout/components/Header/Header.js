import { useState } from "react";
import { useTranslation } from "react-i18next";
import { locales } from "../../../i18n/i18n";
import SvgIcon from "../../../components/SvgIcon/SvgIcon";
import Button from "../../../components/Button/button";
import { UserProfile } from "./userProfile/userProfile";
import { ReactComponent as Question } from "../../../assets/icons/Question.svg";
import { ReactComponent as Notification } from "../../../assets/icons/Notification.svg";
import VNflag from "../../../assets/images/VN.png";
import USAflag from "../../../assets/images/USA.png";
function Header() {
  const use = false;
  const { t, i18n } = useTranslation();
  const currentLanguage = locales[i18n.language];

  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(!isOpen);
  };

  const handletoggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <header className="px-9 pt-2 bg-backgroud">
      <div className="flex items-center text-white h-h_48 mx-48 font-Nunito">
        <div className="logo flex-grow">
          <Button href="/" className="font-Nunito font-bold text-3xl">
            Booking.com
          </Button>
        </div>
        <div className="flex items-center h-full">
          <div className="language px-3 relative h-full">
            <Button
              className="hover:bg-bgHover h-full flex items-center min-w-28 w-full text-base justify-center rounded-md  p-2  ring-inset"
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M.034 16.668C.388 25.179 7.403 32 16 32s15.612-6.821 15.966-15.332A.493.493 0 0 0 32 16.5c0-.036-.013-.067-.02-.1c.003-.134.02-.265.02-.4c0-8.822-7.178-16-16-16S0 7.178 0 16c0 .135.017.266.02.4c-.007.033-.02.064-.02.1c0 .06.015.115.034.168m24.887 6.074a21.921 21.921 0 0 0-4.215-1.271c.158-1.453.251-2.962.28-4.47h4.98c-.091 2.054-.456 3.993-1.045 5.741M26.965 17h3.984a14.885 14.885 0 0 1-2.663 7.579a17.158 17.158 0 0 0-2.457-1.44c.645-1.869 1.042-3.943 1.136-6.139m-14.576 5.286A23.416 23.416 0 0 1 16 22c1.224 0 2.433.102 3.61.286C18.916 27.621 17.4 31 16 31s-2.916-3.379-3.611-8.714m1.519 8.378c-2.751-.882-5.078-3.471-6.482-6.984a20.873 20.873 0 0 1 3.99-1.217c.459 3.496 1.298 6.542 2.492 8.201m-1.634-19.955A24.43 24.43 0 0 0 16 11a24.43 24.43 0 0 0 3.726-.291c.172 1.62.274 3.388.274 5.291h-8c0-1.903.102-3.671.274-5.291M19.985 17a49.022 49.022 0 0 1-.26 4.291A24.397 24.397 0 0 0 16 21a24.42 24.42 0 0 0-3.726.291a48.668 48.668 0 0 1-.26-4.291zm.6 5.463c1.404.282 2.743.692 3.99 1.217c-1.404 3.513-3.731 6.102-6.482 6.984c1.193-1.659 2.032-4.705 2.492-8.201M21 16c0-1.836-.102-3.696-.294-5.47c1.48-.292 2.896-.72 4.215-1.271C25.605 11.288 26 13.574 26 16zm-.415-6.463c-.46-3.496-1.298-6.543-2.493-8.201c2.751.882 5.078 3.471 6.482 6.984a20.792 20.792 0 0 1-3.989 1.217m-.974.177C18.433 9.898 17.224 10 16 10s-2.433-.102-3.611-.286C13.084 4.379 14.6 1 16 1c1.4 0 2.916 3.379 3.611 8.714m-8.196-.177a20.895 20.895 0 0 1-3.99-1.217c1.404-3.513 3.731-6.102 6.482-6.984c-1.193 1.659-2.032 4.705-2.492 8.201m-.121.993A51.315 51.315 0 0 0 11 16H6c0-2.426.395-4.712 1.079-6.742c1.319.552 2.735.979 4.215 1.272m-.28 6.47c.029 1.508.122 3.017.28 4.471c-1.48.292-2.896.72-4.215 1.271c-.589-1.748-.954-3.687-1.045-5.742zM6.17 23.139a17.24 17.24 0 0 0-2.456 1.44A14.882 14.882 0 0 1 1.051 17h3.984c.094 2.196.491 4.27 1.135 6.139M4.313 25.38a16.126 16.126 0 0 1 2.207-1.305c1.004 2.485 2.449 4.548 4.186 5.943a15.05 15.05 0 0 1-6.393-4.638m16.981 4.637c1.738-1.394 3.182-3.458 4.186-5.943c.79.384 1.522.826 2.207 1.305a15.033 15.033 0 0 1-6.393 4.638M27 16c0-2.567-.428-4.987-1.17-7.139c.88-.422 1.698-.907 2.457-1.44A14.91 14.91 0 0 1 31 16zm.688-9.38c-.685.479-1.417.921-2.207 1.305c-1.004-2.485-2.449-4.549-4.186-5.943a15.062 15.062 0 0 1 6.393 4.638M10.706 1.983C8.968 3.377 7.524 5.441 6.52 7.926A16.173 16.173 0 0 1 4.313 6.62a15.04 15.04 0 0 1 6.393-4.637M3.714 7.421a17.185 17.185 0 0 0 2.456 1.44A21.954 21.954 0 0 0 5 16H1c0-3.19 1.009-6.145 2.714-8.579"
                  />
                </svg>
              }
              rightIcon={
                <svg
                  className="h-5 w-5 text-gray-400"
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
              }
              onClick={handletoggleDropdown}
            >
              {currentLanguage}
            </Button>

            {isOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <div className="flex items-center p-2">
                    <img className="w-6 h-6" alt="flag error" src={VNflag} />
                    <Button
                      className=" px-4 py-2 text-base text-gray-700"
                      onClick={() => changeLanguage("vi")}
                    >
                      Tiếng Việt
                    </Button>
                  </div>
                  <div className="flex items-center p-2">
                    <img className="w-6 h-6" src={USAflag} alt="flag error" />
                    <Button
                      className=" px-4 py-2 text-base text-gray-700"
                      onClick={() => changeLanguage("en")}
                    >
                      English
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="h-full flex items-center contact px-3 rounded hover:bg-bgHover cursor-pointer">
            <SvgIcon icon={Question} width={20} height={20} fill="#000" />
          </div>

          {use && (
            <>
              <div className=" mx-1 h-full flex items-center contact px-3 rounded hover:bg-bgHover cursor-pointer">
                <SvgIcon
                  icon={Notification}
                  width={20}
                  height={20}
                  fill="#000"
                />
              </div>
              <div className="px-3 h-full">
                <UserProfile />
              </div>
            </>
          )}
          {!use && (
            <div className="Login px-3 flex h-full">
              <Button
                href="/sign-in"
                className="flex items-center hover:bg-bgHover text-base min-w-24 px-2 rounded h-full"
              >
                {t("common.button.signin")}
              </Button>
              <Button
                href="/register"
                className="flex items-center hover:bg-bgHover text-base min-w-24 px-2 ml-2 rounded h-full"
              >
                {t("common.button.register")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
