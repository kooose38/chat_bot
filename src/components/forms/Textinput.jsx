import React from 'react';
import TextField from '@material-ui/core/TextField';

const Textinput = (props) => {
   return (
      <TextField
         fullWidth={props.fullWidth}
         margin="dense"
         required={props.requierd}
         rows={props.rows}
         value={props.value}
         label={props.label}
         onChange={props.onChange}
      />
   )
};

export default Textinput;