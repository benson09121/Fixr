import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReportIcon from '@mui/icons-material/Report';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import HandymanIcon from '@mui/icons-material/Handyman';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import DashboardContent from './DashboardContent';
import ManageUsersContent from './ManageUseresContent';
import ManageServicesContent from './ManageServicesContent';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Home',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Admin Tools',
  },
  {
    segment: 'manageusers',
    title: 'Manage Users',
    icon: <ManageAccountsIcon />,
  },
  {
    segment: 'manageservices',
    title: 'Manage Services',
    icon: <HandymanIcon />,
  },
  {
    segment: 'managereport',
    title: 'Manage Reports',
    icon: <ReportIcon />,
  },
  {
    segment: 'managehistory',
    title: 'Service Requests History',
    icon: <HistoryIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Authentication',
  },
  {
    segment: 'Logout',
    icon: <LogoutIcon />,
    onClick: () => console.log("Logout"),
  },
 
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
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

const Skeleton = styled('div')(({ theme, height }) => ({
  
  borderRadius: theme.shape.borderRadius,
  height,
  boxShadow: "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 3px 13px 24px -4px",
  content: '" "',
  marginBottom: theme.spacing(3),
  marginRight: theme.spacing(2),
}));
export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{ logo: <img src='../../../pics/just_logo.png' />, href: '/dashboard', title: 'FIXR' }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
        {console.log(router.pathname)}
          {router.pathname === '/dashboard' && <DashboardContent Skeleton={Skeleton} />}
          {router.pathname === '/manageusers' && <ManageUsersContent Skeleton={Skeleton} />}
          {router.pathname === '/manageservices' && <ManageServicesContent Skeleton={Skeleton} />}
          {/* Add more conditions for other routes as needed */}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}5