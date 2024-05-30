import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Quest from "../pages/Quest";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Navbar from "@/components/Navbar";


export default function AppRoutes() {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/quest"
                            element={
                                <ProtectedRoute>
                                    <Quest />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    )
}
