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

// import { useState } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import { useNavigate } from "react-router-dom";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useState } from "react";
import Axios from "axios";
// eslint-disable-next-line no-unused-vars
import MDAlert from "../../../components/MDAlert";

// eslint-disable-next-line no-unused-vars
const app = require("App");

function Basic() {
  const navigation = useNavigate();
  // const [rememberMe, setRememberMe] = useState(false);
  //
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // <Switch checked={rememberMe} onChange={handleSetRememberMe} />

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    Axios.post("http://localhost:3001/api/sign-in", { email, password })
      // eslint-disable-next-line consistent-return
      .then((r) => {
        // eslint-disable-next-line no-empty
        if (r.status === 200) {
          app.setAuthenticated(true);
          navigation("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={3}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={2} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                onChange={(event) => setEmail(event.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={signIn}>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
