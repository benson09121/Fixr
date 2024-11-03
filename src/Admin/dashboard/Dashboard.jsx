import React, { useEffect, useState } from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReportIcon from "@mui/icons-material/Report";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import HandymanIcon from "@mui/icons-material/Handyman";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import DashboardContent from "./DashboardContent";
import ManageUsersContent from "./ManageUseresContent";
import ManageServicesContent from "./ManageServicesContent";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const NAVIGATION = [
  {
    kind: "header",
    title: "Home",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Admin Tools",
  },
  {
    segment: "manageusers",
    title: "Manage Users",
    icon: <ManageAccountsIcon />,
  },
  {
    segment: "manageservices",
    title: "Manage Services",
    icon: <HandymanIcon />,
  },
  {
    segment: "managereport",
    title: "Manage Reports",
    icon: <ReportIcon />,
  },
  {
    segment: "manageworkers",
    title: "Manage Service Providers",
    icon: <EngineeringIcon />,
  },
  {
    segment: "managehistory",
    title: "Service Requests History",
    icon: <HistoryIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Authentication",
  },
  {
    segment: "Logout",
    icon: <LogoutIcon />,
    onClick: () => console.log("Logout"),
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
} 

const Skeleton = styled("div")(({ theme, height }) => ({
  borderRadius: theme.shape.borderRadius,
  height,
  boxShadow:
    "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 3px 13px 24px -4px",
  content: '" "',
  marginBottom: theme.spacing(3),
  marginRight: theme.spacing(2),
}));
export default function DashboardLayoutBasic(props) {
  const [cookies, setCookies, removeCookies] = useCookies(["admin_token"]);
  const { window } = props;
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const router = useDemoRouter("/dashboard");
  const [dataChanged, setDataChanged] = useState(false);
  const demoWindow = window ? window() : undefined;
  const [services, setServices] = useState([]);
  const [serviceChange, setServiceChange] = useState(false);

  useEffect(() => {
    if (cookies.admin_token) {
      if (jwtDecode(cookies.admin_token)) {
        const decoded = jwtDecode(cookies.admin_token);
        if (!decoded.account_type === "admin") {
          navigate("/admin/login");
        } else {
        }
      }
    } else {
      navigate("/admin/login");
    }
    if (router.pathname === "/") {
      router.navigate("/dashboard");
    }
    if (router.pathname == "/Logout") {
      removeCookies(["admin_token"]);
      navigate("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost/FIXR/API/admin/getUsers.php"
        );
        setUsers(response.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          alert("Wrong Output!");
        }
        if (error.response.status === 404) {
          alert("Not Found!");
        }
      }
    };
    fetchUsers();
    console.log(users);
  }, [dataChanged]);

  const handleDataChange = async (updatedRow) => {
    console.log(updatedRow);
    try {
      const response = await axios.post(
        "http://localhost/FIXR/API/admin/updateUser.php",
        updatedRow
      );
      console.log(response);
      setDataChanged((prev) => !prev);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Manage Services
  useEffect(() => {

    axios.get("http://localhost/FIXR/API/admin/getService.php")
    .then((response) => {
      if(response.data.status == 200){
        setServices(response.data.data);
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });

},[serviceChange]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="../../../pics/just_logo.png" />,
        href: "/dashboard",
        title: "FIXR",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {console.log(router.pathname)}
          {router.pathname === "/dashboard" && (
            <DashboardContent Skeleton={Skeleton} users={users} services={services} />
          )}
          {router.pathname === "/manageusers" && (
            <ManageUsersContent
              Skeleton={Skeleton}
              users={users}
              onDataChange={handleDataChange}
            />
          )}
          {router.pathname === "/manageservices" && (
            <ManageServicesContent Skeleton={Skeleton} services={services} setServiceChange={setServiceChange} />
          )}
          {/* Add more conditions for other routes as needed */}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
5;
