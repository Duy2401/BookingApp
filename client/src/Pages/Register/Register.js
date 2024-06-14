import Navigation from "../../layout/components/Navigation";
import Search from "../../layout/components/Search/Search";
import SubtitileBanner from "../../layout/components/SubtitleBanner";

function Register() {
  return (
    <div className="bg-backgroud">
      <Navigation />
      <SubtitileBanner
        className="text-6xl font-extrabold w-3/4"
        titleFirst="Địa điểm tham quan, hoạt động và trải nghiệm"
        titleThird="Khám phá các hoạt động và địa điểm tham quan mới theo sở thích và gu du lịch của bạn"
      />
      <Search />
    </div>
  );
}

export default Register;
