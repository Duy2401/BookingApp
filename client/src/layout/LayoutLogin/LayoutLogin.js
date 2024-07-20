import Footer from "../components/Footer/footer";
import Header from "../components/Header/Header";

function LayoutLogin({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="container1">{children}</div>
      <Footer />
    </div>
  );
}

export default LayoutLogin;
