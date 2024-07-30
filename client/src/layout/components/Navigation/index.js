import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Button from "../../../components/Button/button";
const Navigations = () => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <nav className="bg-backgroud px-9">
      <div className="flex items-center text-white h-16 mx-44 font-Nunito">
        <Button
          href="/"
          className={
            location.pathname === "/" && "/stays/searchresults"
              ? "flex p-3 text-base items-center bg-bgHover rounded-3xl hover:bg-bgHover"
              : "flex p-3 text-base items-center rounded-3xl hover:bg-bgHover"
          }
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="currentColor"
                d="M2048 1152v768h-128v-128H128v128H0v-768h128v113l256-512V128h128v128h1024V128h128v384q27 0 50 10t40 27t28 41t10 50v256q0 39-21 70l149 299v-113zm-896-512v256h512V640zM512 384v384h512V640q0-27 10-50t27-40t41-28t50-10h384V384zm-248 896h1520l-128-256h-504q-27 0-50-10t-40-27t-28-41t-10-50H455zm1656 384v-256H128v256z"
              />
            </svg>
          }
        >
          {t("common.navigation.stays")}
        </Button>

        <Button
          href="/partner"
          className={
            location.pathname === "/partner"
              ? "flex p-3 ml-3 text-base items-center hover:bg-bgHover  bg-bgHover rounded-3xl"
              : "flex p-3 ml-3 text-base items-center hover:bg-bgHover rounded-3xl"
          }
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-1.26-1.25-2.71-.68-3.42 0L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59v4l-.71.7c-1.25 1.26-.68 2.71 0 3.42l3 3c.54.54 1.12.74 1.67.74c.71 0 1.36-.35 1.75-.74l2.7-2.71H15c1.7 0 2.56-1.06 2.87-2.1c1.13-.3 1.75-1.16 2-2C21.42 14.5 22 13.03 22 12V9h-.59zM20 12c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-4.41l-3.28 3.28c-.31.29-.49.12-.6.01l-2.99-2.98c-.29-.31-.12-.49-.01-.6L5 15.41v-4l2-2V11c0 1.21.8 3 3 3s3-1.79 3-3h7zm.29-4.71L18.59 9H11v2c0 .45-.19 1-1 1s-1-.55-1-1V8c0-.46.17-2 2-2h3.41l2.28-2.28c.31-.29.49-.12.6-.01l2.99 2.98c.29.31.12.49.01.6"
              />
            </svg>
          }
        >
          {t("common.navigation.partners")}
        </Button>
      </div>
    </nav>
  );
};
export default Navigations;
