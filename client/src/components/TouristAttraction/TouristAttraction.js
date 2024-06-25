import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import provinces from "../../locales/provinces.json";

const TouristAttraction = ({ searchTerm, setSearchTerm }) => {
  const { t } = useTranslation();
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const filterSearchResults = () => {
      const filteredResults = provinces.filter((item) => {
        // Implement your search logic here
        // You can search by item properties, etc.
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResult(filteredResults);
    };

    filterSearchResults();
  }, [searchTerm, provinces]);
  return (
    <div className="absolute max-w-full min-w-mw_430 right-0 left-0 rounded top-14 shadow-box_shawdow_200 box-border font-Nunito">
      <div className="">
        <div className="p-3 text-base font-bold">
          {t("common.search.locationTrent")}
        </div>
        <ul className="overflow-hidden max-h-mh_288">
          {searchResult.map((item, index) => (
            <li
              key={index}
              className="hover:bg-color_highlighted_alt p-2 border-bder_1 border-solid border-border_color_2 cursor-pointer"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
                    />
                    <path
                      fill="currentColor"
                      d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
                    />
                  </svg>
                </span>
                <div className="text-base flex-auto">
                  <div className="text-base font-bold">{item.name}</div>
                  <div className="text-xs">Vietnam</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TouristAttraction;
