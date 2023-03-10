import { Route, Routes } from "react-router-dom";
import Aside from "./components/aside/aside";
import Navbar from "./components/navbar/navbar";
import SignUP from "./pages/auth/signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './reducers/userSlice';
import { useEffect } from "react";
import axios from 'axios'
import SignIN from "./pages/auth/signin";
import Pannel from "./admin/pannel";
function Main() {
    const dispatch = useDispatch();
    useEffect(() => {
        axios(
            'http://localhost:5000/api/auth/check',
            {
                headers: {
                    'x-auth-token': localStorage.getItem('ACCESS_TOKEN')
                }
            }
        ).then(res => {
            dispatch(checkAuth(res.data))
        }).catch(err => {
            console.log(err);
        });
    }, [dispatch])
    const is_auth = useSelector(state => state.user.is_auth);
    const is_admin = useSelector(state => state.user.is_admin);
    return (
        <>
            <Navbar />
            <Aside />
            <Routes>
                <Route exact path="/signup" element={!is_auth ? <SignUP /> : null} />
                <Route exact path="/signin" element={!is_auth ? <SignIN /> : null} />
                <Route exact path="/admin" element={is_admin ? <Pannel /> : null} />
            </Routes>
            <ToastContainer autoClose={1500} position={'top-center'} />
        </>
    );
}

export default Main;