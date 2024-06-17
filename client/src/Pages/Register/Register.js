import Navigation from "../../layout/components/Navigation";
import SubtitileBanner from "../../layout/components/SubtitleBanner";
import SearchFlight from "../../layout/components/Search/SearchFlight/SearchFlight";
function Register() {
  return (
    <div className="bg-backgroud">
      <Navigation />
      <SubtitileBanner
        className="text-5xl font-extrabold w-3/4"
        titleFirst="Địa điểm tham quan, hoạt động và trải nghiệm"
        titleThird="Khám phá các hoạt động và địa điểm tham quan mới theo sở thích và gu du lịch của bạn"
      />
      <SearchFlight />
    </div>
  );
}

export default Register;
