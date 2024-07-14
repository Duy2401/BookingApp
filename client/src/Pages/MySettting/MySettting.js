import { Outlet } from "react-router-dom";
import Button from "../../components/Button/button";
function MySettting() {
  return (
    <div className="grid grid-cols-grid_col_2 gap-5 p-5 m-5 border rounded">
      <aside
        id="default-sidebar"
        className=" left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className="p-4 border-b-2 border-gray-300">
              <Button
                to="/mysettings/personal"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M10 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m7 6q-.24 0-.24.24l-.26 1.26c-.22.18-.54.34-.78.5l-1.28-.5c-.08 0-.24 0-.32.1l-.96 1.76c-.08.08-.08.24.08.32l1.04.82v1l-1.04.82c-.08.08-.16.24-.08.32l.96 1.76c.08.1.24.1.32.1l1.28-.5c.24.16.56.32.78.5l.26 1.26q0 .24.24.24h2c.08 0 .24-.08.24-.24l.16-1.26c.32-.18.64-.34.88-.5l1.22.5c.14 0 .3 0 .3-.1l1.04-1.76c.08-.08 0-.24-.08-.32l-1.04-.82v-1l1.04-.82c.08-.08.16-.24.08-.32L21.8 13.6c0-.1-.16-.1-.3-.1l-1.22.5c-.24-.16-.56-.32-.88-.5l-.16-1.26c0-.16-.16-.24-.24-.24zm-7 1c-2.67 0-8 1.33-8 4v3h9.67c-.28-.59-.48-1.23-.58-1.9H3.9V17c0-.64 3.13-2.1 6.1-2.1c.43 0 .87.04 1.3.1c.2-.64.47-1.24.82-1.79c-.78-.13-1.52-.21-2.12-.21m8.04 2.5c.8 0 1.46.66 1.46 1.54c0 .8-.66 1.46-1.46 1.46c-.88 0-1.54-.66-1.54-1.46c0-.88.66-1.54 1.54-1.54"
                    />
                  </svg>
                }
              >
                Thông tin tài khoản
              </Button>
            </li>
            <li className="p-4 border-b-2 border-gray-300">
              <Button
                to="/mysettings/secure"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                    />
                  </svg>
                }
              >
                An toàn và Bảo mật
              </Button>
            </li>
            <li className="p-4 border-b-2 border-gray-300">
              <Button
                to="/mysettings/payment"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="currentColor"
                      d="M4 15.25A6.25 6.25 0 0 1 10.25 9h27.5A6.25 6.25 0 0 1 44 15.25v17.5A6.25 6.25 0 0 1 37.75 39h-27.5A6.25 6.25 0 0 1 4 32.75zm6.25-3.75a3.75 3.75 0 0 0-3.75 3.75v3.25h35v-3.25a3.75 3.75 0 0 0-3.75-3.75zM6.5 32.75a3.75 3.75 0 0 0 3.75 3.75h27.5a3.75 3.75 0 0 0 3.75-3.75V21h-35zm24.75-3.25a1.25 1.25 0 1 0 0 2.5h5.5a1.25 1.25 0 1 0 0-2.5z"
                    />
                  </svg>
                }
              >
                Thông tin thanh toán
              </Button>
            </li>
            <li className="p-4 border-b-2 border-gray-300">
              <Button
                to="/mysettings/privacy"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M6 6a4 4 0 0 1 7.123-2.5H10V3a3 3 0 0 0 0 6v-.5h3.123A4 4 0 0 1 6 6m7.71 1.5H10v-1h3.97q-.069.526-.26 1m.26-2a4 4 0 0 0-.26-1H10v1zM3 13c0-1.113.903-2 2.009-2H15a2 2 0 0 1 1.73.995H10V12H5.009C4.448 12 4 12.447 4 13c0 1.309.622 2.284 1.673 2.953C6.743 16.636 8.265 17 10 17h4.52c-1.238.678-2.826 1-4.52 1c-1.855 0-3.583-.386-4.865-1.203C3.833 15.967 3 14.69 3 13m7 .995v-1h7V13q-.001.525-.104.995zm6.544 1A4.3 4.3 0 0 1 15.836 16h-1.583l.007-.005H10v-1z"
                    />
                  </svg>
                }
              >
                Quyền riêng tư
              </Button>
            </li>
          </ul>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}
export default MySettting;
