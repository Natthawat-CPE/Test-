import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Margin } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {GenderTInterface,
    EducateInterface,
    PrefixTInterface,
    TechnicianInterface} from "../../../interfaces/TechnicianUI"
import TextField from "@mui/material/TextField";
import PersonIcon from '@mui/icons-material/Person';



//Grid
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TechnicianEdit({ formCreate, setFormCreate, activeStep, setActiveStep , steps }: any) {

    const handleBack = () => {
        setActiveStep(activeStep - 1);
      };

      const {Location} = formCreate
      const {Name} = formCreate
      const {Phone} = formCreate
      const {EDUCATE_ID} = formCreate


//   const { CAREER_ID} = formCreate
//   const {Name, CAREER_ID, Phone} = formCreate
  //ระบุว่าใคร login เข้ามา
  const technicianID = parseInt(localStorage.getItem("uid") + "");
  // const technicianID = useState(1);
//   setFormCreate(({...formCreate,ID:customerID}))

//   const [Name, setName] = useState("");
  const [ID_card, setID_card] = useState("");
  const [DOB, setDOB] = useState<Dayjs | null>(dayjs());
//   const [Phone, setPhone] = useState("");

  const [GENDER_NAME, setGENDER_NAME] = useState("");
  const [EDUCATE_NAME, setEDUCATE_NAME] = useState("");
//   const [CAREER_ID, setCAREER_IDE] = useState("");
  const [PREFIX_NAME, setPREFIX_NAME] = useState("");

  const [Username, setUsername] = useState("");


  const convertType = (data: string | number | undefined | Float32Array) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  function submit() {

    let data = {
    //   ID: convertType(formCreate.ID as number),
      ID: technicianID,
      Name: formCreate.Name,          
      Location: formCreate.Location,
      Phone: formCreate.Phone,
    };

    

    const apiUrl = "http://localhost:8080/UpdateTechnician";
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                console.log(data);
                // successAlert();
                setTimeout(() => {
                    setActiveStep(0)
                    console.log(data);
                }, 1500)
                console.log("Success");
            } else {
                // errorAlert();
                console.log("Error");
            }
        });

}


