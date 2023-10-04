import { useAuthContext } from "./useAuthContext";
import { useStudentsContext } from './useStudentContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: studentsDispatch } = useStudentsContext();

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');
        
        //dispatch action
        dispatch({type: 'LOGOUT'})
        studentsDispatch({type: 'SET_STUDENTS', payload: null})
    }

    return {logout}
}