import Routes from "./pages/router";
import { createTheme, ThemeProvider } from "@mui/material";

import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Gill Sans", "sans-serif"].join(","),
  },
});

const App = () => {
  return (
    <div
      className="main-div"
      style={{
        width: "100vw",
      }}
    >
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
};

export default App;
