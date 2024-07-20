const Footer = () => {
  return (
    <footer className="bg-backgroud text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Company Name</h3>
            <p>123 Street, City</p>
            <p>Email: contact@example.com</p>
            <p>Phone: +1234567890</p>
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
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Site Map
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-400">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-400">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-400">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 text-sm text-gray-400 text-center border-t-2 border-solid">
        <p>&copy; 2024 Company Name. All rights reserved.</p>
        <p>Designed by Your Name</p>
      </div>
    </footer>
  );
};
export default Footer;
