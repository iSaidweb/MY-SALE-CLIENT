import './aside.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { setShow } from '../../reducers/settingSlice';
import { Link } from 'react-router-dom';
function Aside() {
    const show = useSelector(state => state.setting.aside);
    const is_auth = useSelector(state => state.user.is_auth);
    const dispatch = useDispatch()
    return (
        <>
            <aside className={!show ? null : 'active'}>
                <div className="close-btn">
                    <IconButton onClick={() => dispatch(setShow('aside'))}>
                        <Close sx={{ fontSize: '25px' }} />
                    </IconButton>
                </div>
                <div className="links">
                    <Link to='/allposts'>
                        Barcha e'lonlar
                    </Link>
                    <Link to='/lastnews'>
                        So'ngi e'lonlar
                    </Link>
                    <Link to='/vacancy'>
                        Vakansiyalar
                    </Link>
                    <Link to='/projects'>
                        Sotuvdagi loyihalar
                    </Link>
                    <Link to='/about'>
                        MYSALE haqida
                    </Link>
                    <Link to='/forpartners'>
                        Hamkorlar & Hamkorlik
                    </Link>
                    {
                        is_auth ?
                            <Link to='/signin' onClick={()=>{
                                localStorage.removeItem('ACCESS_TOKEN')
                                window.location.reload();
                            }}>
                                Chiqish
                            </Link>
                            :null
                    }
                </div>
            </aside>
            <div className={!show ? "menu-closer" : "menu-closer active"} onClick={() => dispatch(setShow('aside close'))}></div>
        </>
    );
}

export default Aside;