import React, { Component } from "react";
import CardBox from "components/CardBox/index";
import IntlMessages from "util/IntlMessages";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ReactTable from "react-table";

class ReactTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x_access_key: "ZVYC-9AA9-13QT-484S",
      x_access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNTMwOTMyMzY2fQ.zqmGxDLhsKFomoYcDwFVArh5CZzSzJUrubHisOwEB80"
    };
  }
  componentWillMount() {
    console.log("in did mount");
    let data = this.state.x_access_key;
    let token = this.state.x_access_token;
    axios({
      method: 'POST',
      url: 'https://seenmeem.herokuapp.com/api/services/fetchQuestionsList',
      headers: {
        'x-access-key': data,
        'x-access-token':token, 
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(res => {
      // let key = Object.keys(res.data.data);
      console.log("key", res.data)
      // let all_user = [];
      // for (let i = 0; i < key.length; i++) {
      //   let k = key[i]
      //   all_user.push({
      //     DayNameEnglish: res.data.data[k].DayNameEnglish,
      //     DayNameArabic: res.data.data[k].DayNameArabic,
      //     OfferDate: res.data.data[k].OfferDate,
      //     ItemName: res.data.data[k].ItemName,
      //   })
      // }
      // this.setState({ userArray: all_user });
    }).catch((err) => {
      console.log("error in res", err)
    })
  }
  render() {
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <CardBox
            styleName="col-lg-12"
            heading={<IntlMessages id="Question List:" />}
          >
            <div>asdasdasd</div>
          </CardBox>
        </div>
      </div>
    );
  }
}

export default ReactTables;
