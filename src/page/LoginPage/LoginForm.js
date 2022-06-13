import React, { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./LoginForm.css";
import LoginIcon from "@mui/icons-material/Login";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/sagas/userSaga/";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loading from "../../components/Loading";
import { IconButton } from "@mui/material";
export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [togglePw, setTogglePw] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("Please enter your Email")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid"
      ),
    password: yup
      .string()
      .trim()
      .required("Please enter your Password")
      .min(6, "Passwords must have at least 6 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(loginAction(data, enqueueSnackbar, navigate));
  };

  useEffect(() => {
    setLoading(true);
    const userDetails = localStorage.getItem("LOGIN_USER");
    if (userDetails) {
      navigate("/todopage");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const paperStyle = {
    magin: 20,
    height: 600,
    width: 500,
    padding: 10,
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#5a5d60a1",
    textAlign: "center",
  };
  const inputStyle = {
    input: {
      color: "#fff",
    },
    my: 2,
    fontWeight: 500,
  };
  const lalelStyle = {
    style: {
      color: "#fff",
    },
  };
  const showPassword = () => {
    setTogglePw(!togglePw);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid item xs={12} className="Login-container">
          <div className="Login-overlay ">
            <Grid
              component="form"
              sx={paperStyle}
              className="LoginForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="LoginForm-title">
                <span>
                  <LoginIcon sx={{ mx: 1 }} />
                </span>
                Log in
              </h2>
              <Grid sx={{ mt: 3, width: 1 }}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Email"
                  variant="filled"
                  sx={inputStyle}
                  InputLabelProps={lalelStyle}
                  {...register("email")}
                />
                {errors.email && (
                  <small className="message-error">
                    {errors.email?.message}
                  </small>
                )}
                <Grid position="relative">
                  <TextField
                    autoComplete="off"
                    type={togglePw ? "text" : "password"}
                    fullWidth
                    label="Password"
                    variant="filled"
                    sx={inputStyle}
                    InputLabelProps={lalelStyle}
                    {...register("password")}
                  />
                  <IconButton
                    className="show-hidden-pw"
                    sx={{ color: " #fff" }}
                    onClick={() => {
                      showPassword();
                    }}
                  >
                    {togglePw ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </Grid>
                {errors.password && (
                  <small className="message-error">
                    {errors.password?.message}
                  </small>
                )}
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                sx={{ my: 2 }}
                color="inherit"
              >
                Login
              </Button>
              <Grid sx={{ mt: 2 }}>
                <p className="linkto-register">
                  First time? <Link to="/register">Create an account</Link>.
                </p>
                <p>
                  <Link to="/">Back to Homepage</Link>.
                </p>
              </Grid>
            </Grid>
          </div>
          <Footer />
        </Grid>
      )}
    </>
  );
}
