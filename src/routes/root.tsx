import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import ErrorBoundary from 'components/common/errorBoundary';

export default function Root() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </Box>
  );
}
