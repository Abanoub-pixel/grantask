import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Navigate } from "react-router-dom";
import AppContext from "../AppContext";
import { service } from "../service";
const useStyles = makeStyles((theme) => ({
  signInBox: {
    marginTop: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 10,
    backgroundColor: "gray",
  },
  form: {
    marginTop: 1,
  },
  submtBtn: {
    marginTop: 10,
  },

  containerGrid: {
    marginTop: 10,
  },
  errorBtn: {
    color: "red",
    display: "block",
    textAlign: "center",
  },
}));

export default function LogIn() {
  const [isLoginingIn, setIsLogingIn] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = React.useContext(AppContext);
  const classes = useStyles();
  if (user) return <Navigate to="/products" />;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLogingIn(true);
    const data = new FormData(event.currentTarget);
    service
      .fetchLogin(data.get("email"), data.get("password"))
      .then((res) => {
        if (!res.ok) {
          setIsLogingIn(false);
          throw new Error("Wrong username or password");
        }
        return res.json();
      })
      .then((res) => {
        setUser(res);
        setIsLogingIn(false);
        setError(null);
        localStorage.setItem("user", JSON.stringify(res));
      })
      .catch((er) => setError(er));
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.signInBox}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className={classes.form}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submtBtn}
            disabled={isLoginingIn}
          >
            Sign In
          </Button>
          <Grid container className={classes.containerGrid}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                "Don't have an account? Sign Up"
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error ? (
        <Typography className={classes.errorBtn} variant="h6">
          {error.message}
        </Typography>
      ) : null}
    </Container>
  );
}
