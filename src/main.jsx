import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Routes/App'
import SignIn from './Routes/SignIn'
import Products from './Routes/Products'
import AdminRoute from './Routes/AdminRoute'
import EditProductsRoute from './Routes/EditProductsRoute'
import EditFlyerRoute from './Routes/EditFlyerRoute'
import AddProductRoute from './Routes/AddProductRoute'
import FlyerDetails from './Routes/FlyerDetails'


// import Featured from './Routes/Featured'
// import AboutUs from './Routes/AbousUs'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/signinadmin", element: <SignIn/>},
  {path: "/products", element: <Products/>},
  {path: "/adminRoute", element: <AdminRoute/>},
  {path: "/editFlyers", element: <EditFlyerRoute/>},
  {path: "/editProducts", element: <EditProductsRoute/>},
  {path: "/addProduct", element: <AddProductRoute/>},
  {path: "/flyerDetails/:flyerID", element: <FlyerDetails/>}
  // {path: "/Featured", element: <Featured/>},
  // {path: "/AboutUs", element: <AboutUs/>}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
