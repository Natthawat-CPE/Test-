import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; //npm i react-router-dom
import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import RankingForm from "./components/B6304577/ReviewOrders/RatingForm";
import Payment from "./components/B6308490/Payment/Payment";
import EditPayment from "./components/B6308490/Payment/EditPayment";
import PaymentShow from "./components/B6308490/Payment/PaymentShow";
import AddressCreateForm from "./components/B6321765/Address/AddressCreate";
import AddressShowForm from "./components/B6321765/Address/AddressShow";
import AddressEditForm from "./components/B6321765/Address/AddressEdit";
import OrderCreate from "./components/B6304508/Order";
import ClaimOrderForAdmin from "./components/B6304577/ClaimOrders/ClaimOrderForAdmin";
import DeviceCreateForm from "./components/B6321765/Device/DeviceCreate";
import DeviceEditForm from "./components/B6321765/Device/DeviceEdit";
import DeviceShowForm from "./components/B6321765/Device/DeviceShow";
import OrderUpdate from "./components/B6304508/UpdateOrder";
import ShowOrder from "./components/B6304508/ShowOrder";
import RefundCreate from "./components/B6304508/Refund";
import RefundShow from "./components/B6304508/ShowRefund";
import CreateForm from "./components/B6311117/Customer/CreateForm";
import CreateForm2 from "./components/B6311117/Customer/CustomerForm2";
import CreateFormTech from "./components/B6311117/Technician/CreateFormTech";
import CreateTechnician2 from "./components/B6311117/Technician/CreateFromeTechnician2";
import Checked_paymentShow from "./components/B6308490/Checked_payment/Checked_paymentShow";
import Checked_payment from "./components/B6308490/Checked_payment/Checked_payment";
import Edit_Checked_payment from "./components/B6308490/Checked_payment/Edit_Checked_payment";

import Table2Order from "./components/B6310646/OrderTech/TablePopupOrderTech";
import TableOrderTech from "./components/B6310646/OrderTech/TableOrderTech";
import OrderTechUpdate from "./components/B6310646/OrderTech/UpdateOrderTech";
import TablePayTech from "./components/B6310646/PayTech/TablePayTech";
import PayTechUpdate from "./components/B6310646/PayTech/UpdatePayTech";
import OrderTechCreate from "./components/B6310646/OrderTech/CreateOrderTech";
import PayTechCreate from "./components/B6310646/PayTech/CreatePayTech";

import { Button, Drawer } from "@mui/material";

import SignInCustomer from "./components/SignInCustomer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Public } from "@mui/icons-material";
import PublicRoutes from "./components/PublicRoutes";
import SignInTech from "./components/SignInTech";
import PermissionDenied from "./components/PermissionDenied";
import HomeCustomer from "./components/HomeCustomer";
import SignInAdmin from "./components/SignInAdmin";
import TimeoutLogic from "./components/TimeoutLogic";
import CreateClaim from "./components/B6304577/ClaimOrders/CreateClaim";
import ShowClaim from "./components/B6304577/ClaimOrders/ShowClaim";
import EditContentClaimOrder from "./components/B6304577/ClaimOrders/EditDataClaim";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

