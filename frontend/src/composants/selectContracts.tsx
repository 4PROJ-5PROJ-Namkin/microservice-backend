import React, { useState } from 'react';
import Autocomplete from '@mui/lab/Autocomplete';

import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

type RowData = {
  id: number;
  quantity: number;
  price: number;
};
const products = [
  { id: 1, label: 'Product 1', price : 6},
  { id: 2, label: 'Product 2', price : 2 },
  // ... other products
];

export default function SelectContracts() {
  const [rows, setRows] = useState<RowData[]>([{ id: 0, quantity: 0, price: 0 }]);

  const handleIdChange = (index: number, value: number) => {
    const newRows = [...rows];
    newRows[index].id = value;
    newRows[index].price = products[value].price;

    setRows(newRows);
  };

  const handleQuantityChange = (index: number, value: number) => {
    const newRows = [...rows];
    newRows[index].quantity = value;
    setRows(newRows);
  };
  const handlePriceChange = (index: number, value: number) => {
    const newRows = [...rows];
    newRows[index].price = value;
    setRows(newRows);
  };
  const addRow = () => {
    setRows([...rows, { id: 0, quantity: 0, price : 0 }]);
  };
  const styleProductSelector = {
    marginRight : '10px',
    width: '55%'
  };
  const styleQuantity = {
    marginRight : '10px',
    width: '20%'
  };
  return (
  <div> 
    {rows.map((row, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <div style={{display : 'flex'}}>
        <Autocomplete
          options={products}
          getOptionLabel={(option) => option.label}
          style={styleProductSelector}
          value={products.find(product => product.id === row.id)}
          onChange={(event, newValue) => handleIdChange(index, newValue ? newValue.id : 0)}
          renderInput={(params) => <TextField {...params} label="Produit" />}
        />

        <TextField
          label="Quantité"
          type="number"
          value={row.quantity}
          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
          style={styleQuantity}
        />
        <TextField
          label="Prix conseillé"
          type="number"
          value={row.price}
          onChange={(e) => handlePriceChange(index, parseFloat(e.target.value))}
          style={{ marginRight: '10px' }}
/>

        </div>
      </div>
    ))}
    <Button variant="contained" color="primary" onClick={addRow}>
      Nouvelle ligne
    </Button>
  </div>
);

};

