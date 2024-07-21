import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
// STAYS
import Stays from "../Pages/Stays/Stays.js";
import SearchStays from "../Pages/Stays/components/searchStays/searchStays.js";
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

// LAYOUT
import LayoutLogin from "../layout/LayoutLogin/LayoutLogin.js";

export const RouterPages = [
  // STAYS
  { path: "/", component: Stays },
  {
    path: "/stays/searchresults",
    component: SearchStays,
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
  { path: "/policy", component: SecurityPolicy, layout: LayoutLogin },

  // TOURS
  { path: "/attractions", component: Attractions },
  { path: "/attractions/searchresults", component: Attractions },

  // FLIGHTS
  { path: "/flights", component: Flights },
  { path: "/flights/searchresults", component: Flights },

  // SERVICES
  { path: "/partner", component: Partner },
];
