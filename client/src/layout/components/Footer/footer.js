import SvgIcon from "../../../components/SvgIcon/SvgIcon";
import { ReactComponent as Facebook } from "../../../assets/icons/Facebook.svg";
import { ReactComponent as Instagram } from "../../../assets/icons/Instagram.svg";
import { ReactComponent as Threads } from "../../../assets/icons/Threads.svg";
const Footer = () => {
  return (
    <footer className="bg-backgroud text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">BOOKING.COM</h3>
            <p>736 Đ. Nguyễn Trãi, Phường 11, Quận 5, Hồ Chí Minh</p>
            <p>Email: duynguyen240102@gmail.com</p>
            <p>Phone: +0364173996</p>
          </div>
          <div className="w-full md:w-1/4 mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://www.facebook.com/longduy2410"
                  className="text-gray-300 hover:text-gray-400"
                >
                  <SvgIcon icon={Facebook} width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_nld2401_/"
                  className="text-gray-300 hover:text-gray-400"
                >
                  <SvgIcon icon={Instagram} width={20} height={20} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.threads.net/@_nld2401_"
                  className="text-gray-300 hover:text-gray-400"
                >
                  <SvgIcon icon={Threads} width={20} height={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 text-sm text-gray-400 text-center border-t-2 border-solid">
        <p>&copy; 2024 Company Name. All rights reserved.</p>
        <p>Designed by Nguyen Long Duy</p>
      </div>
    </footer>
  );
};
export default Footer;
