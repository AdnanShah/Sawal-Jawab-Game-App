import React, { Component } from "react";
import IntlMessages from "util/IntlMessages";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import List from "@material-ui/core/List";
import Collapsible from "react-collapsible";
import Button from "@material-ui/core/Button";
import { questions, level, category } from "./data";
import SearchBox from "./../SearchBox/index";
import red from "@material-ui/core/colors/red";
import Menu from "./../Menu/index";
import purple from "@material-ui/core/colors/purple";

class QuestionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x_access_key: "ZVYC-9AA9-13QT-484S",
      x_access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNTMwOTMyMzY2fQ.zqmGxDLhsKFomoYcDwFVArh5CZzSzJUrubHisOwEB80",
      userArray: [],
      originalResponse: [],
      questions,
      searchText: "",
      category: "",
      level: ""
    };
  }
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
        console.table(userArray);
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
        this.setState({ userArray, originalResponse: userArray });
      })
      .catch(err => {
        console.log("error in res", err);
      });
  }
  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value
    });
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  searchBy = () => {
    let searchBy = [];
    {
      searchBy.push(
        ...this.state.originalResponse.filter(item => {
          let searchText =
            this.state.searchText != ""
              ? item.question
                  .toLowerCase()
                  .search(this.state.searchText.toLowerCase()) !== -1
              : true;
          let category =
            this.state.category != ""
              ? item.type.toLowerCase() === this.state.category.toLowerCase()
              : true;
          let level =
            this.state.level != ""
              ? item.difficulty.toLowerCase() === this.state.level.toLowerCase()
              : true;

          return searchText && category && level;
        })
      );
    }
    // console.table(searchBy, ["id", "question", "difficulty", "type"]);
    this.setState({ userArray: searchBy });
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="m-5">
          <Paper
            styleName="col-lg-12 h-100"
            heading={<IntlMessages id="Question List:" />}
          >
            <h1 className="ml-2 bold mb-5 mt-5 ">Question List</h1>
            <div
              className="well m-5"
              style={{
                backgroundColor: "#42A5F5",
                borderRadius: "5px!important"
              }}
            >
              <h1 className="ml-2">Search Here:</h1>
              <div className="row mb-5">
                <SearchBox
                  className="col-3"
                  styleName="mt-2 ml-5 mb-2"
                  placeholder=""
                  onChange={this.handleChange("searchText")}
                  value={this.state.searchText}
                />
                <Menu
                  className="col-2 ml-2 mr-2 mb-2 text-light"
                  label="Select Category"
                  data={category}
                  value={this.state.category}
                  onChange={this.handleChange("category")}
                />
                <Menu
                  className="col-2 ml-2 mr-2 mb-2 text-light"
                  label="Select Level"
                  data={level}
                  value={this.state.level}
                  onChange={this.handleChange("level")}
                />
                <Button
                  className="col-2 ml-2 mr-2 mb-2 text-light"
                  variant="contained"
                  color="primary"
                  onClick={this.searchBy}
                >
                  Filter
                </Button>
              </div>
            </div>
            {this.state.userArray.map((item, i) => {
              return (
                <div className="mr-5 ml-5" style={{ lineHeight: "2px" }}>
                  <Collapsible trigger={`Q#${i + 1}   ${item.question}`}>
                    <h1>{item.question}</h1>

                    <div className="row">
                      <div className="col">
                        <List component="nav">
                          <div className="row mt-2 mb-2 ml-5">
                            <p className="col">{`a:   ${item.answer}`}</p>
                          </div>
                          <div className="row mt-2 mb-2 ml-5">
                            <p className="col">{`b:   ${item.option_b}`}</p>
                          </div>
                          <div className="row mt-2 mb-2 ml-5">
                            <p className="col">{`c:   ${item.option_c}`}</p>
                          </div>
                          <div className="row mt-2 mb-2 ml-5">
                            <p className="col">{`d:   ${item.option_d}`}</p>
                          </div>
                        </List>
                      </div>
                      <div className="col-2 float-left">
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          className="ml-5"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </Collapsible>
                </div>
              );
            })}
          </Paper>
        </div>
      </div>
    );
  }
}

export default QuestionsList;
