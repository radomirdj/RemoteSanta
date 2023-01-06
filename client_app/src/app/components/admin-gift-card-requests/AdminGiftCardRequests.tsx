import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminGiftCardRequestList } from "../../store/admin-gift-card-requests/actions";
import { getAdminGiftCardRequestListSelector } from "../../store/admin-gift-card-requests/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import { styled } from "@mui/material/styles";

const AdminGiftCardRequests = () => {
  const dispatch = useDispatch();
  const rowsPerPage: number = 6;
  const [page, setPage] = React.useState(0);
  const adminGiftCardRequestList = useSelector(
    getAdminGiftCardRequestListSelector
  );

  useEffect(() => {
    dispatch(fetchAdminGiftCardRequestList());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: "#EDEEC4",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-gift-card-requests">
        {/*LABELS */}
        <Grid container className="grid-style">
          <Grid item xs={12}>
            <Typography className="admin-title">Gift Card Requests</Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: 1200 }}
              className="table-style"
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="admin-table-cell-title">
                      ID
                    </TableCell>
                    <TableCell align="left" className="admin-table-cell-title">
                      Integration
                    </TableCell>
                    <TableCell align="left" className="admin-table-cell-title">
                      Amount
                    </TableCell>
                    <TableCell align="left" className="admin-table-cell-title">
                      Created at
                    </TableCell>
                    <TableCell align="left" className="admin-table-cell-title">
                      Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminGiftCardRequestList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((giftCardRequest) => (
                      <StyledTableRow key={giftCardRequest.id}>
                        <StyledTableCell align="left">
                          {giftCardRequest.id}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="left"
                        >
                          {giftCardRequest.giftCardIntegration.title}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {giftCardRequest.amount} PTS
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {new Date(giftCardRequest.createdAt)
                            .toLocaleDateString()
                            .replaceAll("/", ".")}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Button
                            variant="contained"
                            disableRipple
                            className="button-details"
                          >
                            Details
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              component="div"
              count={adminGiftCardRequestList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminGiftCardRequests;
