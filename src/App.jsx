import React from 'react';
/*import Navbar from './common/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from "./routes";
import Flights from './pages/flights';
*/
import mainCalend from './components/Calendar';
function App() {
  return (
    <div className="App">
     {/*<Flights />*/}
      {/*}
      <BrowserRouter>
      <Navbar />
      <Routes>
      {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              </Routes>
      </BrowserRouter>
            */}
            <mainCalend />
    </div>
  );
}

export default App;