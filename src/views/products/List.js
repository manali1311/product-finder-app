import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GetProducts } from "../../services/products/index";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMultipleProducts,
  deleteProduct,
  getProduct,
} from "../../redux/products/Action";

const List = () => {
  const gridRef = useRef();

  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100%", marginTop: 2 }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

  const items = useSelector((state) => state?.products);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      filter: true,
      minWidth: 150,
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const columnDefs = [
    {
      field: "name",
      filter: "agTextColumnFilter",
      cellStyle: { textAlign: "left" },
      checkboxSelection: true,
    },
    {
      field: "description",
      filter: "agTextColumnFilter",
      cellStyle: { textAlign: "left" },
    },
    {
      field: "costPrice",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
    },
    {
      field: "sellPrice",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
    },
    {
      field: "discount",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
    },
    {
      field: "discountedSellPrice",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
    },
    {
      field: "finalPrice",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
    },
    {
      field: "expiryDate",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
    },
    {
      field: "category",
      filter: "agTextColumnFilter",
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Button",
      field: "button",
      cellStyle: { textAlign: "center" },
      cellRenderer: (params) => (
        <Button
          sx={{ display: "flex", alignItems: "center", color: "black" }}
          onClick={() => handleRemove(params)}
        >
          <Delete />
        </Button>
      ),
    },
  ];

  const handleRemove = (params) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const delVal = rowData?.filter((item) => item?.id !== params.data.id);
      setRowData(delVal);
      dispatch(deleteProduct(params.data.id));
      toast.success("Item Removed Successfully.");
    }
  };

  const onDeleteSelected = () => {
    if (window.confirm("Are you sure you want to delete these products?")) {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedIds = selectedData.map((data) => data.id);

      const newData = rowData.filter((row) => !selectedIds.includes(row.id));
      setRowData(newData);
      dispatch(deleteMultipleProducts(selectedIds));
      toast.success("Items Removed Successfully.");
    }
  };

  const onCheckboxSelection = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedItems(selectedData);
  };

  //Gettig Products data
  const getProducts = async () => {
    try {
      if (items?.products?.length === 0) {
        const res = await GetProducts();
        setRowData(res?.data);
        dispatch(getProduct(res?.data));
      } else {
        setRowData(items?.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onGridReady = useCallback(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ag-theme-alpine" style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          domLayout="autoHeight"
          rowHeight={50}
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          onSelectionChanged={onCheckboxSelection}
        />
      </div>
      <Button
        variant="contained"
        disabled={selectedItems?.length === 0 ? true : false}
        onClick={onDeleteSelected}
        sx={{ mt: 2 }}
      >
        Remove All
      </Button>
    </div>
  );
};

export default List;
