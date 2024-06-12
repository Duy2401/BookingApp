import Header from "../../components/Header/Header";

function DefaultLayout({ children }) {
  return (
    <div className="wrapper max-w-full">
      <Header />
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
export default DefaultLayout;
