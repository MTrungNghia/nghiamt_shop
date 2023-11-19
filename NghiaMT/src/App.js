import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/Defaulayout';
import LayoutDefaultAdmin from '../src/pages/Admin/index';
import { Fragment } from 'react';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout === null) {
              Layout = Fragment
            }
            return (<Route
              key={index}
              path={route.path}
              element={<Layout
                children={<Page />}
              />}
            />)
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = LayoutDefaultAdmin;
            if (route.layout === null) {
              Layout = Fragment
            }
            return (<Route
              key={index}
              path={route.path}
              element={<Layout
                children={<Page />}
              />}
            />)
          })}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
