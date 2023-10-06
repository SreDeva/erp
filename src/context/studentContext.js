import { createContext, useReducer } from "react";

export const StudentContext = createContext();

export const studentsReduser = (state, action) => {
    switch (action.type) {
        case 'SET_STUDENT':
            return {
                students: action.payload
           }
        case 'CREATE_WORKOUT':
            return {
                students: [action.payload, ...state.students]
            }
        case 'DELETE_WORKOUT':
            return {
                students: state.students.filter((s) => s._id !== action.payload._id)
            }
        default:
            return state;
    }
}

const StudentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(studentsReduser, {
        students: null
    })

    return (  
        <StudentContext.Provider value={{...state, dispatch}}>
            {children }
        </StudentContext.Provider>
    );
}
 
export default StudentContextProvider;