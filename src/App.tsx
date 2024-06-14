import { Suspense, lazy } from "react"
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

const ContractDetails = lazy(() => import("./pages/ContractDetails"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route path="/" element={<Home />} />
      <Route path="contracts/:contractId" element={<ContractDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
