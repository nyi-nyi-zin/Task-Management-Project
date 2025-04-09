import { TextField, Button, Box } from "@mui/material";
import { loginUser, registerUser } from "../../apicalls/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Alert } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AuthForm = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [processing, setProcessing] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (isLoginPage) {
      try {
        const response = await loginUser(values);

        if (response.isSuccess) {
          setMessage(response.message);
          setSeverity("success");
          setOpen(true);
          localStorage.setItem("token", response.token);
          dispatch(setUser(response.user));
          navigate("/profile");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        setMessage(err.message);
        setSeverity("error");
        setOpen(true);
      }
      setProcessing(false);
    } else {
      setProcessing(true);
      try {
        const response = await registerUser(values);
        if (response.isSuccess) {
          setMessage(response.message);
          setSeverity("success");
          setOpen(true);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        setMessage(err.message);
        setSeverity("error");
        setOpen(true);
      }
    }
    setProcessing(false);
  };

  return (
    <section className="w-full flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-bold mb-4 text-blue-600  w-[100vw] text-center ">
        {isLoginPage ? "LOGIN" : "REGISTER"}
      </h1>

      <div className=" w-[250px] mb-45 mr-29">
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{
            width: 100,
            height: 100,
            borderRadius: 1,
          }}
        >
          {open && (
            <Alert severity={severity} sx={{ mb: 2 }} className="w-92">
              {message}
            </Alert>
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            className="w-92 p-23"
            margin="normal"
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="w-92"
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={processing}
          >
            {isLoginPage && !processing && "Login"}
            {!isLoginPage && !processing && "Register"}
            {processing && isLoginPage && "Logging in ..."}
            {processing && !isLoginPage && "Registering ..."}
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default AuthForm;
