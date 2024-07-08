import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { ReactComponent as Booking } from "../../../../assets/icons/Booking.svg";
import { ReactComponent as Account } from "../../../../assets/icons/User.svg";
import { ReactComponent as Like } from "../../../../assets/icons/Like.svg";
import { ReactComponent as Logout } from "../../../../assets/icons/Logout.svg";
export const UserProfile = () => {
  const avt = false;
  return (
    <div className="relative flex items-center hover:bg-bgHover text-base min-w-24 p-2 mr-1 rounded cursor-pointer h-full">
      {!avt ? (
        <div className="rounded-full mr-2 bg-yellow-400 flex-grow p-p_5_10">
          <span className="text-black font-extrabold">D</span>
        </div>
      ) : (
        <div className="rounded-bl-full mr-2 bg-yellow-400 flex-grow p-p_5_10"></div>
      )}
      <Dropdown>
        <DropdownTrigger>
          <div className="infor">
            <div className="infor-name text-base">Duy Nguyễn</div>
            <div className="text-xs op">longduy2410@gmail.com</div>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          className="rounded bg-white border-0"
          variant="faded"
          color="primary"
          aria-label="Dropdown menu with icons"
        >
          <DropdownItem
            key="new"
            className="mb-4"
            startContent={
              <Account
                className={
                  "text-xl text-default-500 pointer-events-none flex-shrink-0"
                }
              />
            }
          >
            Quản lý Tài Khoản
          </DropdownItem>
          <DropdownItem
            key="copy"
            className="mb-4"
            startContent={
              <Booking
                className={
                  "text-xl text-default-500 pointer-events-none flex-shrink-0"
                }
              />
            }
          >
            Đặt chỗ & Chuyến đi
          </DropdownItem>
          <DropdownItem
            key="edit"
            className="mb-4"
            startContent={
              <Like
                className={
                  "text-xl text-default-500 pointer-events-none flex-shrink-0"
                }
              />
            }
          >
            Đã lưu
          </DropdownItem>
          <DropdownItem
            key="delete"
            startContent={
              <Logout
                className={
                  "text-xl text-default-500 pointer-events-none flex-shrink-0"
                }
              />
            }
          >
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
