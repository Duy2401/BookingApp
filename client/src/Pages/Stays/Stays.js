import Navigation from "../../layout/components/Navigation";
import SubtitileBanner from "../../layout/components/SubtitleBanner/index";
import SearchHotel from "../../layout/components/Search/SearchHotel/SearchHotel";
function Stays() {
  return (
    <div className="bg-backgroud">
      <Navigation />
      <SubtitileBanner
        className="text-6xl font-black w-3/4"
        titleFirst="Tìm chỗ nghĩ tiếp theo"
        titleThird="Tìm ưu đãi khách sạn, chỗ nghĩ dạng nhà và nhiều hơn nữa ..."
      />
      <SearchHotel />
    </div>
  );
}

export default Stays;
