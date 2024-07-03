import { Box, Button, Dialog, Grid, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/products/Action";

const Create = ({ getData }) => {
  const [field, setField] = useState({
    name: "",
    description: "",
    costPrice: "",
    sellPrice: "",
    discount: "",
    discountedSellPrice: "",
    finalPrice: "",
    expiryDate: "",
    category: "",
  });

  const dispatch = useDispatch();

  const {
    name,
    description,
    costPrice,
    sellPrice,
    discount,
    discountedSellPrice,
    finalPrice,
    expiryDate,
    category,
  } = field;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setField({ ...field, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVal = { id: new Date().getTime().valueOf(), ...field };

    // newval pass to the parent newtable
    getData(newVal);
    dispatch(addProduct(newVal));
    setOpen(false);
  };

  //modal for adding data
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        ADD
      </Button>

      <Dialog fullWidth="md" open={open} onClose={handleClose}>
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
                  value={name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="description"
                  label="description"
                  variant="standard"
                  value={description}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="costPrice"
                  label="Cost Price"
                  variant="standard"
                  value={costPrice}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="sellPrice"
                  label="Sell Price"
                  variant="standard"
                  value={sellPrice}
                  onChange={handleChange}
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
                  value={discount}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="discountedSellPrice"
                  label="Discounted Sell Price"
                  variant="standard"
                  value={discountedSellPrice}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="finalPrice"
                  label="Final Price"
                  variant="standard"
                  value={finalPrice}
                  onChange={handleChange}
                  required
                />
                <TextField
                  name="expiryDate"
                  label="Expiry Date"
                  variant="standard"
                  value={expiryDate}
                  onChange={handleChange}
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
                  value={category}
                  onChange={handleChange}
                  required
                />

                <Button
                  variant="contained"
                  disabled={
                    name === "" ||
                    description === "" ||
                    costPrice === "" ||
                    sellPrice === "" ||
                    discount === "" ||
                    discountedSellPrice === "" ||
                    finalPrice === "" ||
                    expiryDate === "" ||
                    category === ""
                      ? true
                      : false
                  }
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Create;
