import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserAvatar from "./avatar/UserAvatar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Chip,
  LinearProgress
} from "@mui/material";

import { stableSort, getComparator } from "./TableUtils"; // Import sorting utilities

const EnhancedTable = ({ tableProps }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading indicator
      try {
        const response = await axios.get(tableProps.dataLink, {
          params: tableProps.filter,
        });
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        // Handle error: Set error state, display error message, etc.
      } finally {
        setLoading(false); // Stop loading indicator regardless of success or failure
      }
    };

    fetchUserData();
  }, [tableProps.dataLink, tableProps.filter]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    navigate(`/profile/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHead>
            <TableRow>
              {tableProps.headers.map((header) => (
                <TableCell
                  key={header.id}
                  align={header.numeric ? "right" : "left"}
                  padding={header.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === header.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === header.id}
                    direction={orderBy === header.id ? order : "asc"}
                    onClick={() => handleRequestSort(header.id)}
                  >
                    {header.label}
                    {orderBy === header.id ? (
                      <Box component="span" sx={{ visuallyHidden: true }}>
                        {order === "desc" ? "" : ""}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? ( // Show loading indicator if loading is true
              <TableRow>
                <TableCell colSpan={tableProps.headers.length} align="center">
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {visibleRows.map((row) => (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isSelected(row.id)}
                    tabIndex={-1}
                    key={row.id}
                    selected={isSelected(row.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    {tableProps.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        align={header.numeric ? "right" : "left"}
                        padding={header.disablePadding ? "none" : "normal"}
                      >
                        {header.type === "avatar" ? (
                          <UserAvatar
                            photo={row.photo}
                            name={row.first_name + " " + row.last_name}
                            studentId={row.student_id}
                          />
                        ) : header.type === "status" ? (
                          <Chip
                            label={row[header.id] ? "○" : "×"}
                            color={row[header.id] ? "primary" : "default"}
                          />
                        ) : (
                          row[header.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={tableProps.headers.length} />
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

EnhancedTable.propTypes = {
  tableProps: PropTypes.shape({
    dataLink: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        numeric: PropTypes.bool,
        disablePadding: PropTypes.bool,
        type: PropTypes.string,
      })
    ).isRequired,
    filter: PropTypes.object.isRequired, // Assuming filter is an object
  }).isRequired,
};

export default EnhancedTable;
