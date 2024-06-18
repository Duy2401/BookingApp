import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Stays from "../Pages/Stays/Stays.js";
import Attractions from "../Pages/Attractions/Attractions.js";
import Flights from "../Pages/Flights/Flights.js";
import Partner from "../Pages/Partner/Partner.js";
export const RouterPages = [
  { path: "/", component: Stays },
  { path: "/sign-in", component: Login },
  { path: "/register", component: Register },
  { path: "/attractions", component: Attractions },
  { path: "/flights", component: Flights },
  { path: "/partner", component: Partner },
];
