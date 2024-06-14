import { useTranslation } from "react-i18next";
import Button from "../../../components/Button/button";
const Navigation = () => {
  const { t } = useTranslation();
  return (
    <nav className="bg-backgroud px-9">
      <div className="flex items-center text-white h-16 mx-48">
        <Button
          className="flex p-3 text-base items-center bg-bgHover rounded-3xl"
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
          className="flex p-3 ml-3 text-base items-center hover:bg-bgHover rounded-3xl"
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M12.57 2.26c-.65.29-1.66.85-2.8 1.5L4.31 3a2.172 2.172 0 0 0-.916.064L2.209 3.4c-.1 0-.1.1 0 .14l4.56 2c-1.54.92-2.91 1.76-3.51 2.14a.858.858 0 0 1-.726.088L1.339 7.39a.864.864 0 0 0-.586.002l-.754.308l2.52 2.1a.879.879 0 0 0 .926.128C4.649 9.39 7.819 7.93 10.179 6.7c5.24-2.78 5.82-3.26 5.82-3.7c0-.69-2-1.4-3.43-.74zM0 13h16v1H0z"
              />
            </svg>
          }
        >
          {t("common.navigation.flights")}
        </Button>
        <Button
          className="flex p-3 ml-3 text-base items-center hover:bg-bgHover rounded-3xl"
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M24 6c-4.5 0-7 1.2-7 1.2V12l-3.529 3.529c-.593.593-.236 1.588.6 1.648c2.017.143 5.434.323 9.929.323c2.206 0 4.152-.043 5.8-.104h-.017a6 6 0 1 1-11.567 0q-1.111-.041-2.036-.09a8 8 0 1 0 15.64 0a113 113 0 0 0 2.109-.13c.836-.06 1.193-1.054.6-1.647L30.999 12V7.2S28.5 6 24 6m-5 6.828l-2.492 2.492c1.93.097 4.462.18 7.492.18s5.562-.083 7.492-.18L29 12.828V8.62l-.302-.08C27.656 8.276 26.07 8 24 8s-3.656.276-4.698.54q-.16.04-.302.08zM30.148 9.01l-.002-.002z" />
                <path d="m24.288 28.042l6.542 1.947l5.607-3.816A1 1 0 0 1 38 27v5h-2v-3.11l-4 2.722V40c0 .768.289 1.47.764 2H15.236c.475-.53.764-1.232.764-2v-8.465l-4-2.666V32h-2v-5a1 1 0 0 1 1.555-.832l5.696 3.797l6.46-1.923A1 1 0 0 1 24 28q.125 0 .247.031l.008.002zM25 30.341l5 1.488V40h-5zm-7 1.488l5-1.488V40h-5z" />
                <path d="M9 36a1 1 0 0 0-1 1v3h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm-3 1a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6zm33-1a1 1 0 0 1 1 1v3h-3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm3 1a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h5z" />
              </g>
            </svg>
          }
        >
          {t("common.navigation.tours")}
        </Button>
        <Button
          className="flex p-3 ml-3 text-base items-center hover:bg-bgHover rounded-3xl"
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
export default Navigation;
