import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/user_site/Layout";
import LandingPage from "../pages/user_site/LandingPage";
import AboutPage from "../pages/user_site/AboutPage";
import HelpPage from "../pages/user_site/HelpPage";
import UserDashBoardLayout from "../layouts/user_dashboard/UserDashBoardLayout";
import UserHome from "../pages/userDashboard/UserHome";
import AddCarPage from "../pages/userDashboard/AddCarPage";
import SpecificCar from "../pages/userDashboard/SpecificCar";
import SignUpPage from "../pages/userDashboard/SignUpPage";
import SuccessPage from "../pages/userDashboard/SuccessPage";
export const routes = createBrowserRouter([
    {
        path:"/",
        element: <Layout /> ,
        children: [
            {
                path: "",
                element: <LandingPage />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/help",
                element: <HelpPage/>
            },
            {
                path: '/sign-up', 
                element: <SignUpPage />
            },
            {
                path: '/sucess',
                element: <SuccessPage />
            }
        ]
    },
    {
        path: '/dashboard/',
        element: <UserDashBoardLayout />,
        children: [
            {
                path: "",
                element: <UserHome />
            },
            {
                path: 'add',
                element: <AddCarPage />
            },
            {
                path: 'car',
                element: <SpecificCar />
            }
        ]
    }
])