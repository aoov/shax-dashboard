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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import Axios from "axios";
import DataTable from "examples/Tables/DataTable";

function Products() {
  // eslint-disable-next-line no-unused-vars
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/products").then((response) => {
      setProductsList(response.data);
      console.log(productsList);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Products List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "number", accessor: "number", width: "10%" },
                      { Header: "name", accessor: "name", width: "25%" },
                      { Header: "manufacturer", accessor: "manufacturer", width: "25%" },
                      { Header: "description", accessor: "description" },
                      { Header: "msrp", accessor: "msrp", width: "12%" },
                    ],
                    rows: productsList,
                  }}
                  isSorted
                  canSearch
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;
