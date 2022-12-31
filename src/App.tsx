import { Route, Routes, Navigate } from "react-router-dom";
import routes from "./routes/routes";
import { Routes as RoutesEnum } from "./routes/routeTypes";

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.path === RoutesEnum.LANDING ? (
              <Navigate to={RoutesEnum.SIGNIN} />
            ) : (
              <route.screen />
            )
          }
        />
      ))}
    </Routes>
  );
}

export default App;
