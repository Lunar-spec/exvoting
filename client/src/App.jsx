import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Components/Navbar/Navbar';
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Admin from "./pages/Admin/Admin"
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin"
import NotFound from './pages/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'


function App() {

    const userData = localStorage.getItem('role')

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                {
                    userData === 'superadmin' ?
                        (
                            <Route path="/superadmin" element={<SuperAdmin />} />
                        )
                        :
                        userData === 'constituency_admin' ?
                            (
                                <Route path="/admin" element={<Admin />} />
                            )
                            :
                            (
                                <Route path='/' element={<Navigate to={<Login/>} replace/>} />
                            )
                }
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App