//Get Career
const [Educate, setEducate] = React.useState<EducateInterface[]>([]);
const getEducate = async () => {
const apiUrl = `http://localhost:8080/GetEducate`;
const requestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};
fetch(apiUrl, requestOptions)
  .then((response) => response.json())
  .then((res) => {
    if (res.data) {
        setEducate(res.data);
    } else {
      console.log("else");
    }
  });
};





  //API Get Customer/id
  const [NAMEa, setNAMEa] = useState("");
  const [phone, setPhone] = useState("");
  const [Technician, setTechnician] = React.useState<Partial<TechnicianInterface>>(
    {}
  );
  const getUser = async () => {
    const apiUrl = `http://localhost:8080/GetTechnician/${technicianID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setTechnician(res.data)
            setPREFIX_NAME(res.data.PREFIX.PrefixName)
            setEDUCATE_NAME(res.data.EDUCATE.EducateName)
            setGENDER_NAME(res.data.GENDER.GenderName)

            setPhone(res.data.Phone)
            setNAMEa(res.data.Name)
            
            
            // setDOB(res.data.DOB)
        }
     else {
        console.log("else");
      }
      });
  };

  useEffect(() => {
    getUser();
    getEducate();
    // setFormCreate(({...formCreate,ID:1})) // set CustomerID เอาไว้ระบุว่าจะแก้ไขไอดีไหน
  }, []);

  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
        <br />

      <Box sx={{ bgcolor: "#182E3E", height: "101vh" }}>
        <Container maxWidth="lg">
          <br />
          <br />

          <Box sx={{ bgcolor: "#f1f8e9", height: "93vh", paddingY: 0 }}>

          <Grid container spacing={2} paddingX={7} marginRight={1}>
            <Grid item xs={6} md={4}>
                
            </Grid>

            <Divider orientation="vertical" sx={{padding: 2, marginTop:2, marginBottom:2}}  flexItem />
            <Grid item xs={6} md={2}>
                    <br />  
                    <b style={{ font: "Arial", color: "#000000", fontSize: 15 }}>My Profile</b>
                    <br />
                    <br />

            </Grid>
          </Grid>
          

            <Grid container spacing={1} paddingX={5}>
                {/* 1 */}
              <Grid item xs={6} md={4}>
                {/* <center>
                    <img src="https://sv1.picz.in.th/images/2023/01/27/L4CDWe.png" alt="L4CDWe.png" width="128" height="128" />
                </center> */}
                
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />
              

              <Grid item xs={6} md={2} marginLeft={3} marginTop={2} >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Prefix</b>
              
              </Grid>
              

              <Grid item xs={6} md={5} marginLeft={2} marginTop={2}>
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Name</b>
              </Grid>
              
              
              {/* 2 */}
              <Grid item xs={6} md={4}>
                {/* <Item>2</Item>     */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={2} marginLeft={3} >
                    <TextField
                        disabled
                        id="filled-disabled"
                        label={PREFIX_NAME}
                        // defaultValue={PREFIX_NAME}
                        variant="filled"
                        size="small"
                        />
              </Grid>

              <Grid item xs={6} md={5} marginLeft={2}>
              <TextField
                        required
                        id="outlined-required"
                        // label={Customer.Name}      
                        defaultValue={Name}
                        variant="filled"
                        size='small'
                        onChange={(event) => setFormCreate(({...formCreate,Name:event.target.value}))}
                        inputProps={{
                            name: "Name",
                        }}
                        />
              </Grid>
              {/* 3 */}
              <Grid item xs={6} md={4}>
                {/* <Item>3</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3}  marginTop={2}  paddingRight={35}  >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Personal ID</b>
              </Grid>

              {/* 4 */}
              <Grid item xs={6} md={4}>
                {/* <Item>4</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} >
              <TextField
                        disabled
                        id="filled-disabled"
                        label={Technician.ID_card}      
                        // defaultValue={Customer.Name}
                        variant="filled"
                        size='small'
                        />
              </Grid>
              {/* 5 */}
              <Grid item xs={6} md={4}>
                {/* <Item>5</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} marginTop={2} paddingRight={35}>
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Date of Birth</b>
              </Grid>
              {/* 6 */}
              <Grid item xs={6} md={4}>
                <center>
                <Button variant="contained" color="success" onClick={submit} >
                    Done
                </Button>
              </center>
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} >
                        <TextField
                            disabled
                            id="filled-disabled"
                            label={dayjs(Technician.DOB).format('DD/MM/YYYY')}
                            // defaultValue={Customer.Name}
                            variant="filled"
                            size='small'
                        />
              </Grid>
              {/* 7 */}
              <Grid item xs={6} md={4}>
                <center>
                <Button variant="contained" color="warning" onClick={handleBack}>
                    Back
                </Button>
                </center>
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={2} marginLeft={3} marginTop={2} >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Gender</b>
              </Grid>

              <Grid item xs={6} md={5} marginLeft={2} marginTop={2}>
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Educate</b>
              </Grid>
              {/* 8 */}
              <Grid item xs={6} md={4}>
                {/* <Item>8</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={2} marginLeft={3} >
              <TextField
                            disabled
                            id="filled-disabled"
                            label={GENDER_NAME}
                            // defaultValue={Customer.GENDER.GenderName}
                            variant="filled"
                            size='small'
                        />
              
              </Grid>

              <Grid item xs={6} md={5} marginLeft={2} >
              <TextField
                            disabled
                            id="filled-disabled"
                            label={EDUCATE_NAME}
                            // defaultValue={Customer.GENDER.GenderName}
                            variant="filled"
                            size='small'
                        />
              </Grid>
              {/* 9 */}
              <Grid item xs={6} md={4}>
                {/* <Item>9</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} marginTop={2} >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Telephone Number</b>
              </Grid>
              {/* 10 */}
              <Grid item xs={6} md={4}>
                {/* <Item>10</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} >
              <TextField
                            required
                            id="outlined-required"
                            // label={Customer.Phone}
                            defaultValue={Phone} 
                            variant="filled"
                            size='small'
                            onChange={(event) => setFormCreate(({...formCreate,Phone:event.target.value}))}
                            inputProps={{
                                name: "Phone",
                            }}
                        />
              </Grid>

               {/* 11 */}
               <Grid item xs={6} md={4}>
                {/* <Item>9</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} marginTop={2} >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Location</b>
              </Grid>
              {/* 12 */}
              <Grid item xs={6} md={4}>
                {/* <Item>10</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} >
              <TextField
                            required
                            id="outlined-required"
                            // label={Customer.Phone}
                            defaultValue={Location} 
                            variant="filled"
                            size='small'
                            onChange={(event) => setFormCreate(({...formCreate,Location:event.target.value}))}
                            inputProps={{
                                name: "Location",
                            }}
                        />
              </Grid>


            </Grid>
            

          </Box>

        </Container>

      </Box>

    </Paper>
  );
}
export default TechnicianEdit;
