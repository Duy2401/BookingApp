import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";
import Navigations from "../components/Navigation";
function DefaultLayout({ children }) {
  return (
    <div className="wrapper relative">
      <header className="bg-backgroud">
        <Header />
        <Navigations />
      </header>
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
