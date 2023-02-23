import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, gridPageCountSelector, gridPageSelector, GridRenderCellParams, GridToolbar, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import React from 'react';
import { OrderTechInterface } from '../../../interfaces/IOrderTech';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Pagination from '@mui/material/Pagination';

//====================สำหรับ แถบเลื่อนหน้า footer dataGrid============================
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
function Table_Paytech_show() {
    const [Paytech_all, set_All_Payment] = React.useState<OrderTechInterface[]>([]);
    const get_All_Paytech = async () => {
        const apiUrl = `http://localhost:8080/ListOrderTechForPaymment/${localStorage.getItem("uid")}`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    set_All_Payment(res.data);
                    console.log(res.data);
                } else {
                    console.log("Table_Paytech_error");
                }
            });
    };

    //ฟังก์ชัน สำหรับ Datagrid
    const columns: GridColDef[] = [
        {
            field: 'ชำระ',
            headerName: '',
            width: 150,
            editable: false,
            headerClassName: 'title_table', cellClassName: "cell_table",
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    localStorage.setItem('Ordertech_ID', params.id.toString());
                };
                return (
                    <RouterLink to={`/Payment`} style={{ textDecoration: 'none' }}>
                        <Button id="btn_green_table"
                            variant="contained" onClick={handleClick}
                            sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#009a00' }} >
                            {<LocalAtmIcon />} ชำระเงิน
                        </Button>
                    </RouterLink>
                );
            }
        },
        //{ field: "ID", headerName: "OrderTechID", width: 100 },
        { field: "OrderID", headerName: "OrderID", width: 70, headerClassName: 'title_table', cellClassName: "cell_table" },
        //{ field: "TimeOut", headerName: "Time out", width: 100 },

        {
            field: "ID", headerName: "ปัญหาที่พบ", width: 200, headerClassName: 'title_table', cellClassName: "cell_table", renderCell: params => {
                return <div>{params.row.ORDER.Reason} </div>
            }
        },
        { field: "Solving", headerName: "Solving", width: 200, headerClassName: 'title_table', cellClassName: "cell_table" },
        {
            field: "StatusID", headerName: "Status", width: 120, headerClassName: 'title_table', cellClassName: "cell_table", renderCell: params => {
                return <div>{params.row.Status.StatusName}</div>
            }
        },
        {
            field: "DamageID", headerName: "ระดับความรุนแรง", width: 150, headerClassName: 'title_table', cellClassName: "cell_table", renderCell: params => {
                return <div>{params.row.Damage.DamageName}</div>
            }
        },
        {
            field: "TechnicianID", headerName: "ช่างผู้ซ่อม", width: 210, headerClassName: 'title_table', cellClassName: "cell_table", renderCell: params => {
                return <div>{params.row.Technician.Name}</div>
            }
        },
    ];

    useEffect(() => {

        get_All_Paytech();

    }, []);

    return (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
                rows={Paytech_all}
                getRowId={(row) => row.ID}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[50]}
                components={{ Toolbar: GridToolbar, Pagination: CustomPagination, }}
                style={{ height: '500px', outline: '3px solid #db36a4', borderRadius: '25px' }}
            />
        </div>
    )
}

export default Table_Paytech_show

