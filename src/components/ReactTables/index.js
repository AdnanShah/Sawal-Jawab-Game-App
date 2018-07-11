import React, { Component } from "react";
import IntlMessages from "util/IntlMessages";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
const questions = [
  {
    id: 1,
    question: "question#1",
    options1: "options1",
    options2: "options2",
    options3: "options3",
    options4: "options4"
  },
  {
    id: 2,
    question: "question#2",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  },
  {
    id: 3,
    question: "question#3",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  },
  {
    id: 4,
    question: "question#4",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  },
  {
    id: 5,
    question: "question#5",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  },
  {
    id: 6,
    question: "question#6",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  },
  {
    id: 7,
    question: "question#7",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  },
  {
    id: 8,
    question: "question#8",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  },
  {
    id: 9,
    question: "question#9",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  },
  {
    id: 10,
    question: "question#10",
    options1: "",
    options2: "",
    options3: "",
    options4: ""
  }
];

class ReactTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x_access_key: "ZVYC-9AA9-13QT-484S",
      x_access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNTMwOTMyMzY2fQ.zqmGxDLhsKFomoYcDwFVArh5CZzSzJUrubHisOwEB80",
      open: true,
      userArray: [],
      questions
    };
  }
  handleClick = i => {
    console.log("i", i);
    console.log("questions", questions[i]);
    this.setState(state => ({ open: !state.open }));
  };
  componentWillMount() {
    console.log("in did mount");
    let data = this.state.x_access_key;
    let token = this.state.x_access_token;
    axios({
      method: "POST",
      url: "https://seenmeem.herokuapp.com/api/services/fetchQuestionsList",
      headers: {
        "x-access-key": data,
        "x-access-token": token
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        let userArray = res.data.message;
        console.log("key", userArray);
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
        this.setState({ userArray });
      })
      .catch(err => {
        console.log("error in res", err);
      });
  }
  render() {
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <Paper
            styleName="col-lg-12 h-100"
            heading={<IntlMessages id="Question List:" />}
          >
            {questions.map((item, i) => {
              return (
                <List component="nav">
                  <ListItem button onClick={this.handleClick.bind(this, i)}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={item.question} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className="">
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText inset primary={item.options1} />
                      </ListItem>
                      <ListItem button className="">
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText inset primary={item.options2} />
                      </ListItem>
                      <ListItem button className="">
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText inset primary={item.options3} />
                      </ListItem>
                      <ListItem button className="">
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText inset primary={item.options4} />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              );
            })}
          </Paper>
        </div>
      </div>
    );
  }
}

export default ReactTables;
