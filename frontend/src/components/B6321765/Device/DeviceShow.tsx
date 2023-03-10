import "./css/devicestyle.css";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { DeviceInterface } from "../../../interfaces/IDevice";
import dayjs from 'dayjs';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2'
import { DataGrid, GridToolbar, GridColDef , GridRenderCellParams} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { getsetDeviceID } from './DeviceEdit';


function DeviceShow() {

    const userID = parseInt(localStorage.getItem("uid") + "");

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success' ,
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })

    const navigate = useNavigate();
    const [DeviceShow, setDeviceShow] = React.useState<DeviceInterface[]>([]);
    const getDeviceShow = async () => {
        const apiUrl = `http://localhost:8080/GetDeviceBYcustomerID/${userID}`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setDeviceShow(res.data);
            } else {
                console.log("device show error");
            }
        });
    };

    const columns: GridColDef[] = [
        {
            field: 'action1',
            headerName: '',
            width: 100,
            editable: false,
            headerClassName: 'super-app-theme--header',
            renderCell: (params: GridRenderCellParams) => {
              const handleClick = () => {
                params.api.setRowMode(params.id, 'edit');
                getsetDeviceID(params.id.toString());
              };
              return (
                  <Button variant="contained" onClick={handleClick} component={RouterLink} to="/DeviceEditPage"
                    sx={{ cursor: 'pointer', backgroundColor: 'success' }} >
                    {<Edit />}???????????????
                  </Button>
              );
            }
        },
        {
            field: 'action2',
            headerName: '',
            width: 100,
            editable: false,
            headerClassName: 'super-app-theme--header',      
            renderCell: (params: GridRenderCellParams) => {
      
              const handleClick = () => {
                swalWithBootstrapButtons.fire({
                  title: '?????????????????????????????????????????????????????????????????????',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: '????????????????????????????????????',
                  cancelButtonText: '?????????????????????????????????',
                  reverseButtons: true,
                  
                }).then((result) => {
                  if (result.isConfirmed) {
                    params.api.setRowMode(params.id, 'edit');
                    const apiUrl = `http://localhost:8080/DeleteDevice/${params.id}`;
                    const requestOptions = {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(''),
                    };
                    fetch(apiUrl, requestOptions)
                      .then((response) => response.json())
                      .then((res) => {
                        if (res.data) {
                          swalWithBootstrapButtons.fire(
                            '????????????????????????',
                            '????????????????????????????????????????????? ??????????????????',
                            'success'
                          ).then(() => {
                            window.location.reload();
                          });
                        } else {
                          swalWithBootstrapButtons.fire(
                            '????????????????????????????????????',
                            res.error.split(";")[0],
                            'error'
                          );
                        }
                      });
                  } else if (
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    swalWithBootstrapButtons.fire(
                      '??????????????????',
                      '??????????????????????????????????????????????????????',
                      'error'
                    )
                  }
                });
              };
              return (
                <Button variant="contained" onClick={handleClick}
                  sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#ff3222' }} >
                  {<Delete />}??????
                </Button>
              );
            }
        },
        { field: "ID", headerName: "ID", width: 50 },
        { field: "CustomerName", headerName: "?????????????????????????????????", width: 150 , renderCell:params =>{        
            return <div>{params.row.Customer.Name}</div>
        }},
        { field: "Type_Name", headerName: "??????????????????", width: 90 , renderCell:params =>{        
            return <div>{params.row.Type.Type_Name}</div>
        }},
        { field: "WindowName", headerName: "??????????????????????????????????????????", width: 120 , renderCell:params =>{        
            return <div>{params.row.Windows.Windows_Name}</div>
        }},
        { field: "CPU", headerName: "??????????????????", width: 200 },
        { field: "Monitor", headerName: "??????????????????", width: 200 },
        { field: "GPU", headerName: "?????????????????????", width: 200},
        { field: "RAM", headerName: "?????????", width: 200 },
        { field: "Harddisk", headerName: "??????????????????????????????", width: 200 },
        { field: "Problem", headerName: "?????????????????????????????????????????????", width: 200 },
        {
          field: "Save_Time", headerName: "Save_Time", width: 200
          , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
    ];

    useEffect(() => {
        getDeviceShow();
    }, []);

    return(
        <div className="container-device">
            <div className="header-device">
                <h1 className="head-device">???????????????????????????????????????</h1>
                <hr className="line-device"/>
            </div>
            <div className="table">
              <div className="showTable">
                  {datashow()}
              </div>
            </div>
            <div className="bttn">
              <div className="back-bttn">
                <Button sx={{ backgroundColor: "#C70039" }} onClick={() => navigate(-1)} variant="contained">
                    ????????????????????????
                </Button>
              </div>
              <div className="add-bttn">
                <Button color="success"  component={RouterLink} to="/DeviceCreatePage" variant="contained">
                    ?????????????????????????????????
                </Button>
              </div>
            </div>
        </div>
    )
    function datashow() {
        return (
          <DataGrid
            rows={DeviceShow}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            components={{ Toolbar: GridToolbar,}}
            style={{ borderRadius: '10px' }}/>
        )
    }
}

export default DeviceShow;