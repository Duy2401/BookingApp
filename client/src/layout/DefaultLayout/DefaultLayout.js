import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";
function DefaultLayout({ children }) {
  return (
    <div className="wrapper relative">
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
