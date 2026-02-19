import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * Login Component
 * functional component that renders an email/password login form.
 * sends credentials to the backend
 * if its succeddfull, it stores the jwt token and redirects based on the role
 */
export default function Login() {
  //state will manage inputs and message display
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // handle login process and send email/password to backend
  const onLoginClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      //store jwt token for authenicated request
      localStorage.setItem("token", response.data.token);
      // store the role
      localStorage.setItem("role", response.data.user.role);
      // create new event
      window.dispatchEvent(new Event("storage"));

      // message
      setMessage(
        <span style={{ color: "green" }}>Successfully Logged-in</span>,
      );

      //redirect based on the role of user
      if (response.data.user.role === "admin") {
        // go to dashboard
        navigate("/dashboard");
      } else {
        // go to carsList
        navigate("/");
      }
    } catch (error) {
      //invalid login or a server error
      setMessage(<span style={{ color: "red" }}>Invalid login</span>);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 8 }}>
        {/*form title */}
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {/*email input field */}
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {/*password input field */}

        <TextField
          fullWidth
          type="password"
          label="password"
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {/*login button */}
        <Box textAlign="right" mt={2}>
          {/*submit button triggers onLoginClick */}
          <Button variant="contained" sx={{ ml: 2 }} onClick={onLoginClick}>
            Login
          </Button>
        </Box>
        <Box textAlign="right" mt={2}>
          <Button variant="text" onClick={() => navigate("/create-account")}>
            Create account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
