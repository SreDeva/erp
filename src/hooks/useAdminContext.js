import { AdminContext } from "../context/adminContext";
import { useContext } from "react";

export const useAdminContext = () => {
    const context = useContext(AdminContext);

    if (!context) {
        throw new Error('useStudentssContext must be used inside a StudentContextProvider');
    }

    return context;
}
