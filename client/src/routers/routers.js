import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
// STAYS
import Stays from "../Pages/Stays/Stays.js";
import SearchStays from "../Pages/Stays/components/searchStays/searchStays.js";
import HotelDetails from "../Pages/Stays/components/hoteldetails/hoteldetails.js";
import CreateHotels from "../Pages/Stays/components/createHotels/createaHotel.js";
// ATTRACTIONS
import Attractions from "../Pages/Attractions/Attractions.js";
// FLIGHTS
import Flights from "../Pages/Flights/Flights.js";
import Partner from "../Pages/Partner/Partner.js";
import SecurityPolicy from "../Pages/SecurityPolicy/SecurityPolicy.js";
import MySettting from "../Pages/MySettting/MySettting.js";
import AccountInfor from "../Pages/MySettting/accountInfor.js";
import BillingInfor from "../Pages/MySettting/billingInfor.js";
import Privacy from "../Pages/MySettting/privacy.js";
import Secure from "../Pages/MySettting/secure.js";
// HISTORY

import History from "../Pages/history/history.js";
import HotelBook from "../Pages/history/components/hotelbook.js";
import FlightBook from "../Pages/history/components/flightbook.js";
import TourBook from "../Pages/history/components/tourbook.js";
// BOOKING
import Booking from "../Pages/Bookings/Booking.js";
// LAYOUT
import LayoutLogin from "../layout/LayoutLogin/LayoutLogin.js";
import PaymentDetail from "../Pages/Bookings/Payments/PaymentDetail.js";
import RoomTypeForm from "../Pages/Stays/components/createHotels/RoomTypeForm.js";
import SearchFlights from "../Pages/Flights/components/searchFlight/searchFlight.js";
import VnpayReturn from "../Pages/Bookings/Payments/PaymentReturn.js";
import CreateFlights from "../Pages/Flights/components/createFlights/createFlights.js";

export const RouterPages = [
  // STAYS
  { path: "/", component: Stays },
  {
    path: "/stays/searchresults",
    component: SearchStays,
  },
  {
    path: "/stays/:aid",
    component: HotelDetails,
  },
  // ACCOUNTS
  { path: "/sign-in", component: Login, layout: LayoutLogin },
  { path: "/register", component: Register, layout: LayoutLogin },
  {
    path: "/mysettings",
    component: MySettting,
    children: [
      { path: "personal/:iduser", component: AccountInfor },
      { path: "secure", component: Secure },
      { path: "payment", component: BillingInfor },
      { path: "privacy", component: Privacy },
    ],
    layout: LayoutLogin,
  },
  {
    path: "/history",
    component: History,
    layout: LayoutLogin,
    children: [
      { path: "hotelhistory", component: HotelBook },
      { path: "flighthistory", component: FlightBook },
      { path: "tourhistory", component: TourBook },
    ],
  },
  { path: "/policy", component: SecurityPolicy, layout: LayoutLogin },

  // TOURS
  { path: "/attractions", component: Attractions },
  { path: "/attractions/searchresults", component: Attractions },

  // FLIGHTS
  { path: "/flights", component: Flights },
  { path: "/flights/searchresults", component: SearchFlights },

  // SERVICES
  {
    path: "/partner",
    component: Partner,
    children: [
      { path: "addhotels", component: CreateHotels },
      { path: "addrooms/:id", component: RoomTypeForm },
      { path: "addtours", component: CreateHotels },
      { path: "addflights", component: CreateFlights },
    ],
  },
  // PAYMENT AND CREATE BOOKING
  { path: "/booking", component: Booking },
  { path: "/payment", component: PaymentDetail },
  { path: "/vnpay_return", component: VnpayReturn },
];
