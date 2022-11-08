import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Navbar from "./components/Navbar";

import { getMe } from "./redux/features/auth/authSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    return (
        <div className="text-2xl text-red-600 px-10">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path=":id" element={<PostPage />} />
                    <Route path="posts" element={<PostsPage />} />
                    <Route path="new" element={<AddPost />} />
                    <Route path=":id/edit" element={<EditPost />} />
                </Routes>

                <ToastContainer position="bottom-right" />
            </Router>
        </div>
    );
}

export default App;
