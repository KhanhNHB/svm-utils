import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as Actions from '../redux/product.action'
import { useDispatch, useSelector } from "react-redux";

export default function FeatureCheckbox() {

  const dispatch = useDispatch();

  const featureCheckbox = useSelector((state)=> state.product.featureCheckbox)

  const [checked, setChecked] = React.useState(featureCheckbox);

  useEffect(() => {
    setChecked(featureCheckbox)
  }, [featureCheckbox]);

  const handleChangeFull = (event) => {
    const newCheckeds = [...checked]
    if(newCheckeds[0] == newCheckeds[1]) {
      dispatch(Actions.setFeatureChecked([!newCheckeds[0], newCheckeds[1], false]));
    } else if(newCheckeds[0] != newCheckeds[1]){
      dispatch(Actions.setFeatureChecked([event.target.checked, event.target.checked, false]));
    }
  

  };

  const handleChangeFullButSmall = (event) => {
    const newCheckeds = [...checked]
    if(newCheckeds[0] && newCheckeds[1]) {
      dispatch(Actions.setFeatureChecked([true, false, false]));
    } else {
      dispatch(Actions.setFeatureChecked([true, true, false]));
    }

    console.log('handleChangeFullButSmall', checked);

  };
  const handleChangeHalf = (event) => {
    dispatch(Actions.setFeatureChecked([false, false, true]));
    console.log('handleChangeHalf', checked);

  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'row', mr: 3 }}>
      <FormControlLabel
        label="Hình tràn Full"
        control={<Checkbox checked={checked[0]} onChange={handleChangeFull} />}
      />
      <FormControlLabel
        label="Hình tràn vừa"
        control={<Checkbox checked={checked[1]} onChange={handleChangeFullButSmall} />}
      />
       <FormControlLabel
        label="Hình nhỏ"
        control={<Checkbox checked={checked[2]} onChange={handleChangeHalf} />}
      />
    </Box>
  );

  return (
    <Box sx={{ ml: 1}}>
      <FormControlLabel
        label="Kích cỡ hình"
        control={
         <></>
        }
      />
      {children}
    </Box>
  );
}
