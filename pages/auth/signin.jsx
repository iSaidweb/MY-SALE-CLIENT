import './signin.scss';
import { TextField, Button } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../reducers/userSlice';
function SignIN() {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        full_name: '',
        phone_number: '+998',
        password: '',
        phone_valid: false
    });
    function checkNumber(number) {
        setState({ ...state, phone_number: number, phone_valid: !matchIsValidTel(number) });
    }
    function Submit() {
        const {phone_number, password} = state;
        if (!phone_number || !password ) {
            toast.error("Qatorlarni toldiring!");
        } else if (state.phone_valid) {
            toast.error("Raqamni to'g'ri kiritng!");
        } else {
            dispatch(authenticate({ phone_number: phone_number.replaceAll(' ', ''), password, type: 'in' }));
        }
    }
    return (
        <div className="auth">
            <div className="container">
                <div className="cont">
                    <h2>KIRISH</h2>
                </div>
                <div className="cont">
                    <MuiTelInput error={state.phone_valid} sx={{ bgcolor: '#fff', borderRadius: '4px' }} variant='outlined' label='Raqamingiz' required fullWidth value={state.phone_number} onChange={checkNumber} />
                </div>
                <div className="cont">
                    <TextField sx={{ bgcolor: '#fff', borderRadius: '4px' }} variant='outlined' label='Parolingiz' required type={'password'} fullWidth onChange={e => { setState({ ...state, password: e.target.value }) }} />
                </div>
                <div className="cont">
                    <Button variant='contained' onClick={Submit}>
                        Qabul qilish
                    </Button>
                </div>
                <div className="cont">
                    <p>Profilingiz yo'qmi? <Link to='/signup'>Ro'yhatdan o'tish</Link></p>
                </div>
                <div className="cont">
                    <p>Parolni unutdingizmi? <Link to='/recovery'>Qayta tiklash</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignIN;