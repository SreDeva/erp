import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Navigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    //const [reg, setReg]= useState('');
    const [password, setPassword] = useState('');
    //const [con_password, setConPassword] = useState('')
    const {signup, error, isLoading} = useSignup();
    const [redirectToProfile, setRedirectToProfile] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password)
        //await signup(email, reg, password, con_password)
        setRedirectToProfile(true);
    }

    if (redirectToProfile) {
        return <Navigate to="/createProfile" />;
    }

    return ( 
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            {/* <label>Register No:</label>
            <input
                type="number"
                onChange={(e) => setReg(e.target.value)}
                value={reg}
            /> */}
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {/* <label>Confirm Password:</label>
            <input
                type="password"
                onChange={(e) => setConPassword(e.target.value)}
                value={con_password}
            /> */}

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default Signup;