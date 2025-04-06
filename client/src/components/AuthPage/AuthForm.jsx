import { TextField, Button, Box } from "@mui/material";
import { loginUser, registerUser } from "../../apicalls/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";

const AuthForm = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (isLoginPage) {
      try {
        const response = await loginUser(values);
        console.log(response);
        if (response.isSuccess) {
          localStorage.setItem("token", response.token);
          dispatch(setUser(response.user));
          navigate("/profile");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        console.log(err.message);
        alert(err.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSuccess) {
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {}
    }
  };

  return (
    <section className=" w-full flex mt-40 justify-center">
      <div className=" w-[250px]">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>

        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{
            width: 100,
            height: 100,
            borderRadius: 1,
          }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            className="w-100 p-23"
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            required
            className="w-100"
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            {isLoginPage ? "Login" : "Register"}
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default AuthForm;
