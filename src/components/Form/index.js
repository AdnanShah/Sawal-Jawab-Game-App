import React from "react";

import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const ranges = [
  {
    value: "0-20",
    label: "0 to 20"
  },
  {
    value: "21-50",
    label: "21 to 50"
  },
  {
    value: "51-100",
    label: "51 to 100"
  }
];
class Form extends React.Component {
  state = {
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="row">
          <CardBox
            styleName="col-lg-12"
            heading={<IntlMessages id="Question:" />}
          >
            <div className="row">
              <Input
                defaultValue="Questions # 1"
                className="w-100 mb-3"
                inputProps={{
                  "aria-label": "Description"
                }}
              />
              <TextField
                select
                className="w-25 ml-3 mb-3"
                value={this.state.weightRange}
                onChange={this.handleChange("weightRange")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Question Category
                    </InputAdornment>
                  )
                }}
              >
                {ranges.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                className="w-25 ml-3 mb-3"
                value={this.state.weightRange}
                onChange={this.handleChange("weightRange")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Question Level
                    </InputAdornment>
                  )
                }}
              >
                {ranges.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </CardBox>
        </div>
      </div>
    );
  }
}

export default Form;
