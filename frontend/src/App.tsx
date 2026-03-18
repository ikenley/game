import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./auth/AuthContext";
import { ApiClientContextProvider } from "./hooks/ApiClientContext";
import theme from "./theme";
import PrivateRoute from "./auth/PrivateRoute";
import MemoryPage from "./memory/MemoryPage";
import WhackaMolePage from "./mole/WhackaMolePage";
import AnimalPage from "./animal/AnimalPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/game/animal",
    element: (
      <PrivateRoute>
        <AnimalPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/whack-a-mole",
    element: (
      <PrivateRoute>
        <WhackaMolePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/game/memory",
    element: (
      <PrivateRoute>
        <MemoryPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/game",
    element: (
      <PrivateRoute>
        <MemoryPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MemoryPage />
      </PrivateRoute>
    ),
  },
]);

const App = () => {
  // // Log API info
  // useEffect(() => {
  //   const getApiInfo = async () => {
  //     const res = await axios.get(`${config.apiPrefix}/status/info`);
  //     console.log("res", res);
  //   };
  //   getApiInfo();

  //   console.log(`VERSION`, config.version);
  // }, []);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ApiClientContextProvider>
            <AuthContextProvider>
              <CssBaseline />
              <RouterProvider router={router} />
              <ToastContainer />
            </AuthContextProvider>
          </ApiClientContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
