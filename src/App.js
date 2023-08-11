import "./App.css";
import LogIn from "./components/LogIn";
import Grid from "./components/Grid";
import { CssBaseline } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import AppContext from "./AppContext";
import LogOut from "./components/Logout";

const theme = createTheme();

function App() {
  const getUser = () => JSON.parse(localStorage.getItem("user")) ?? null;
  const [user, setUser] = useState(getUser);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user ? <LogOut /> : null}
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute isAllowed={!!user} />}>
              <Route path="/" element={<Grid />} />
              <Route path="products" element={<Grid />} />
            </Route>
            <Route path="login" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
