import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { onChecking, onLogin, onLogout, claerErrorMessage, onLogoutCalendar } from '../store';



export const useAuthStore = () => {

    const { status, user, errorMessage, } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());


        try {

            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }))
            
            


        } catch (error) {

            dispatch(onLogout('Wrong credentials'));
            setTimeout(() => {
                dispatch(claerErrorMessage())
            }, 10);


        }

    }

    const startRegister = async ({ name, email, password }) => {
        
        dispatch(onChecking());


        try {

            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {

            dispatch(onLogout(error.response.data?.msg || 'Wrong credentials'));
            setTimeout(() => {
                dispatch(claerErrorMessage())
            }, 10);


        }

    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());


        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            localStorage.clear();
            return dispatch(onLogout());

        }


    }

    const startLogout = async ({ name, email, password }) => {

        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());

    }





    return {

        //Propiedades
        errorMessage,
        status,
        user,


        //Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout


    }
}
