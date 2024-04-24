import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quest from "../pages/Quest";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quest" element={<Quest />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
