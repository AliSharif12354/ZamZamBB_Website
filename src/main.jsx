import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Routes/App';
import SignIn from './Routes/SignIn';
import Products from './Routes/Products';
import AdminRoute from './Routes/AdminRoute';
import EditProductsRoute from './Routes/EditProductsRoute';
import EditFlyerRoute from './Routes/EditFlyerRoute';
import AddProductRoute from './Routes/AddProductRoute';
import AddFlyerRoute from './Routes/AddFlyerRoute';
import FlyerDetails from './Routes/FlyerDetails';
import EditProductSpecific from './Routes/EditProductSpecific';
import { HashRouter, Routes, Route } from 'react-router-dom';

const router = (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signinadmin" element={<SignIn />} />
      <Route path="/products" element={<Products />} />
      <Route path="/adminRoute" element={<AdminRoute />} />
      <Route path="/editFlyers" element={<EditFlyerRoute />} />
      <Route path="/editProducts" element={<EditProductsRoute />} />
      <Route path="/addProduct" element={<AddProductRoute />} />
      <Route path="/flyerDetails/:flyerID" element={<FlyerDetails />} />
      <Route path="/editProduct/:productID" element={<EditProductSpecific />} />
      <Route path="/addFlyer" element={<AddFlyerRoute />} />
    </Routes>
  </HashRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {router}
  </React.StrictMode>
);
