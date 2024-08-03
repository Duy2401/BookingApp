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
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutAccount } from "../../../../redux/customersSlice";
export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customers.customers);
  const handleLogoutAccount = async () => {
    try {
      const data = await dispatch(LogoutAccount({ customers }));
      if (data.meta.requestStatus === "fulfilled") {
        toast.success(data.payload.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      if (data.meta.requestStatus === "rejected")
        toast.error(data.payload.message);
    } catch (error) {}
  };
  const avt = false;
  return (
    <div className="relative flex items-center hover:bg-bgHover text-base min-w-24 p-2 mr-1 rounded cursor-pointer h-full">
      <ToastContainer icon={true} />
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
            <div className="infor-name text-base">
              {customers.customer_name
                ? customers.customer_name
                : "New Customers"}
            </div>
            <div className="text-xs op">{customers.customer_email}</div>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          className="rounded bg-white border-0"
          variant="faded"
          color="primary"
          aria-label="Dropdown menu with icons"
        >
          <DropdownItem
            href={`/mysettings/personal/iduser=${customers._id}`}
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
            href="/history/hotelhistory"
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
            onClick={handleLogoutAccount}
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
