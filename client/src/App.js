import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RouterPages } from "./routers/routers";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
function App() {
  return (
    <Router>
      <div className="Ap">
        <Routes>
          {RouterPages.map((router, index) => {
            let Page = router.component;
            let Layout = DefaultLayout;
            if (router.layout) {
              Layout = router.layout;
            } else if (router.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
