import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Routes/App'
import SignIn from './Routes/SignIn'
// import Featured from './Routes/Featured'
// import AboutUs from './Routes/AbousUs'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Products from './Routes/Products'

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/admin", element: <SignIn/>},
  {path: "/products", element: <Products/>}

  // {path: "/Featured", element: <Featured/>},
  // {path: "/AboutUs", element: <AboutUs/>}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
