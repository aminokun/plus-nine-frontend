import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Quest from "../pages/Quest";
import Friends from "../pages/Friends";
import User from "../pages/User";
import Register from "../pages/Register";
import Premium from "../pages/Premium";
import Success from "../pages/Success";
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
                        <Route
                            path="/friends"
                            element={
                                <ProtectedRoute>
                                    <Friends />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/user"
                            element={
                                <ProtectedRoute>
                                    <User />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/success"
                            element={
                                <ProtectedRoute>
                                    <Success />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/premium" element={<Premium />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    )
}
