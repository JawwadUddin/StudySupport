import "./navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useSignOut } from "react-auth-kit";
import { useEffect, useState } from "react";

const Navbar = () => {
  const signOut = useSignOut();
  const [username, setUsername] = useState("");

  useEffect(() => {
    function getCookieValue(cookieName) {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.indexOf(cookieName + "=") === 0) {
          var cookieValue = cookie.substring(cookieName.length + 1);
          var decodedValue = decodeURIComponent(
            cookieValue.replace(/\+/g, " ")
          );
          var parsedValue = JSON.parse(decodedValue);
          return parsedValue.user;
        }
      }

      return null;
    }
    setUsername(getCookieValue("_auth_state"));
  }, []);

  return (
    <header className="navbar">
      <div className="navbarInner">
        <div />
        <div className="navbarRight">
          <div className="navbarUser">
            <AccountCircleOutlinedIcon className="navbarUserIcon" />
            <span className="navbarUsername">{username}</span>
          </div>
          <button className="navbarSignOut" onClick={() => signOut()}>
            <LogoutIcon className="navbarSignOutIcon" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
