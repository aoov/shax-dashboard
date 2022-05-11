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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Dashboard components
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { isAuthenticated } from "../../App";

function Dashboard() {
  if (!isAuthenticated()) {
    return <Navigate to="/authentication/sign-in/" />;
  }
  const [outstandingOrders, setOutstandingOrders] = useState("");
  const [totalCustomers, setTotalCustomers] = useState("");
  const [completedOrders, setCompletedOrders] = useState("");
  const [totalProducts, setTotalProducts] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/outstandingOrders").then((response) => {
      setOutstandingOrders(response.data[0].amount);
    });
    Axios.get("http://localhost:3001/api/get/totalCustomers").then((response) => {
      setTotalCustomers(response.data[0].amount);
    });
    Axios.get("http://localhost:3001/api/get/completedCustomerOrdersCount").then((response) => {
      setCompletedOrders(response.data[0].amount);
    });
    Axios.get("http://localhost:3001/api/get/totalProducts").then((response) => {
      setTotalProducts(response.data[0].amount);
    });
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                icon="local_shipping"
                title="Outstanding Orders"
                color="warning"
                value={outstandingOrders}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                icon="leaderboard"
                color="info"
                title="Total Products"
                value={totalProducts}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                icon="check"
                color="success"
                title="Completed Orders"
                value={completedOrders}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                icon="person_add"
                color="primary"
                title="Total Customers"
                value={totalCustomers}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3} />
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={8}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
