import Navigation from "../../layout/components/Navigation";
import SearchFlight from "../../layout/components/Search/SearchFlight/SearchFlight";
import SubtitileBanner from "../../layout/components/SubtitleBanner";

function Flights() {
  return (
    <div className="bg-backgroud">
      <Navigation />
      <SubtitileBanner
        className="text-6xl font-extrabold w-3/4"
        titleFirst="Địa điểm du lịch"
        titleSecond="địa điểm kế tiếp của bạn là chỗ nào? "
        titleThird="Tìm ưu đãi Genius đặc biệt tại khắp nơi trên thế giới!"
      />
      <SearchFlight />
    </div>
  );
}
export default Flights;
