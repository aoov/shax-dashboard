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
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useState } from "react";
import Axios from "axios";
import Icon from "@mui/material/Icon";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MDButton from "../../components/MDButton";

function IncomingInventory() {
  // eslint-disable-next-line no-unused-vars
  const [productsList, setProductsList] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const [selected, setSelected] = useState(-1);

  // eslint-disable-next-line no-unused-vars
  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  const onMenuItemClick = (event, index) => {
    console.log(anchor);
    closeMenu();
    setSelected(index);
  };

  const addButton = (array) => {
    // eslint-disable-next-line array-callback-return
    array.map((v) => {
      // eslint-disable-next-line no-param-reassign
      v.action = (
        <MDButton variant="text" color="secondary" onClick={openMenu}>
          <Icon>more_vert</Icon>&nbsp;
        </MDButton>
      );
    });
    return array;
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/IncomingInventory").then((response) => {
      setProductsList(response.data);
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
                  Inventory Deliveries
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "id", accessor: "id", width: "10%" },
                      { Header: "supplier", accessor: "supplier", width: "25%" },
                      { Header: "placed", accessor: "datePlaced", width: "10%" },
                      { Header: "incoming", accessor: "dateIncoming" },
                      { Header: "different products", accessor: "numberOfItems" },
                      { Header: "total items", accessor: "totalItems" },
                      { Header: "action", accessor: "action" },
                    ],
                    rows: addButton(productsList),
                  }}
                  isSorted
                  canSearch
                />
                <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={closeMenu} keepMounted>
                  <MenuItem
                    key={0}
                    onClick={(event) => onMenuItemClick(event, 0)}
                    selected={selected === 0}
                  >
                    Details
                  </MenuItem>
                  <MenuItem
                    key={1}
                    onClick={(event) => onMenuItemClick(event, 1)}
                    selected={selected === 1}
                  >
                    Mark Completed
                  </MenuItem>
                </Menu>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default IncomingInventory;
