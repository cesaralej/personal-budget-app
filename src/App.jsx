import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/expenses" element={<ExpensesPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
