import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { GitHub } from '@mui/icons-material';
import { useTheme } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        p: 1,
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[900],
      }}
    >
      <CssBaseline />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <Link
            color="inherit"
            href="https://github.com/xhhjlt"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <GitHub />
            Alexander
          </Link>
        </Typography>
        <Typography variant="body1">© 2023</Typography>
      </Container>
    </Box>
  );
}
