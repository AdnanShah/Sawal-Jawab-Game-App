import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const Menu = ({ data, label, onChange, className, value }) => {
  return (
    <TextField
      style={{ marginTop: "-5px" }}
      className={className}
      fullWidth
      select
      label={label}
      value={value}
      onChange={onChange}
    >
      {data.map(option => (
        <MenuItem key={option.question} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </TextField>
  );
};
export default Menu;

Menu.defaultProps = {
  data: "",
  value: ""
};
