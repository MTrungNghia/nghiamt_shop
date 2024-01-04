import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { Button, ConfigProvider, Space } from 'antd';
import DefaultLayout from './layouts/Defaulayout';
import { Fragment } from 'react';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#00b96b',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#f6ffed',
        },
      }}
    >
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

            {/* {privateRoutes.map((route, index) => {
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
            })} */}

          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
