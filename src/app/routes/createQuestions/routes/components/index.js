import React from "react";

import ContainerHeader from "components/ContainerHeader/index";
import CardBox from "components/CardBox/index";

import TextFields from "../../../components/routes/textFields/textField/TextFields";
import ComposedTextField from "../../../components/routes/textFields/components/ComposedTextField";
import TextFieldMargins from "../../../components/routes/textFields/layout/TextFieldMargins";
import Inputs from "../../../components/routes/textFields/inputs/Inputs";

import Checkboxes from "../../../components/routes/selection/checkboxes/Checkboxes";
import RadioButtonsGroup from "../../../components/routes/selection/radioButtons/RadioButtonsGroup";
import RadioButtons from "../../../components/routes/selection/radioButtons/RadioButtons";
import Switches from "../../../components/routes/selection/switches/Switches";
import SwitchLabels from "../../../components/routes/selection/switches/SwitchLabels";

import SimpleSelect from "../../../components/routes/selects/simple/SimpleSelect";
import NativeSelect from "../../../components/routes/selects/native/NativeSelect";
import MultipleSelect from "../../../components/routes/selects/multi/MultipleSelect";
import DialogSelect from "../../../components/routes/selects/dialog/DialogSelect";

import CircularIndeterminate from "../../../components/routes/progressbar/circular/indeterminate/CircularIndeterminate";
import CircularFab from "../../../components/routes/progressbar/circular/interactive/CircularFab";
import CircularDeterminate from "../../../components/routes/progressbar/circular/determinate/CircularDeterminate";
import LinearIndeterminate from "../../../components/routes/progressbar/linear/indeterminate/LinearIndeterminate";
import LinearDeterminate from "../../../components/routes/progressbar/linear/determinate/LinearDeterminate";
import LinearBuffer from "../../../components/routes/progressbar/linear/buffer/LinearBuffer";
import LinearQuery from "../../../components/routes/progressbar/linear/query/LinearQuery";

import DatePickers from "../../../components/routes/pickers/date/DatePickers";
import DateAndTimePickers from "../../../components/routes/pickers/dateTime/DateAndTimePickers";
import TimePickers from "../../../components/routes/pickers/time/TimePickers";
import CustomDateTimePicker from "../../../components/routes/pickers/customDateTimePicker/CustomDateTimePicker";
import WeekPicker from "../../../components/routes/pickers/weekPicker/WeekPicker";

import SimpleDialogDemo from "../../../components/routes/dialogs/simple/SimpleDialogDemo";
import AlertDialog from "../../../components/routes/dialogs/alerts/AlertDialog";
import AlertDialogSlide from "../../../components/routes/dialogs/slideAlerts/AlertDialogSlide";
import ConfirmationDialogDemo from "../../../components/routes/dialogs/confirmation/ConfirmationDialogDemo";
import FullScreenDialog from "../../../components/routes/dialogs/fullScreen/FullScreenDialog";
import FormDialog from "../../../components/routes/dialogs/formAlerts/FormDialog";

import Chip from "../../../components/routes/chips/simpleChip/Chips";
import ChipsArray from "../../../components/routes/chips/chipArray/ChipsArray";
import IntlMessages from "util/IntlMessages";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="Questions" />}
        />
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
