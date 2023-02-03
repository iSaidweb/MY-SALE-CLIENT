import './signin.scss';
import { TextField, Button } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../reducers/userSlice';
function SignUP() {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        full_name: '',
        phone_number: '+998',
        password: '',
        repassword: '',
        phone_valid: false
    });
    function checkNumber(number) {
        setState({ ...state, phone_number: number, phone_valid: !matchIsValidTel(number) });
    }
    function Submit() {
        const { full_name, phone_number, password, repassword } = state;
        if (!full_name || !phone_number || !password || !repassword) {
            toast.error("Qatorlarni toldiring!");
        } else if (!/^[A-z\s]{3,}$/.test(full_name)) {
            toast.error("Ismingizni to'g'ri kiriting!");
        } else if (state.phone_valid) {
            toast.error("Raqamni to'g'ri kiritng!");
        } else if (!/^[A-z0-9'_''.']{6,}$/.test(password)) {
            toast.error("Parol kamida 6 ta ishoradan iborat bo'lsin!")
        } else if (password !== repassword) {
            toast.error("Parollar bir hil emas!");
        } else {
            dispatch(authenticate({ full_name, phone_number: phone_number.replaceAll(' ', ''), password, type: 'up' }));
        }
    }
    return (
        <div className="auth">
            <div className="container">
                <div className="cont">
                    <h2>RO'YHATDAN O'TISH</h2>
                </div>
                <div className="cont">
                    <TextField sx={{ bgcolor: '#fff', borderRadius: '4px' }} variant='outlined' label='Ismingiz' required fullWidth onChange={e => { setState({ ...state, full_name: e.target.value }) }} />
                </div>
                <div className="cont">
                    <MuiTelInput error={state.phone_valid} sx={{ bgcolor: '#fff', borderRadius: '4px' }} variant='outlined' label='Raqamingiz' required fullWidth value={state.phone_number} onChange={checkNumber} />
                </div>
                <div className="cont">
                    <TextField sx={{ bgcolor: '#fff', borderRadius: '4px' }} variant='outlined' label='Parolingiz' required type={'password'} fullWidth onChange={e => { setState({ ...state, password: e.target.value }) }} />
                </div>
                <div className="cont">
                    <TextField sx={{ bgcolor: '#fff', borderRadius: '4px' }} variant='outlined' label='Parolingizni qaytaring' required type={'password'} fullWidth onChange={e => { setState({ ...state, repassword: e.target.value }) }} />
                </div>
                <div className="cont">
                    <Button variant='contained' onClick={Submit}>
                        Qabul qilish
                    </Button>
                </div>
                <div className="cont">
                    <p>Ro'yhatdan o'tganmisiz? <Link to='/signin'>Kirish</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignUP;