/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Products from "layouts/products";
import IncomingInventory from "layouts/incomingInventory";
import AddProduct from "layouts/addProduct";
import AddDelivery from "layouts/addDelivery";
import CustomerOrders from "layouts/customerOrders";
import AddOrder from "layouts/addOrder";
import Customers from "layouts/customers";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Products List",
    key: "products",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/customers",
    component: <Customers />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/customerOrders",
    component: <CustomerOrders />,
  },
  {
    type: "collapse",
    name: "Incoming Inventory",
    key: "inventory",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/incomingInventory",
    component: <IncomingInventory />,
  },
  {
    type: "collapse",
    name: "Add Product",
    key: "addProduct",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/addProduct",
    component: <AddProduct />,
  },
  {
    type: "collapse",
    name: "Add Delivery",
    key: "addDelivery",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/addDelivery",
    component: <AddDelivery />,
  },
  {
    type: "collapse",
    name: "Add Order",
    key: "addOrder",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/addOrder",
    component: <AddOrder />,
  },
  {
    type: "collapse",
    name: "Register Employee",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Sign-Out",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
