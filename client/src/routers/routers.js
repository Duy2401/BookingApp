import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Stays from "../Pages/Stays/Stays.js";
import Attractions from "../Pages/Attractions/Attractions.js";
import Flights from "../Pages/Flights/Flights.js";
import Partner from "../Pages/Partner/Partner.js";
import SecurityPolicy from "../Pages/SecurityPolicy/SecurityPolicy.js";

// LAYOUT
import LayoutLogin from "../layout/LayoutLogin/LayoutLogin.js";

export const RouterPages = [
  { path: "/", component: Stays },
  { path: "/sign-in", component: Login, layout: LayoutLogin },
  { path: "/register", component: Register, layout: LayoutLogin },
  { path: "/policy", component: SecurityPolicy, layout: LayoutLogin },
  { path: "/attractions", component: Attractions },
  { path: "/flights", component: Flights },
  { path: "/partner", component: Partner },
];
