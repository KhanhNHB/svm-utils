import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function PositionRadioButton() {
  const [value, setValue] = React.useState('false');

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
    
  };
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
