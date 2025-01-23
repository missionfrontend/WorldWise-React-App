import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import Product from "./Pages/Product";
// import Login from "./Pages/Login";
// import AppLayout from "./Pages/AppLayout";
import AppNav from "./Components/AppNav";
import CityList from "./Components/CityList";
import { lazy, Suspense, useEffect, useState } from "react";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form.jsx";
import { CityProvider, CityContexts } from "./Contexts/CityProvider.jsx";
import { AuthProvider } from "./Contexts/FakeAuthContext.jsx";
import SpinnerFullPage from "./Components/SpinnerFullPage.jsx";

const Homepage = lazy(() => import("./Pages/Homepage"));
const Login = lazy(() => import("./Pages/Login"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
