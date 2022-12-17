import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel } from "@mui/material";
import axios from "axios";
import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../App";
import jwt_decode from "jwt-decode";
import { Auth } from "../auth/Auth";
import FormControl from "@mui/material/FormControl";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
const NavigationBar = (props) => {
  const { setAccessToken, accessToken, searchQueryGlobal, setSearchQueryGlobal } = useContext(AppContext);
  const [searchLocation, setSearchLocation] = useState();
  const [locations, setLocations] = useState([]);
  const [prev, setPrev] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decode = jwt_decode(accessToken);
      console.log("decoded=>", decode);
    } catch (e) {
      console.log(e);
    }
    axios
      .get("/locations")
      .then((item) => {
        setLocations(item.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const search = () => {
    if (searchQueryGlobal.length > 0 && searchLocation == undefined) {
      navigate(`/search/${searchQueryGlobal}`);
    } else if (searchQueryGlobal.length > 0 && searchLocation !== undefined) {
      navigate(`/search/${searchQueryGlobal}/${searchLocation}`);
    }
  };
  const logout = async () => {
    try {
      const response = await axios.delete(
        "/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("logout => ", response);
      if (response.status === 200 || response.status === 204) {
        setAccessToken(null);

        navigate("/login");
      }
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar expand="lg" fixed="top" className=" bg-gradient" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #D3D3D3" }}>
        <Container>
          <Navbar.Brand href="/">SHARE IT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav " className="">
            <Form className="d-flex m-auto">
              <Form.Control
                style={{ height: "40px" }}
                type="search"
                placeholder="Search Businesses..."
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setSearchQueryGlobal(e.target.value);
                }}
              />
              {/* <InputLabel sx={{ minWidth: "100px" }} id="select-label">
                Locations:
              </InputLabel> */}
              <Select
                sx={{ height: "40px" }}
                labelId="select-label"
                id="locationsSelect"
                label="Locations"
                onChange={(e) => setSearchLocation(e.target.value)}
              >
                <MenuItem value={null} selected>
                  All Cities
                </MenuItem>

                {locations.length > 1 &&
                  locations.map((item) => {
                    return <MenuItem value={item.location_id}>{item.location_name}</MenuItem>;
                  })}
              </Select>

              <Button
                disabled={searchQueryGlobal.length > 0 ? false : true}
                sx={{ fontSize: 16, marginLeft: 2, color: "#52ab98", fontWeight: "550" }}
                onClick={() => {
                  search();
                }}
              >
                Search
              </Button>
            </Form>
            <Nav className="p-2 ms-auto">
              <Button
                sx={{
                  color: "#52ab98",
                  fontWeight: "550",
                  "&:hover": {
                    color: "#52ab98",
                  },
                }}
                component={Link}
                to="/categories"
              >
                Categories
              </Button>
              {accessToken && (
                <>
                  {jwt_decode(accessToken).role == "user" ? (
                    <>
                      <Button sx={{ color: "#52ab98", fontWeight: "bold" }} component={Link} to={`/userpage/${jwt_decode(accessToken).id}`}>
                        {jwt_decode(accessToken).email}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#52ab98",
                          "&:hover": {
                            color: "#52ab98",
                          },
                        }}
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div>
                      <Button sx={{ color: "#52ab98" }} component={Link} to={`/business/${jwt_decode(accessToken).id}`}>
                        {jwt_decode(accessToken).email}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#52ab98",
                          "&:hover": {
                            color: "#52ab98",
                          },
                        }}
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </>
              )}

              {!accessToken && (
                <>
                  <Button
                    sx={{
                      color: "#52ab98",
                      fontWeight: "550",
                      "&:hover": {
                        color: "#52ab98",
                      },
                    }}
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#52ab98",
                      "&:hover": {
                        backgroundColor: "#52ab98",
                        color: "white",
                      },
                    }}
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
