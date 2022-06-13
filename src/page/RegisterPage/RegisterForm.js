import { Checkbox, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Register.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import MuiPhoneNumber from "material-ui-phone-number";
import { useForm } from "react-hook-form";
import { ReactPhoneInput } from "react-phone-input-mui";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/sagas/userSaga";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import Loading from "../../components/Loading";
export default function RegisterForm() {
  const [birthday, setBirthday] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [togglePw, setTogglePw] = useState(false);
  const dispatch = useDispatch();

  const handleChangeBirthday = (newValue) => {
    setBirthday(newValue);
  };

  const schema = yup.object().shape({
    firstname: yup
      .string()
      .required("First name can't be empty")
      .min(3, "First name must have at least 6 characters"),
    lastName: yup
      .string()
      .required("Last name can't be empty")
      .min(3, "Last name must have at least 6 characters"),
    email: yup
      .string()
      .trim()
      .required("Email can't be empty")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, //// emailRegExp
        "Email is invalid"
      ),
    password: yup
      .string()
      .trim()
      .required("Password can't be empty")
      .min(6, "Passwords must have at least 6 characters"),
    phone: yup
      .string()
      .trim()
      .required("Phone can't be empty")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Phone is invalid"), // phoneRegExp
    avatar: yup.string().trim().required("Avatar can't be empty"),
    schoolName: yup.string().trim().required("School name can't be empty"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(registerAction(data, enqueueSnackbar, resetform));
  };

  const resetform = () => {
    reset();
  };
  const showPassword = () => {
    setTogglePw(!togglePw);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const paperStyle = {
    magin: 20,
    height: 724,
    width: 500,
    padding: 2,
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#5a5d608f",
    textAlign: "center",
  };
  const inputStyle = {
    input: {
      color: "#fff",
    },
    my: 1,
    fontWeight: 500,
  };

  const lalelStyle = {
    style: {
      color: "#fff",
    },
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid item xs={12} className="Register-container">
          <div className="Register-overlay ">
            <Grid
              sx={paperStyle}
              className="RegisterForm"
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="RegisterForm-title">
                <span>
                  <PersonAddAltIcon sx={{ mx: 1 }} />
                </span>
                Register
              </h2>
              <Grid sx={{ mt: 2 }}>
                <Grid display="flex" flexDirection="row">
                  <TextField
                    autoComplete="off"
                    fullWidth
                    label="First Name"
                    variant="filled"
                    sx={inputStyle}
                    InputLabelProps={lalelStyle}
                    {...register("firstname")}
                  />

                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="filled"
                    sx={inputStyle}
                    InputLabelProps={lalelStyle}
                    {...register("lastName")}
                    autoComplete="off"
                  />
                </Grid>
                <Grid
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                >
                  {errors.firstname && (
                    <small className="message-error">
                      {errors.firstname?.message}
                    </small>
                  )}
                  {errors.lastName && (
                    <small className="message-error">
                      {errors.lastName?.message}
                    </small>
                  )}
                </Grid>
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
                    fullWidth
                    type={togglePw ? "text" : "password"}
                    label="Password"
                    variant="filled"
                    sx={inputStyle}
                    InputLabelProps={lalelStyle}
                    {...register("password")}
                  />
                  <IconButton
                    className="show-hidden-pw2"
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
                <Grid container display="flex" flexDirection="row">
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="Birthday"
                        inputFormat="yyyy-MM-dd"
                        value={birthday}
                        onChange={handleChangeBirthday}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            autoComplete="off"
                            sx={{
                              my: 1,
                              input: { color: "#fff" },
                              label: { color: "#fff" },
                            }}
                            variant="filled"
                            {...register("birthday")}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Phone"
                      type="tel"
                      variant="filled"
                      sx={{
                        my: 1,
                        input: {
                          color: "#fff",
                        },
                      }}
                      InputLabelProps={lalelStyle}
                      {...register("phone")}
                    />
                  </Grid>
                  <Grid width={1}>
                    {errors.phone && (
                      <small className="message-error">
                        {errors.phone?.message}
                      </small>
                    )}
                  </Grid>
                </Grid>
                <Grid container display="flex" flexDirection="row">
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Avatar"
                      variant="filled"
                      sx={inputStyle}
                      InputLabelProps={lalelStyle}
                      {...register("avatar")}
                    />
                    {errors.avatar && (
                      <small className="message-error">
                        {errors.avatar?.message}
                      </small>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="School"
                      variant="filled"
                      sx={inputStyle}
                      InputLabelProps={lalelStyle}
                      {...register("schoolName")}
                    />
                    {errors.schoolName && (
                      <small className="message-error">
                        {errors.schoolName?.message}
                      </small>
                    )}
                  </Grid>
                </Grid>

                {/* <MuiPhoneNumber
              fullWidth
              label="Phone Number"
              defaultCountry={"vn"}
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff", pl: 2 },
                mt: 3,
                pl: 2,
              }}
              value={phone}
              onChange={handlePhoneChange}
              {...register("phone")}
            /> */}
              </Grid>
              <Grid>
                <Checkbox color="default" required />
                <span>
                  I agree all statements in {""}
                  <a
                    href="https://google.com"
                    className="linkto-terms"
                    target="_blank"
                  >
                    terms of service
                  </a>
                  .
                </span>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ my: 2 }}
                color="inherit"
              >
                Register
              </Button>
              <p className="linkto-login">
                Already account? <Link to="/login">Login</Link>
              </p>
              <p>
                <Link to="/">Back to Homepage</Link>
              </p>
            </Grid>
          </div>
          <Footer />
        </Grid>
      )}
    </>
  );
}
