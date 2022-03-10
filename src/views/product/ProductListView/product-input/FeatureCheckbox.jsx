import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function FeatureCheckbox() {
  const [checked, setChecked] = React.useState([true, false, false]);

  const handleChangeFull = (event) => {
    const newCheckeds = [...checked]
    if(newCheckeds[0] == newCheckeds[1]) {
        setChecked([!newCheckeds[0], !newCheckeds[1], false]);
    } else if(newCheckeds[0] != newCheckeds[1]){
        setChecked([event.target.checked, event.target.checked, false]);
    }
   
  };

  const handleChangeFullButSmall = (event) => {
    const newCheckeds = [...checked]
    if(newCheckeds[0] && newCheckeds[1]) {
        setChecked([true, false, false]);
    } else {
        setChecked([true, true, false]);
    }
    
  };
  const handleChangeHalf = (event) => {
    setChecked([false, false, true]);
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
