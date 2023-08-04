import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Button from "@mui/material/Button";
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

        // Check if the cookie starts with the provided name
        if (cookie.indexOf(cookieName + "=") === 0) {
          // Extract the value of the cookie
          var cookieValue = cookie.substring(cookieName.length + 1);
          // Decode the URL-encoded value
          var decodedValue = decodeURIComponent(
            cookieValue.replace(/\+/g, " ")
          );
          // Parse the JSON and access the "user" property
          var parsedValue = JSON.parse(decodedValue);
          return parsedValue.user;
        }
      }

      // Cookie not found
      return null;
    }
    setUsername(getCookieValue("_auth_state"));
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div></div>
        <div className="items">
          <div className="username">{username}</div>
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1582224971369-c09ca872751f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&w=1000&q=80"
              alt=""
              className="avatar"
            />
          </div> */}

          <Button variant="contained" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
