import React from "react";

import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

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
    showPassword: false,
    checkedA: true,
    checkedB: true
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <CardBox
            styleName="col-lg-12"
            heading={<IntlMessages id="Question:" />}
          >
            <div className="row">
              <TextField
                id="question"
                label="Question"
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
                fullWidth
              />
              <div className="col">
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Check the correct answer/answers options
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <div>
                          <Checkbox
                            checked={this.state.option1}
                            onChange={this.handleChange("option1")}
                            value="option1"
                          />
                          <TextField
                            id="option1"
                            label="Option#1"
                            value={this.state.option1}
                            onChange={this.handleChange("option1")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Checkbox
                            checked={this.state.option2}
                            onChange={this.handleChange("option2")}
                            value="option1"
                          />
                          <TextField
                            id="option2"
                            label="Option#2"
                            value={this.state.option2}
                            onChange={this.handleChange("option2")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Checkbox
                            checked={this.state.option3}
                            onChange={this.handleChange("option3")}
                            value="option3"
                          />
                          <TextField
                            id="option3"
                            label="Option#3"
                            value={this.state.option3}
                            onChange={this.handleChange("option3")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Checkbox
                            checked={this.state.option4}
                            onChange={this.handleChange("option4")}
                            value="option4"
                          />
                          <TextField
                            id="option4"
                            label="Option#4"
                            value={this.state.option4}
                            onChange={this.handleChange("option4")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
              </div>

              <div
                className="col-4 mt-5"
                //   style={{ border: "2px solid red" }}
              >
                <h1 className="text-danger text-center mb-2">Mandatory Options</h1>
                <div className="">
                  <TextField
                    select
                    value={this.state.weightRange}
                    onChange={this.handleChange("weightRange")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Category
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
                  {/* </div>
                <div className=""> */}
                  <TextField
                    select
                    className="mt-5"
                    value={this.state.weightRange}
                    onChange={this.handleChange("weightRange")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Level</InputAdornment>
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
              </div>
            </div>
          </CardBox>
        </div>
      </div>
    );
  }
}

export default Form;
