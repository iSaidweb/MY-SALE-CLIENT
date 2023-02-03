import { Button, IconButton, Menu as MenuItems, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.scss';
import { useDispatch, useSelector } from 'react-redux'
import { setShow } from '../../reducers/settingSlice';
import { DataArray, ListAlt, Login, Mail, Menu, Person, PersonAdd, PersonSearch, Settings } from '@mui/icons-material'
import { useState } from 'react';
function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const is_auth = useSelector(state => state.user.is_auth);
    const is_admin = useSelector(state => state.user.is_admin);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                        <>
                            {
                                is_admin ?
                                    <>
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            variant='contained'
                                            onClick={handleClick}
                                            sx={{ mr: '10px', bgcolor: '#2fa71a', ':hover': { bgcolor: '#1a7709' } }}
                                        >
                                            Sozlamalar
                                            <Settings/>
                                        </Button>
                                        <MenuItems
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={()=>{handleClose();navigate('/admin-category')}}>
                                                <ListAlt/>
                                                Kategoriyalar
                                            </MenuItem>
                                            <MenuItem onClick={()=>{handleClose();navigate('/admin-products')}}>
                                                <DataArray/>
                                                E'lonlar
                                            </MenuItem>
                                            <MenuItem onClick={()=>{handleClose();navigate('/admin-users')}}>
                                                <PersonSearch/>
                                                Foydalanuvchilar
                                            </MenuItem>
                                            <MenuItem onClick={()=>{handleClose();navigate('/admin-requests')}}>
                                                <Mail/>
                                                Arizalalr
                                            </MenuItem>
                                        </MenuItems>
                                    </> : null
                            }
                            <Button variant='contained' onClick={() => navigate('/profile')}>
                                Profil
                                <Person />
                            </Button>
                        </>
                }
                <IconButton onClick={() => { dispatch(setShow('aside')) }}>
                    <Menu />
                </IconButton>
            </div>
        </nav >
    );
}

export default Navbar;