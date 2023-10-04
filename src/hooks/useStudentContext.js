import { StudentContext } from "../context/studentContext";
import { useContext } from "react";

export const useStudentsContext = () => {
    const context = useContext(StudentContext);

    if (!context) {
        throw new Error('useStudentssContext must be used inside a StudentContextProvider');
    }

    return context;
}
