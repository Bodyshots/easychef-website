import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import AnimatePage from '../../components/AnimatePage';

function Logout() {

    const { setAuth } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setAuth(false);
    }

    return (
        <AnimatePage>
            <Loading/>
            {logout() || navigate('/login')}
        </AnimatePage>
    );
  }
  
  export default Logout;