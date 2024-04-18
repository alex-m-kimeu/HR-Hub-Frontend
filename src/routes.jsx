import { SidebarAdmin } from "./Components/SideBar/SidebarAdmin";
import { SidebarEmployee } from "./Components/SideBar/SidebarEmployee";
import { Login } from "./pages/Login/Login"
import { DashboardAdmin } from "./pages/Dashboards/DashboardAdmin";
import { DashboardEmployee } from "./pages/Dashboards/DashboardEmployee";
import { Employees } from "./pages/Employees/Employees";
import { Hiring } from "./pages/Hiring/Hiring";
import { LeaveAdmin } from "./pages/Leave/LeaveAdmin";
import { LeaveEmployee } from "./pages/Leave/LeaveEmployee";
import { ReviewsAdmin } from "./pages/Reviews/ReviewsAdmin";
import { ReviewsEmployee } from "./pages/Reviews/ReviewsEmployee";

const routes = [
    {
        path: "/signin",
        Element: Login,
        isAuthenticated: false,
        layout: "None",
        role: null,
        Sidebar: null,
    },
    {
        path: "/admin/dashboard",
        Element: DashboardAdmin,
        isAuthenticated: true,
        layout: "Main",
        role: "admin",
        Sidebar: SidebarAdmin,
    },
    {
        path: "/employee/dashboard",
        Element: DashboardEmployee,
        isAuthenticated: true,
        layout: "Main",
        role: "employee",
        Sidebar: SidebarEmployee,
    },
    {
        path: "/employees",
        Element: Employees,
        isAuthenticated: true,
        layout: "Main",
        role: "admin",
        Sidebar: SidebarAdmin,
    },
    {
        path: "/hiring",
        Element: Hiring,
        isAuthenticated: true,
        layout: "Main",
        role: "admin",
        Sidebar: SidebarAdmin,
    },
    {
        path: "/admin/leave",
        Element: LeaveAdmin,
        isAuthenticated: true,
        layout: "Main",
        role: "admin",
        Sidebar: SidebarAdmin,
    },
    {
        path: "/employee/leave",
        Element: LeaveEmployee,
        isAuthenticated: true,
        layout: "Main",
        role: "employee",
        Sidebar: SidebarEmployee,
    },
    {
        path: "/admin/reviews",
        Element: ReviewsAdmin,
        isAuthenticated: true,
        layout: "Main",
        role: "admin",
        Sidebar: SidebarAdmin,
    },
    {
        path: "/employee/reviews",
        Element: ReviewsEmployee,
        isAuthenticated: true,
        layout: "Main",
        role: "employee",
        Sidebar: SidebarEmployee,
    },
];

export default routes;