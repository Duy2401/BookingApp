import Navigation from "../../layout/components/Navigation";
import SubtitileBanner from "../../layout/components/SubtitleBanner/index";
import SearchHotel from "../../layout/components/Search/SearchHotel/SearchHotel";
function Home() {
  return (
    <div className="bg-backgroud">
      <Navigation />
      <SubtitileBanner
        className="text-6xl font-extrabold w-3/4"
        titleFirst="Địa điểm du lịch"
        titleSecond="địa điểm kế tiếp của bạn là chỗ nào? "
        titleThird="Tìm ưu đãi Genius đặc biệt tại khắp nơi trên thế giới!"
      />
      <SearchHotel />
    </div>
  );
}

export default Home;
