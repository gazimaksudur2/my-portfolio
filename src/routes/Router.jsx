import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        loader: () => {
            throw new Response("Not Found", { status: 404 });
        },
        errorElement: <ErrorPage />,
    },
]);

export default router;