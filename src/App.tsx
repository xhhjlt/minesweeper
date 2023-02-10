import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppRouter from "app/appRouter";
import React from "react";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
const colorMode = React.useMemo(
  () => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }),
  []
);
const theme = React.useMemo(
  () =>
    createTheme({
      palette: {
        mode,
      },
    }),
  [mode]
);

return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </ColorModeContext.Provider>
);
}

export default App;
