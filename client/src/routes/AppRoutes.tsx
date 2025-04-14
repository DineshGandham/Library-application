import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import LoginPage from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    )
}

export default AppRoutes;
