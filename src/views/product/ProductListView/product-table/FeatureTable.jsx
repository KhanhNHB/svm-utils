import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Paper, Button, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination } from '@mui/material';
import parse from 'html-react-parser';
import * as Actions from '../redux/product.action'

const columns = [
  { id: 'no', label: 'No.', minWidth: 50 },
  { id: 'id', label: 'Id', minWidth: 50 },
  {
    id: 'title',
    label: 'Tên tính năng',
    minWidth: 50,
    align: 'center'
  },
  {
    id: 'content',
    label: 'Nội dung',
    minWidth: 50,
    align: 'center'
  },
  {
    id: 'icon',
    label: 'Icon',
    minWidth: 50,
    align: 'center'
  },
  {
    id: 'smallImage',
    label: 'Hình Slide',
    maxWidth: 100,
    align: 'center'
  },
  {
    id: 'largeImage',
    label: 'Hình Nền',
    maxWidth: 150,
    align: 'center'
  },
  {
    id: 'full',
    label: 'Loại tràn',
    minWidth: 20,
    align: 'center'
  },
  {
    id: 'small',
    label: 'Loại nhỏ',
    minWidth: 20,
    align: 'center'
  },
  {
    id: 'right',
    label: 'Vị trí (Trái N/ Phải Y)',
    minWidth: 20,
    align: 'center'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center'
  }
  
];


export default function FeatureTable() {
  const dispatch = useDispatch();
  const currentId = useSelector((state)=> state.product.currentProductId)

  const features = useSelector((state)=> state.product.features)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const mappingFeature = (features) => {
    let newFeas = [...features]
    let feasTable = newFeas.map((feature, index)=> {
      return {
        no: index+1,
        id: feature.id,        
        title: feature.featureTitle,
        content: feature.featureContent,
        icon: feature.featureIcon,
        smallImage: feature.smallImage,
        largeImage: feature.largeImage,
        full: feature.full,
        right: feature.right,
        small: feature.small,
        action: feature.id,
    }
    })
    return feasTable;
  }
  const rows = mappingFeature(features)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  const parseBoolean = (value) =>{
    if(value) {
      return 'Y' 
    } else {
         return 'N'
    }; 
  }

  const parseContent = (value) => {
    if(value == undefined || value == null) {
      return ''
    } else if(value.length > 50) {
      return value.substring(0,50) + ' ... '
    } else {
      return value;
    }
    
  }

  const handleEditFeature = (value, id) => {
      dispatch(Actions.setFeatureButtonStatus('edit'))
      dispatch(Actions.setFeatureId(id))
      dispatch(Actions.loadFeature(id))
  }
  const handleDeleteFeature = (value, id) => {
    alert('delete feature');
}
  
  return (
    <Paper sx={{  overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index+column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id+index}>
                    {columns.map((column, index) => {
                      const value = row[column.id] == null ? '': row[column.id]                  
                      if(column.id == 'action') {
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                              <Button onClick={(e)=> {handleDeleteFeature(e,value)}} color='error'>Ẩn</Button>
                              <Button onClick={(e)=> {handleEditFeature(e,value)}} color='success'>Sửa</Button>                              
                          </TableCell>
                        );
                      } else if(column.id == 'icon') {
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                             {parse(value)}                       
                          </TableCell>
                        );
                      } else if(column.id == 'full' || column.id == 'small' || column.id == 'right') {
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                               {parseBoolean(value)}                   

                          </TableCell>
                        );
                      } else if(column.id == 'content') {
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                               {parseContent(value)}                   

                          </TableCell>
                        );
                      } else if(column.id == 'smallImage' || column.id == 'largeImage') {
                        return (
                          <TableCell align={column.align} key={column.id+index} style={{width:column.maxWidth}} >
                               <img src={value} style={{width:'100%'}}/>                  
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell align={column.align} key={column.id+index}>
                            {value}
                          </TableCell>
                        );
                      }                   
                      
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

  
    </Paper>
    
  );
}
