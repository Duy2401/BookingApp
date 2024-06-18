import Navigation from "../../layout/components/Navigation";
import SearchTour from "../../layout/components/Search/SearchTour/SearchTour";
import SubtitileBanner from "../../layout/components/SubtitleBanner";

function Attractions() {
  return (
    <div className="bg-backgroud">
      <Navigation />
      <SubtitileBanner
        className="text-6xl font-extrabold w-3/4"
        titleFirst="Địa điểm tham quan,hoạt động và trải nghiệm"
        titleThird="Khám phá các hoạt động và điểm tham quan theo sở thích và gu du lịch của bạn"
      />
      <SearchTour />
    </div>
  );
}
export default Attractions;
