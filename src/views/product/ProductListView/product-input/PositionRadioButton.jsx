import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from '../redux/product.action'

export default function PositionRadioButton() {
  const dispatch = useDispatch();
  
  const featureRadio = useSelector((state)=> state.product.featureRadio)

  const [value, setValue] = React.useState(featureRadio);

  const handleChange = (event) => {
    const isRight = event.target.value   
    setValue(isRight);
    dispatch(Actions.setFeatureRight(isRight));
    console.log(isRight);
  };

  useEffect(() => {
    setValue(featureRadio)
  }, [featureRadio]);

  return (
    <div>
      <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Vị trí nội dung</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="false" control={<Radio />} label="Trái" />
        <FormControlLabel value="true" control={<Radio />} label="Phải" />
      </RadioGroup>
    </FormControl>
    </div>
  );
}
