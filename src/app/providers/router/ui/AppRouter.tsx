import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routerConfig/routerConfig";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => {
          return (
            <Route
              key={path}
              element={<div className="page-wrapper">{element}</div>}
              path={path}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
