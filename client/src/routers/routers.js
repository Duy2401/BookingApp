import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
export const RouterPages = [
  { path: "/", component: Home },
  { path: "/sign-in", component: Login },
  { path: "/register", component: Register, layout: null },
];
