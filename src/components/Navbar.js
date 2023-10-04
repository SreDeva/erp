import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout();
    }

    return (  
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Sri Eshwar</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link to="/Attendance">
                                Attendance
                            </Link>
                            <Link to="/Course&Venue">
                            Course&Venue
                            </Link>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    { !user && (
                        <div>
                            <Link to="/login">
                                Login
                            </Link>
                            <Link to="/signup">
                                Signup
                            </Link>
                            <Link to="/admin">
                                Admin
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
 
export default Navbar;