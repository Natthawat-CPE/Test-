import { Box, Button, colors, Container, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, gridPageCountSelector, gridPageSelector, GridRenderCellParams, GridToolbar, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
// import Payment, { Payment_get_Ordertech_ID } from './Payment'
import React from 'react';
import { PaymentInterface } from '../../../interfaces/PaymentUI';
import dayjs from 'dayjs';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import "../CSS/PAY_and_CHECKED.css";
import Pagination from '@mui/material/Pagination';
import { Checked_paymentInterface } from '../../../interfaces/Checked_paymentUI';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { bool } from 'prop-types';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import TextsmsIcon from '@mui/icons-material/Textsms';
import LensIcon from '@mui/icons-material/Lens';


//====================สำหรับปุ่มลบ============================
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true
})
//====================สำหรับ แถบเลื่อนหน้า footer dataGrid=====================
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}



function Table_Payment_show() {
  //===============list payment details =================
  const [Payment, set_All_Payment] = React.useState<PaymentInterface[]>([]);
  const get_All_Payment = async () => {
    const apiUrl = `http://localhost:8080/ListPayment_filter_by_customer/${localStorage.getItem("uid")}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          set_All_Payment(res.data);
        } else {
          console.log("Table_Payment_show error");
        }
      });
  };
  //====================================================


  //ฟังก์ชัน สำหรับ Datagrid
  const columns: GridColDef[] = [


    //{ field: "ID", headerName: "Payment ID", width: 100, headerClassName:'title_table',cellClassName:"cell_table" },
    {
      field: 'แก้ไข',
      headerName: '',
      width: 95,
      editable: false,
      headerClassName:'title_table',cellClassName:"cell_table",
      renderCell: (params: GridRenderCellParams) => {

        const handleClick = () => {
          params.api.setRowMode(params.id, 'edit');
          localStorage.setItem('Payment_ID', params.id.toString());

        };
        return (
          <Button variant="contained" onClick={handleClick} component={RouterLink} to="/EditPayment"
            disabled={params.row.Status_ID != 3 && params.row.Status_ID != 1}
            id = 'font_style'
            sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#F99417' }} >
            {<Edit />}แก้ไข
          </Button>
        );
      }
    },
    {
      field: 'ลบ',
      headerName: '',
      width: 95,
      editable: false,
      headerClassName:'title_table',cellClassName:"cell_table",
      renderCell: (params: GridRenderCellParams) => {

        const handleClick = () => {
          swalWithBootstrapButtons.fire({
            title: 'คุณกำลังลบรายการชำระเงิน',
            text: "การลบรายการชำระเงินนี้ คุณจะต้องบันทึกรายการชำระเงินใหม่เท่านั้น",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ฉันต้องการลบ',
            cancelButtonText: 'ยกเลิกการลบ',
            reverseButtons: true,

          }).then((result) => {
            if (result.isConfirmed) {
              params.api.setRowMode(params.id, 'edit');
              const apiUrl = `http://localhost:8080/DeletePayment/${params.id}`;
              const requestOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(''),
              };
              fetch(apiUrl, requestOptions)
                .then((response) => response.json())
                .then((res) => {
                  if (res.data) {
                    // Alert สำเส็จ
                    swalWithBootstrapButtons.fire(
                      'ลบสำเร็จ',
                      'ลบรายการชำระเงิน สำเร็จ',
                      'success'
                    );
                  } else {
                    //setAlertMessage(res.error)
                    swalWithBootstrapButtons.fire(
                      // Display Back-end text response 
                      'การลบล้มเหลว',
                      res.error.split(";")[0],
                      'error'
                    );
                  }
                  window.location.reload();
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'ยกเลิก',
                'การลบรายการชำระเงิน',
                'error'
              )
            }
          });
        };
        return (
          <Button variant="contained" onClick={handleClick}
            id = 'font_style'
            disabled={params.row.Status_ID != 3 && params.row.Status_ID != 1}
            sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#ff3222' }} >
            {<Delete />}ลบ
          </Button>
        );
      }

    },


    {
      field: 'ข้อความ',
      headerName: 'ข้อความ',
      width: 100,
      editable: false,
      headerClassName:'title_table',cellClassName:"cell_table",
      align: 'center',
      renderCell: (params: GridRenderCellParams) => {

        const handleClick = () => {
          params.api.setRowMode(params.id, 'edit');
          const apiUrl = `http://localhost:8080/GetCheckedpayment_by_PaymentID/${params.id}`;
          const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              if (res.data) {
                console.log('Message -->', res.data);
                swalWithBootstrapButtons.fire(
                  'Message',
                  // 'ลบรายการชำระเงิน สำเร็จ',
                  res.data.Message,
                  //'info'
                )
              } else {
                swalWithBootstrapButtons.fire(
                  'Message',
                  'ไม่มีข้อความจากระบบถึงท่าน',
                )
              }
            })
        }
        return (
            <IconButton onClick={handleClick} disabled={!(params.row.Status_ID != 3 && params.row.Status_ID != 1)} >
              {(() => {
                if (params.row.Status_ID !== 3 && params.row.Status_ID !== 1) {
                  return <TextsmsIcon sx={{ fontSize: '40px', color: '#362FD9' }} />;
                } else {
                  return <SpeakerNotesOffIcon sx={{ fontSize: '40px' }} />;
                }
              })()}
            </IconButton>
        );
        
      }
    },

    {
      field: "OrderID", headerName: "OrderID", width: 70, headerClassName:'title_table',cellClassName:"cell_table", renderCell: params => {
        return <div>{params.row.OrderTech.ID}</div>
      }
    },
    { field: "Sender_Name", headerName: "ชื่อผู้โอนเงิน", width: 200, headerClassName:'title_table',cellClassName:"cell_table", },
    {
      field: "Status_ID", headerName: "สถานะการชำระเงิน", width: 200, headerClassName:'title_table',cellClassName:"cell_table"
      , renderCell: params => {

        if (params.row.Status_ID === 1) {
          return <div><LensIcon />ยังไม่ชำระเงิน</div>;
        } else if (params.row.Status_ID === 2) {
          return <div><LensIcon sx={{color:"green",fontSize:'10px'}} />ชำระเงินเรียบร้อย</div>;
        } else if (params.row.Status_ID === 3) {
          return <div><LensIcon sx={{color:"orange",fontSize:'10px'}}/>รอตรวจสอบการชำระเงิน</div>;
        } else if (params.row.Status_ID === 4) {
          return <div><LensIcon sx={{color:"red",fontSize:'10px'}}/>การชำระเงินไม่ถูกต้อง</div>;
        }
      }
    },
    {
      field: "Bank_ID", headerName: "ธนาคาร", width: 140, headerClassName:'title_table',cellClassName:"cell_table"
      , renderCell: params => {

        if (params.row.Bank_ID === 1) {
          return <div>ธนาคารไทยพาณิชย์</div>;
        } else if (params.row.Bank_ID === 2) {
          return <div>ธนาคารกสิกรไทย</div>;
        } else if (params.row.Bank_ID === 3) {
          return <div>ธนาคารกรุงไทย</div>;
        } else if (params.row.Bank_ID === 4) {
          return <div>ธนาคารกรุงเทพ</div>;
        } else if (params.row.Bank_ID === 5) {
          return <div>ธนาคารกรุงศรีอยุธยา</div>;
        }
      }
    },
    { field: "Amount", headerName: "ยอดเงินที่โอน", width: 100, headerClassName:'title_table',cellClassName:"cell_table", },
    { field: "Amount_Check", headerName: "ยอดที่ต้องโอนเงิน", width: 120, headerClassName:'title_table',cellClassName:"cell_table", },
    {
      field: "Date_time", headerName: "วันที่โอนเงิน", width: 180, headerClassName:'title_table',cellClassName:"cell_table"
      , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm '),
    },
    
    //{ field: "CustomerID", headerName: "ผู้ส่งเรื่อง", width: 300 },

  ];

  useEffect(() => {

    get_All_Payment();

  }, []);

  return (
    <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={Payment}
        getRowId={(row) => row.ID}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15]}
        components={{ Toolbar: GridToolbar, Pagination: CustomPagination, }}
        style={{ height: '500px',outline: '3px solid #db36a4', borderRadius: '25px'  }}
      />
      <br />
    </div>

  )
}

export default Table_Payment_show

//===============list payment details =================
// function Get_Message_for_Customer(id: any) {
//   const [Message, setMessage] = React.useState("")
//   const getMessage = async () => {
//     const apiUrl = `http://localhost:8080/GetChecked_payment/${id}`;
//     const requestOptions = {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     };
//     fetch(apiUrl, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           setMessage(res.data.Message);
//         } else {
//           console.log("Table_Payment_show error");
//         }
//       });
//   };
//   getMessage
//   return Message
// }
//====================================================
