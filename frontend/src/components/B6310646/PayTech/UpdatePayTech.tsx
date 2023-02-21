import { Link as RouterLink, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Autocomplete, IconButton, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect } from "react";
import TableinPayTech2 from "./TableInPayTechCreate";
import { OrderTechInterface } from "../../../interfaces/IOrderTech";
import {
  PayTechInterface,
  HardwareInterface,
} from "../../../interfaces/IPayTech";
import { TechnicianInterface } from "../../../interfaces/TechnicianUI";
import { ORDERInterface } from "../../../interfaces/ORDERUI";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import {
  blueGrey,
  green,
  grey,
  purple,
  red,
  yellow,
} from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableinEdit from "./TableInEdit";
import Swal from "sweetalert2";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PayTechUpdate = () => {
  const params = useParams();
  const [PayTech, setPayTech] = React.useState<Partial<PayTechInterface>>({});
  const [PayTech1, setPayTech1] = React.useState<PayTechInterface>();
  const [PayTech2, setPayTech2] = React.useState<PayTechInterface[]>([]); // for combobox first disable

  const [OrderTech1, setOrderTech1] = React.useState<
    Partial<OrderTechInterface>
  >({});
  const [Amount, setAmount] = React.useState<String>("");
  const [OrderTech, setOrderTech] = React.useState<OrderTechInterface[]>([]);
  const [OrderTechDetail, setOrderTechDetail] =
    React.useState<OrderTechInterface>();
  const [Order1, setOrder1] = React.useState<Partial<ORDERInterface>>({});

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  //   const [TimeOut, setTimeOut] = React.useState<Dayjs | null>(dayjs);

  const [t_name, setT_name] = React.useState<string | undefined>(undefined);

  const [Hardware, setHardware] = React.useState<HardwareInterface[]>([]);
  const getHardware = async () => {
    const apiUrl = "http://localhost:8080/hardwares";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setHardware(res.data);
          console.log(res.data);
        }
      });
  };

  const getOrderTech = async () => {
    const apiUrl = "http://localhost:8080/pay-tech-info-cus/";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrderTech(res.data);
          setOrderTech1(res.data);
          setOrderTechDetail(res.data);
          setOrder1(res.data);
          setPayTech1(res.data);
          setPayTech2(res.data);
        }
      });
  };

  const getOrder = async () => {
    // const apiUrl = "http://localhost:8080/GetListOrder/";
    const apiUrl = "http://localhost:8080/GetOrder/";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrder1(res.data);
          console.log(res.data);
        }
      });
  };

  const [Technician, setTechnician] = React.useState<TechnicianInterface[]>([]);
  const getTechnician = async () => {
    const apiUrl = "http://localhost:8080/GetTechnician/";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTechnician(res.data);
          setT_name(res.data.Name);
          console.log(res.data);
        }
      });
  };

  const handleChange = (event: SelectChangeEvent<any>) => {
    const name = event.target.name as keyof typeof PayTech;
    setPayTech({
      ...PayTech,
      [name]: event.target.value,
    });
    if (event.target.name === "OrderTechID") {
      setOrderTechDetail(OrderTech.find((r) => r.ID === event.target.value));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof PayTechUpdate;

    const { value } = event.target;

    setPayTech({ ...PayTech, [id]: value });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const getCurrentPayTech = async () => {
    const apiUrl = `http://localhost:8080/pay-tech`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(`${apiUrl}/${params.id}`, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API
      .then((res) => {
        console.log(res.data); //show ข้อมูล
        if (res.data) {
          setPayTech(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const [message, setAlertMessage] = React.useState("");

  const successAlert = () => {
    Swal.fire({
      title: "บันทึกข้อมูลสำเร็จ",
      text: "Click OK to exit.",
      icon: "success",
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  };

  const errorAlert = () => {
    Swal.fire({
      title: "บันทึกข้อมูลไม่สำเร็จ",
      text: "Click OK to exit.",
      icon: "error",
    });
  };

  // post orderTech
  function update() {
    let data = {
      ID: PayTech.ID,
      Note: PayTech.Note,
      Amount: convertType(PayTech.Amount),
      CostHardware: convertType(PayTech.CostHardware),
      HardwareID: convertType(PayTech.HardwareID),
      TechnicianID: Number(localStorage.getItem("uid")),
      OrderTechID: PayTech.OrderTechID,
    };

    const apiUrl = "http://localhost:8080/update-pay-tech";
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          successAlert();
          console.log("Success");
        } else {
          Swal.fire({
            title: "บันทึกไม่สำเร็จ",
            text: res.error.split(";")[0],
            icon: "error",
          });
        }
      });

    // // const apiUrl = "http://localhost:8080";
    // const apiUrl = "http://localhost:8080";
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You will be able to edit this!",
    //   showDenyButton: false,
    //   showCancelButton: true,
    //   confirmButtonText: "บันทึก",
    // }).then((data: any) => {
    //   if (data.isConfirmed) {
    //     fetch(`${apiUrl}/update-pay-tech`, requestOptionsPatch)
    //       .then((response) => response.json())
    //       .then((res) => {
    //         console.log(res);
    //         if (res.data) {
    //           Swal.fire({
    //             icon: "success",
    //             title: "Saved!",
    //             text: "บันทึกสำเร็จ",
    //           });
    //           // setSuccess(true);
    //         } else {
    //           Swal.fire({
    //             icon: "error",
    //             title: "Error!",
    //             text: res.error,
    //           });
    //           // setError(true);
    //         }
    //       });
    //   }
    // });

    // const apiUrl = "http://localhost:8080/update-pay-tech";

    // fetch(apiUrl, requestOptions)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     if (res.data) {
    //       successAlert();
    //       console.log("Success");
    //     } else {
    //       Swal.fire({
    //         title: "บันทึกไม่สำเร็จ",
    //         text: res.error.split(";")[0],
    //         icon: "error",
    //       });
    //     }
    //   });

    // const requestOptionsPatch = {
    //   method: "PATCH",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // };
  }

  //useEffect
  useEffect(() => {
    getOrderTech();
    getHardware();
    getTechnician();
    // getOrder();
    getCurrentPayTech();
  }, []);

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>

      {/* </Paper> */}

      <Paper variant="elevation">
        <Box
          display="flex"
          maxWidth="lg"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
              mt={2}
              align="center"
            >
              <h2>บันทึกค่าใช้จ่าย</h2>
            </Typography>
          </Box>
        </Box>
        <Divider />

        {/* customerrrrrrrrrr!!!!!!!!!!!!!!!!!!!!!!! */}
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p style={{ textAlign: "left" }}>
                <h3>รายละเอียดลูกค้า</h3>
              </p>
            </FormControl>
          </Grid>

          {/* box order tech*/}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Pay Tech</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{
                  style: {
                    width: 490,
                  },
                }}
                value={PayTech?.ID}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          {/* box TimeStamp */}
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>Order Tech</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{
                  style: {
                    width: 490,
                  },
                }}
                value={PayTech.OrderTechID}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
                onChange={handleInputChange}
              />
            </FormControl>

          </Grid>
        </Grid>

        {/* hardware */}
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p style={{ textAlign: "left" }}>
                <h3>ส่วนของช่าง</h3>
              </p>
            </FormControl>
          </Grid>

          {/* box hardware */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>hardware or software</p>
              <Select
                style={{ backgroundColor: "white" }}
                native
                value={PayTech?.HardwareID}
                onChange={handleChange}
                inputProps={{
                  name: "HardwareID",
                }}
              >
                <option aria-label="None" value="">
                  select-hardware-software
                </option>
                {Hardware.map((item: HardwareInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.HardwareName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* จำนวน */}
          <Grid item xs={2}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>จำนวน</p>
              <TextField
                style={{ float: "left" }}
                id="Amount"
                value={PayTech.Amount}
                label=""
                type="number"
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          {/* box cost */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <p style={{ textAlign: "right" }}>ราคา</p>
              <TextField
                style={{ backgroundColor: "white" }}
                id="CostHardware"
                multiline
                value={PayTech.CostHardware}
                label=""
                onChange={handleInputChange}
              />
              <p />
            </FormControl>
          </Grid>

          {/* box note */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>หมายเหตุ*</p>

              <TextField
                style={{ backgroundColor: "white" }}
                id="Note"
                multiline
                rows={4}
                value={PayTech.Note}
                label=""
                onChange={handleInputChange}
              />
              <p />
            </FormControl>
          </Grid>

          {/* botton ADD */}
          {/* <Grid item xs={1}>
            <br />
            <br />
            <br />
            <IconButton
              size="large"
              aria-label="ADD"
              onClick={submit}
              sx={{ color: green[600] }}
            >
              <AddBoxIcon fontSize="large" />
            </IconButton>
          </Grid> */}

          {/* box name tech */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>Technician</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{
                  style: {
                    width: 490,
                  },
                }}
                value={t_name}
                defaultValue={"Name"}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
              />
            </FormControl>
          </Grid>

          <TableinEdit />

          <Grid item xs={12}>
            <Button
              id="Back_PAY"
              component={RouterLink}
              to="/PayTech"
              variant="contained"
              color="secondary"
              sx={{ border: 2, color: grey[200] }}
              size="large"
              // color="error"
              endIcon={<CancelIcon />}
            >
              Back
            </Button>

            <Button
              id="Update_PAY"
              style={{ float: "right" }}
              variant="outlined"
              onClick={update}
              sx={{ border: 2.7, color: purple[500] }}
              endIcon={<FileDownloadDoneIcon />}
              size="large"
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default PayTechUpdate;
