import SearchTour from "../../layout/components/Search/SearchTour/SearchTour";
import SubtitileBanner from "../../layout/components/SubtitleBanner";
import Destinations from "../Stays/components/destinations/destinations";
import NearByLoca from "./components/nearbyLoca/nearbyLoca";

function Attractions() {
  return (
    <>
      <div className="bg-backgroud">
        <SubtitileBanner
          className="text-6xl font-extrabold w-3/4"
          titleFirst="Địa điểm tham quan,hoạt động và trải nghiệm"
          titleThird="Khám phá các hoạt động và điểm tham quan theo sở thích và gu du lịch của bạn"
          titleSecond="Địa điểm tham quan,hoạt động và trải nghiệm"
        />
        <SearchTour />
      </div>
      <div className="px-9 pt-2 mt-30 mx-44 font-Nunito">
        <NearByLoca />
        <div className="mt-5">
          <div class="container mx-auto px-4 border-t-2 border-b-2">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white p-6">
                <h2 class="text-xl font-bold mb-4">
                  Bạn cứ vô tư khám phá, những thứ khác chúng tôi lo
                </h2>
                <p class="text-gray-700">
                  Khám phá các địa điểm tham quan hàng đầu
                </p>
                <p class="text-gray-700 mt-2">
                  Trải nghiệm những điều tuyệt vời nhất tại điểm đến với các địa
                  điểm tham quan, tour và nhiều hoạt động khác.
                </p>
              </div>
              <div class="bg-white p-6">
                <h2 class="text-xl font-bold mb-4">Nhanh chóng và linh hoạt</h2>
                <p class="text-gray-700">
                  Đặt vé online trong vài phút với lựa chọn hủy miễn phí ở nhiều
                  địa điểm quan tham.
                </p>
              </div>
              <div class="bg-white p-6">
                <h2 class="text-xl font-bold mb-4">
                  Được trợ giúp khi bạn cần
                </h2>
                <p class="text-gray-700">
                  Đội ngũ Dịch vụ Khách hàng toàn cầu của Booking.com sẽ luôn có
                  mặt để hỗ trợ bạn 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Destinations />
      </div>
    </>
  );
}
export default Attractions;
