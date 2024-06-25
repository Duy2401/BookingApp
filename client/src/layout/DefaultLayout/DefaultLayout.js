import Header from "../components/Header/Header";
function DefaultLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="container1">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
export default DefaultLayout;
