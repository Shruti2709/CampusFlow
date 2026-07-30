import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import StudentDashboard from "../pages/StudentDashboard";
import Companies from "../pages/Companies";
import Students from "../pages/Students";
import PlacementDrives from "../pages/PlacementDrives";
import Interviews from "../pages/Interviews";
import StudentProfile from "../pages/StudentProfile";
import Events from "../pages/Events";
import Complaints from "../pages/Complaints";
import LostFound from "../pages/LostFound";

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";


export default function AppRoutes(){

return(

<Routes>


<Route
path="/"
element={<LandingPage/>}
/>


<Route
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>


{/* Every route below shares the same sidebar/topbar layout */}
<Route
element={
<ProtectedRoute>
<AppLayout/>
</ProtectedRoute>
}
>

<Route
path="/dashboard"
element={
<ProtectedRoute roles={["admin","recruiter"]}>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/student-dashboard"
element={
<ProtectedRoute roles={["student"]}>
<StudentDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/companies"
element={<Companies/>}
/>

<Route
path="/students"
element={
<ProtectedRoute roles={["admin","recruiter"]}>
<Students/>
</ProtectedRoute>
}
/>

<Route
path="/drives"
element={<PlacementDrives/>}
/>

<Route
path="/interviews"
element={<Interviews/>}
/>

<Route
path="/profile"
element={
<ProtectedRoute roles={["student"]}>
<StudentProfile/>
</ProtectedRoute>
}
/>

<Route
path="/student-profile"
element={
<ProtectedRoute roles={["student"]}>
<StudentProfile/>
</ProtectedRoute>
}
/>

<Route
path="/events"
element={
<ProtectedRoute roles={["admin","student"]}>
<Events/>
</ProtectedRoute>
}
/>

<Route
path="/complaints"
element={
<ProtectedRoute roles={["admin","student"]}>
<Complaints/>
</ProtectedRoute>
}
/>

<Route
path="/lost-found"
element={
<ProtectedRoute roles={["admin","student"]}>
<LostFound/>
</ProtectedRoute>
}
/>

</Route>


</Routes>

);

}
