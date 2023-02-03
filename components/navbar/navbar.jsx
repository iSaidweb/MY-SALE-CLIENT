import { Button, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.scss';
import { useDispatch, useSelector } from 'react-redux'
import { setShow } from '../../reducers/settingSlice';
import { Login, Menu, Person, PersonAdd } from '@mui/icons-material'
function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const is_auth = useSelector(state => state.user.is_auth);
    return (
        <nav>
            <div className="logo">
                <Link to='/'>
                    <h1>MY<b>SALE</b></h1>
                </Link>
            </div>
            <div className="links">
                {
                    !is_auth ?
                        <>
                            <Button variant='contained' sx={{ mr: '10px', bgcolor: '#2fa71a', ':hover': { bgcolor: '#1a7709' } }} onClick={() => navigate('/signup')}>
                                Ro'yhatdan o'tish
                                <PersonAdd />
                            </Button>
                            <Button variant='contained' sx={{ mr: '10px' }} onClick={() => navigate('/signin')}>
                                Kirish
                                <Login />
                            </Button>
                        </> :
                        <Button variant='contained' onClick={() => navigate('/profile')}>
                            Profil
                            <Person />
                        </Button>
                }
                <IconButton onClick={() => { dispatch(setShow('aside')) }}>
                    <Menu />
                </IconButton>
            </div>
        </nav>
    );
}

export default Navbar;