const menu = [
  // { name: "??????????????????????????????????????????????????????", path: "/CustomerCreate" },

  // ========== For Technician ========== //
  { name: "????????????show????????????", path: "/TechnicianShow", role: "Technician" },
  { name: "??????????????????????????????????????????????????????", path: "/OrderTech", role: "Technician" },
  { name: "?????????????????????????????????????????????????????????????????????????????????", path: "PayTech", role: "Technician" },

  // ========== For Admin ========== //
  { name: "????????????????????????", path: "/TechnicianCreate", role: "Admin" },
  {
    name: "??????????????????????????????????????????????????????????????????",
    path: "/Checked_paymentShow",
    role: "Admin",
  },
  {
    name: "??????????????????????????????????????????????????????????????????????????????????????????????????????",
    path: "/ClaimOrderForAdmin",
    role: "Admin",
  },
  {
    name: "???????????? show ???????????????????????????????????????????????????",
    path: "/RefundShow",
    role: "Admin",
  },

  // ========== For Customer ========== //
  { name: "?????????????????????", path: "/", role: "Customer" },
  { name: "???????????? show ??????????????????????????????????????????", path: "/CustomerShow", role: "Customer" },
  { name: "??????????????????????????????????????????????????????", path: "/AddressShowPage", role: "Customer" },
  { name: "??????????????????????????????????????????????????????", path: "/DeviceShowPage", role: "Customer" },
  {
    name: "??????????????????????????????????????????????????????????????????????????????????????????",
    path: "/ShowOrder",
    role: "Customer",
  },
  { name: "????????????????????????????????????", path: "/PaymentShow", role: "Customer" },
  { name: "??????????????????????????????????????????????????????????????????", path: "/RankingForm", role: "Customer" },
  { name: "Show Claim Order", path: "/ShowClaim", role: "Customer" },
];

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(false);
  const _user = localStorage.getItem("role");
  console.log(_user);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  // if (!token) {
  //   return <SignInCustomer />;
  // }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (

    <div>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          {token ? (
            <AppBar id="appbar" position="fixed">
              <TimeoutLogic />
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  id="textAppBar"
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  ?????????????????????????????????????????????????????????????????????
                </Typography>
                <Button id="buttonSignOutInAppBar" onClick={signout}>
                  Sign Out
                </Button>
              </Toolbar>
            </AppBar>
          ) : (
            ""
          )}
        </Box>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(25px)" // ????????????????????????????????????????????????????????????????????????????????? 10px
            }
          }}
          anchor="left"
          open={open}
          onClose={handleClose} >
          <Toolbar
            sx={{
              // backgroundColor: "#182e3e",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List id="textDrawer">
            {menu.map((item, index) => (
              <Link

                to={item.path}
                key={item.name}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {_user === item.role ? (
                  <ListItem button >
                    <ListItemIcon>{item.role}</ListItemIcon>
                    <ListItemIcon>{item.name}</ListItemIcon>
                  </ListItem>
                ) : (
                  ""
                )}
              </Link>
            ))}
          </List>
        </Drawer>
        <Container sx={{ marginTop: "5%", marginBottom: "5%" }}>
          <Routes>

          // Public Routes // Wrap all Route under PublicRoutes element // //
            Sign In Customer
            <Route path="SignInCustomer" element={<PublicRoutes />}>
              <Route path="/SignInCustomer" element={<SignInCustomer />} />
            </Route>
          // Sign In Tech
            <Route path="SignInTech" element={<PublicRoutes />}>
              <Route path="/SignInTech" element={<SignInTech />} />
            </Route>
          // Sign In Admin
            <Route path="SignInAdmin" element={<PublicRoutes />}>
              <Route path="/SignInAdmin" element={<SignInAdmin />} />
            </Route>
          // ========== Sign Up Customer ========== //
            <Route path="CreateForm" element={<PublicRoutes />}>
              <Route path="/CreateForm" element={<CreateForm />} />
            </Route>
          // Protected Routes // Wrap all Route under ProtectedRoutes element //
            ========== For Customer ========== //
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/Home" element={<HomeCustomer />} />

            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/CustomerShow" element={<CreateForm2 />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/AddressShowPage" element={<AddressShowForm />} />
              <Route path="/AddressCreatePage" element={<AddressCreateForm />} />
              <Route path="/AddressEditPage" element={<AddressEditForm />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/DeviceShowPage" element={<DeviceShowForm />} />
              <Route path="/DeviceCreatePage" element={<DeviceCreateForm />} />
              <Route path="/DeviceEditPage" element={<DeviceEditForm />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/ShowOrder" element={<ShowOrder />} />
              <Route path="/OrderCreate" element={<OrderCreate />} />
              <Route path="/OrderUpdate" element={<OrderUpdate />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/PaymentShow" element={<PaymentShow />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/EditPayment" element={<EditPayment />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/RankingForm" element={<RankingForm />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/ContentClaimOrder" element={<CreateClaim />} />
              <Route path="/EditContentClaimOrder" element={<EditContentClaimOrder />} />
              <Route path="/ShowClaim" element={<ShowClaim />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Customer" />}>
              <Route path="/RefundCreate" element={<RefundCreate />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Admin" />}>
              <Route path="/RefundShow" element={<RefundShow />} />
            </Route>
          // ========== For Customer ========== // // ========== For Technician
            ========== //
            <Route
              path="/"
              element={<ProtectedRoutes roleRequired="Technician" />}
            >
              <Route path="/TechnicianShow" element={<CreateTechnician2 />} />
            </Route>
            <Route
              path="/"
              element={<ProtectedRoutes roleRequired="Technician" />}
            >
              <Route path="/OrderTech" element={<TableOrderTech />} />
              <Route path="/TableOrder-tech" element={<Table2Order />} />
              <Route path="/OrderTechCreate/:id" element={<OrderTechCreate />} />
              <Route path="/OrderTechUpdate/:id" element={<OrderTechUpdate />} />
            </Route>
            <Route
              path="/"
              element={<ProtectedRoutes roleRequired="Technician" />}
            >
              <Route path="/PayTech" element={<TablePayTech />} />
              <Route path="/PayTechCreate/:id" element={<PayTechCreate />} />
              <Route path="/PayTechUpdate/:id" element={<PayTechUpdate />} />
            </Route>
          // ========== For Technician ========== // // ========== For Admin
            ========== //
            <Route path="/" element={<ProtectedRoutes roleRequired="Admin" />}>
              <Route path="/TechnicianCreate" element={<CreateFormTech />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Admin" />}>
              <Route path="/Checked_payment" element={<Checked_payment />} />
              <Route
                path="/Checked_paymentShow"
                element={<Checked_paymentShow />}
              />
              <Route
                path="/EditChecked_payment"
                element={<Edit_Checked_payment />}
              />
            </Route>
            <Route path="/" element={<ProtectedRoutes roleRequired="Admin" />}>
              <Route
                path="/ClaimOrderForAdmin"
                element={<ClaimOrderForAdmin />}
              />
            </Route>
          // ========== For Admin ========== //
          </Routes>
        </Container>

      </Router>
    </div>
  );
}

export default App;
