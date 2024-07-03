import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Stack,
  TextField,
  Dialog,
  Paper,
} from "@mui/material";
import Create from "./Create";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct } from "../../redux/products/Action";

const cols = [
  { id: 1, label: "Name" },
  { id: 2, label: "Description" },
  { id: 3, label: "Cost Price" },
  { id: 4, label: "Sell Price" },
  { id: 5, label: "Discount" },
  { id: 6, label: "Discounted Sell Price" },
  { id: 7, label: "Final Price" },
  { id: 8, label: "Expiry Date" },
  { id: 9, label: "Category" },
  { id: 10, label: "Update" },
  { id: 11, label: "Delete" },
];

const FormModal = () => {
  const [open, setOpen] = useState(false);
  const [editField, setEditField] = useState({});
  const [rows, setRows] = useState(null);

  const dispatch = useDispatch();

  const items = useSelector((state) => state?.products);

  // data is coming from the create form
  const handleGet = (data) => {
    setRows([...rows, data]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const deleteVal = rows?.filter((del) => del.id !== id);
      setRows(deleteVal);
      dispatch(deleteProduct(id));
    }
  };

  const handleUpdate = (id) => {
    setOpen(true);
    const updateVal = rows?.filter((edit) => edit.id === id);
    updateVal.forEach((x) => setEditField(x));
  };

  const handleUpdateChange = (id, e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditField({ ...editField, [name]: value });
    dispatch(editProduct(id, name, value));
  };

  //update the existing data
  const handleEdit = (id) => {
    const existData = rows?.map((ele) => (ele.id === id ? editField : ele));
    setRows(existData);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setRows(items?.products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {cols?.map((item) => (
                  <TableCell key={item.id} sx={{ fontWeight: "900" }}>
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.costPrice}</TableCell>
                  <TableCell>{item.sellPrice}</TableCell>
                  <TableCell>{item.discount}</TableCell>
                  <TableCell>{item.discountedSellPrice}</TableCell>
                  <TableCell>{item.finalPrice}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>{item.category}</TableCell>

                  <TableCell>
                    <Button onClick={() => handleUpdate(item.id)}>
                      UPADTE
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Create getData={handleGet} rows={rows} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* EDIT Model */}

      <Dialog fullWidth={"md"} open={open} onClose={handleClose}>
        <Box
          sx={{
            flexGrow: 1,
            height: "20%",
            mt: "5%",
            backgroundColor: "white",
          }}
        >
          <Grid container>
            <Grid item lg={6} md={12} sm={12}>
              <Stack p={2} spacing={2}>
                <TextField
                  name="name"
                  label="Name"
                  variant="standard"
                  value={editField.name}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
                <TextField
                  name="description"
                  label="description"
                  variant="standard"
                  value={editField.description}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
                <TextField
                  name="costPrice"
                  label="Cost Price"
                  variant="standard"
                  value={editField.costPrice}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
                <TextField
                  name="sellPrice"
                  label="Sell Price"
                  variant="standard"
                  value={editField.sellPrice}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
              </Stack>
            </Grid>
            <Grid item lg={6} md={6} sm={6}>
              <Stack p={2} spacing={2}>
                <TextField
                  name="discount"
                  label="Discount"
                  variant="standard"
                  value={editField.discount}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
                <TextField
                  name="discountedSellPrice"
                  label="Discounted Sell Price"
                  variant="standard"
                  value={editField.discountedSellPrice}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
                <TextField
                  name="finalPrice"
                  label="Final Price"
                  variant="standard"
                  value={editField.finalPrice}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
                <TextField
                  name="expiryDate"
                  label="Expiry Date"
                  variant="standard"
                  value={editField.expiryDate}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
              </Stack>
            </Grid>

            <Grid item lg={12} md={6} sm={6}>
              <Stack p={2} spacing={2}>
                <TextField
                  name="category"
                  label="Category"
                  variant="standard"
                  value={editField.category}
                  onChange={(e) => handleUpdateChange(editField?.id, e)}
                  required
                />
                <Button
                  variant="contained"
                  onClick={() => handleEdit(editField?.id)}
                >
                  SUBMIT
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default FormModal;
