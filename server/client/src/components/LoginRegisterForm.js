import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Select, Typography } from "@mui/material";
import { MenuItem, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { AppContext } from "../App";
import LoginIcon from "@mui/icons-material/Login";
import { shadows } from "@mui/system";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Fade from "react-reveal/Fade";
import Checkbox from "@mui/material/Checkbox";
import YearSelect from "./YearSelect";
const LoginRegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [msg, setMsg] = useState("");
  const [description, setDescription] = useState("");
  const [locationId, setLocationId] = useState("");
  const [customerContactEmail, setCustomerContactEmail] = useState("");
  const [customerContactPhone, setCustomerContactPhone] = useState("");
  const [about, setAbout] = useState("");
  const [activeSince, setActiveSince] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const { setAccessToken } = useContext(AppContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetch("/categories")
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((e) => {
        console.log(e);
      });

    fetch("/locations")
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setLocations(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleClick = async () => {
    if (props.title === "Register") {
      try {
        const response = await axios.post(
          "/register",
          {
            email,
            password,
            fname,
            lname,
            about,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response->", response);
        setMsg("");
        navigate("/login");
      } catch (e) {
        setMsg(e.response.data.msg);
      }
    } else if (props.title === "Login") {
      try {
        const response = await axios.post(
          "/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.token);
        if (response.status === 200) {
          setAccessToken(response.data.token);

          navigate("/");
        }
      } catch (e) {
        setMsg(e.response.data.msg);
      }
    } else if (props.title === "Business Login") {
      try {
        const response = await axios.post(
          "/loginBusiness",
          {
            email,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.token);
        if (response.status === 200) {
          setAccessToken(response.data.token);
          // setBuisnessLogged(true);
          navigate("/");
        }
      } catch (e) {
        setMsg("Email or Password not correct");
      }
    } else {
      try {
        const response = await axios.post(
          "/registerNewBusiness",
          {
            email: email,
            password: password,
            businessName: businessName,
            categoryId: categoryId,
            businessLocation: locationId,
            businessDescription: description,
            customerContactEmail: customerContactEmail,
            customerContactPhone: customerContactPhone,
            activeSince: activeSince,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response->", response);
        setMsg("");
        navigate("/businesslogin");
      } catch (e) {
        console.log(e.response.data.msg);
        setMsg(e.response.data.msg);
      }
    }
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 5, minHeight: "70vh" }}>
      <Box
        component={"form"}
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "40vw",
          minHeight: "10vw",
          backgroundColor: "white",
          borderRadius: 9,
          alignSelf: "center",
        }}
        noValidate
        autoComplete={"off"}
      >
        <Fade big>
          <Box>
            {props.title === "Register" && (
              <Box sx={{ minHeight: 300, display: "flex", justifyContent: "center", alignItems: "flex-end", m: 2 }}>
                <Box sx={{ maxWidth: 600, maxHeight: 400 }}>
                  <AppRegistrationIcon sx={{ color: "black" }} />
                  <Typography variant="h4" color="black" sx={{ padding: 1, marginBottom: 1 }}>
                    {props.title}
                  </Typography>
                  <TextField
                    required
                    sx={{ m: 1 }}
                    id="fname"
                    label="Enter First Name"
                    variant="outlined"
                    onChange={(e) => setFname(e.target.value)}
                  />
                  <TextField
                    required
                    sx={{ m: 1 }}
                    id="lname"
                    label="Enter Last Name"
                    variant="outlined"
                    onChange={(e) => setLname(e.target.value)}
                  />

                  <TextField
                    required
                    sx={{ m: 1 }}
                    id="email"
                    label="Enter Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    required
                    sx={{ m: 1 }}
                    id="about"
                    label="About yourself/Quote"
                    variant="outlined"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <TextField
                    required
                    sx={{ m: 1 }}
                    id="password"
                    label="Enter Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    type={checked ? "text" : "password"}
                  />
                  <FormControlLabel control={<Checkbox />} label="Show Password" checked={checked} onChange={handleChange} sx={{ m: 2 }} />
                </Box>
              </Box>
            )}
            {props.title === "Login" && (
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
                  <Box>
                    <LoginIcon sx={{ color: "black " }} />
                    <Typography variant="h4" color="black" sx={{ padding: 1, marginBottom: 3 }}>
                      {props.title}
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      required
                      sx={{ m: 1, border: "#73BAB1", color: "#73BAB1" }}
                      id="email"
                      label="Enter Email"
                      variant="outlined"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      required
                      sx={{ m: 1 }}
                      id="password"
                      label="Enter Password"
                      variant="outlined"
                      onChange={(e) => setPassword(e.target.value)}
                      type={checked ? "text" : "password"}
                    />

                    <FormControlLabel
                      control={<Checkbox />}
                      label="Show Password"
                      checked={checked}
                      onChange={handleChange}
                      sx={{ m: 2 }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {props.title === "Business Login" && (
              <Box>
                <LoginIcon />
                <Typography variant="h4" color="black" sx={{ padding: 1, marginBottom: 2 }}>
                  {props.title}
                </Typography>
                <TextField
                  required
                  sx={{ m: 1 }}
                  id="email"
                  label="Enter Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  sx={{ m: 1 }}
                  id="password"
                  label="Enter Password"
                  variant="outlined"
                  type={checked ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel control={<Checkbox />} label="Show Password" checked={checked} onChange={handleChange} sx={{ m: 2 }} />
              </Box>
            )}
            {props.title === "Register Business" && (
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                <Box sx={{ m: 1, minHeight: 300, alignSelf: "center" }}>
                  <AppRegistrationIcon />
                  <Typography variant="h4" sx={{ padding: 2 }}>
                    {props.title}
                  </Typography>
                  <Box sx={{ padding: 1 }}>
                    <TextField
                      required
                      sx={{ m: 1 }}
                      id="email"
                      label="Enter Email"
                      variant="outlined"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      required
                      sx={{ m: 1 }}
                      id="password"
                      label="Password"
                      variant="outlined"
                      type={checked ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Show Password"
                      checked={checked}
                      onChange={handleChange}
                      sx={{ m: 1 }}
                    />
                  </Box>
                  <Box sx={{ padding: 2 }}>
                    <TextField
                      required
                      sx={{ m: 1 }}
                      id="businessName"
                      label="Business Name"
                      variant="outlined"
                      onChange={(e) => setbusinessName(e.target.value)}
                    />
                    <TextField
                      required
                      sx={{ m: 1 }}
                      id="phone"
                      label="Contact Phone Number"
                      variant="outlined"
                      onChange={(e) => setCustomerContactPhone(e.target.value)}
                    />
                  </Box>

                  <TextField
                    required
                    sx={{ m: 1, p: 1 }}
                    id="customerEmail"
                    label="Contact Email"
                    variant="outlined"
                    onChange={(e) => setCustomerContactEmail(e.target.value)}
                  />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", minWidth: "35vw", padding: 2 }}>
                  <YearSelect setActiveSince={setActiveSince} />
                  <select
                    required
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{ height: 50, backgroundColor: "transparent", borderRadius: 5 }}
                  >
                    <option value="" disabled selected>
                      Category *
                    </option>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((item) => {
                        return <option value={item.category_id}>{item.category}</option>;
                      })}
                  </select>
                  <select
                    onChange={(e) => setLocationId(e.target.value)}
                    required
                    style={{ height: 50, backgroundColor: "transparent", borderRadius: 5 }}
                  >
                    <option value="" disabled selected>
                      Location *
                    </option>
                    {locations &&
                      locations.length > 1 &&
                      locations.map((item) => {
                        return <option value={item.location_id}>{item.location_name}</option>;
                      })}
                  </select>

                  <TextField
                    required
                    minRows="18"
                    maxRows="20"
                    sx={{ m: 1 }}
                    id="description"
                    label="Business Description"
                    variant="outlined"
                    multiline
                    fullwidth={true}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
              </Box>
            )}
            {props.title === "Login" && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#73BAB1",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "#73BAB1",
                  },
                }}
                onClick={handleClick}
                disabled={email.length === 0 || password.length === 0 ? true : false}
              >
                {props.title}
              </Button>
            )}
            {props.title === "Business Login" && (
              <Button
                sx={{
                  m: 2,
                  backgroundColor: "#73BAB1",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "#73BAB1",
                  },
                }}
                variant="contained"
                onClick={handleClick}
                disabled={email.length === 0 || password.length === 0 ? true : false}
              >
                {props.title}
              </Button>
            )}

            {props.title === "Register" && (
              <Button
                sx={{
                  m: 2,
                  backgroundColor: "#52ab98",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "#52ab98",
                  },
                }}
                variant="contained"
                onClick={handleClick}
                disabled={fname.length === 0 || lname.length === 0 || email.length === 0 || password.length === 0 ? true : false}
              >
                {props.title}
              </Button>
            )}
            {props.title === "Register Business" && (
              <Button
                variant="contained"
                sx={{
                  m: 2,
                  backgroundColor: "#52ab98",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "#52ab98",
                  },
                }}
                onClick={handleClick}
                disabled={
                  email.length === 0 ||
                  password.length === 0 ||
                  businessName.length === 0 ||
                  description.length === 0 ||
                  customerContactPhone.length === 0 ||
                  customerContactEmail.length === 0 ||
                  categoryId.length === 0 ||
                  locationId.length === 0 ||
                  activeSince.length === 0
                    ? true
                    : false
                }
              >
                {props.title}
              </Button>
            )}

            {props.title === "Login" && (
              <Button
                sx={{ m: 2 }}
                onClick={() => {
                  setEmail("");
                  setPassword("");
                }}
              >
                <Link style={{ color: "black", textDecoration: "none" }} to="/businesslogin">
                  Business Login
                </Link>
              </Button>
            )}
            {props.title === "Business Login" && (
              <Button
                sx={{ m: 2 }}
                onClick={() => {
                  setEmail("");
                  setPassword("");
                }}
              >
                <Link style={{ color: "black", textDecoration: "none" }} to="/login">
                  User Login
                </Link>
              </Button>
            )}
            {props.title === "Register" && (
              <Button
                onClick={() => {
                  setEmail("");
                  setPassword("");
                }}
                sx={{ m: 2 }}
              >
                <Link style={{ textDecoration: "none", color: "black" }} to="/registerbusiness">
                  Register New Business
                </Link>
              </Button>
            )}
            {props.title === "Register Business" && (
              <Button
                onClick={() => {
                  setEmail("");
                  setPassword("");
                }}
              >
                <Link style={{ textDecoration: "none", color: "black" }} to="/register">
                  User Register
                </Link>
              </Button>
            )}
            <p>{msg}</p>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default LoginRegisterForm;
