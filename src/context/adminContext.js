import { createContext, useReducer } from "react";

export const AdminContext = createContext();

export const adminReduser = (state, action) => {
    switch (action.type) {
        case 'SET_STUDENTS':
            return {
                students: action.payload
            }
        case 'CREATE_STUDENT':
            return {
                students: [action.payload, ...state.students]
            }
        case 'DELETE_STUDENT':
            return{
                students: state.students.filter((w) => w._id!==action.payload._id)
            }
        default:
            return state;
    }
}

const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminReduser, {
        students: null
    })

    return (  
        <AdminContext.Provider value={{...state, dispatch}}>
            {children }
        </AdminContext.Provider>
    );
}
 
export default AdminContextProvider;