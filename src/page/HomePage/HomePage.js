import { Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BIRD from "vanta/dist/vanta.birds.min";
import Footer from "../../components/Footer";
import "./HomePage.css";

export default function HomePage() {
  const [vantaEffect, setVantaEffect] = React.useState(0);
  const myRef = React.useRef(null);
  React.useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRD({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xd112a,
          birdSize: 1.2,
          wingSpan: 14.0,
          quantity: 3.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="HomePage" ref={myRef}>
      <header>
        <h1 className="HomePage-title">LOGIN / REGISTER PAGE</h1>
        <h3 className="sponsor">Join Trung Hai's page now.</h3>
      </header>
      <Grid sx={{ py: 5 }}>
        <Link to="/login">
          <Button
            variant="contained"
            color="secondary"
            sx={{ mx: 2, px: 5, py: 2 }}
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            variant="contained"
            color="success"
            sx={{ mx: 2, px: 5, py: 2 }}
          >
            Register
          </Button>
        </Link>
      </Grid>
      <Footer />
    </div>
  );
}
