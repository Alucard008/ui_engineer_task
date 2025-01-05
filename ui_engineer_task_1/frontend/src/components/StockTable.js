import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Typography,
} from '@mui/material';

const StockTable = ({ stocks, theme }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('symbol');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Flatten stock data for rendering
  const rows = stocks.flat().map((stock, index) => ({ id: index, ...stock }));

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = rows.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    }
    return a[orderBy] < b[orderBy] ? 1 : -1;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
      }}
      className="transition-all"
    >
      <TableContainer style={{ minHeight: '350px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'symbol'}
                  direction={orderBy === 'symbol' ? order : 'asc'}
                  onClick={() => handleSort('symbol')}
                  style={{
                    color: theme === 'dark' ? '#ffffff' : '#000000',
                  }}
                  sx={{
                    '.MuiTableSortLabel-icon': {
                      color: theme === 'dark' ? '#ffffff' : '#000000', // Sort icon color
                    },
                  }}
                >
                  Symbol
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={() => handleSort('price')}
                  sx={{
                    color: theme === 'dark' ? '#ffffff' : '#000000',
                    '.MuiTableSortLabel-icon': {
                      color: theme === 'dark' ? '#ffffff' : '#000000', // Sort icon color
                    },
                  }}
                >
                  Price (USD)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'time'}
                  direction={orderBy === 'time' ? order : 'asc'}
                  onClick={() => handleSort('time')}
                  sx={{
                    color: theme === 'dark' ? '#ffffff' : '#000000',
                    '.MuiTableSortLabel-icon': {
                      color: theme === 'dark' ? '#ffffff' : '#000000', // Sort icon color
                    },
                  }}
                >
                  Time
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.length > 0 ? (
              sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor:
                        theme === 'dark'
                          ? row.id % 2 === 0
                            ? '#334155'
                            : '#1e293b'
                          : row.id % 2 === 0
                          ? '#f8f9fa'
                          : '#ffffff',
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      '& td': {
                        color: theme === 'dark' ? '#ffffff' : '#000000', // Row text color
                      },
                    }}
                  >
                    <TableCell>{row.symbol}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.time}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography
                    sx={{
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      fontStyle: 'italic',
                    }}
                  >
                    No Available Data
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10]}
        sx={{
          color: theme === 'dark' ? '#ffffff' : '#000000',
          '.MuiTablePagination-select': {
            color: theme === 'dark' ? '#ffffff' : '#000000',
          },
        }}
      />
    </Paper>
  );
};

export default StockTable;
