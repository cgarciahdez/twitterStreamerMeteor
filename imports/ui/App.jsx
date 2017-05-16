import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx"


import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        proj: null,
    }

  }

  setProjection(p){
      this.setState({proj:p})
  }

  getProjection(){
      return this.state.proj;
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }


  render() {
    console.log("render!");
    return (
      <div>
          <Overlay tweets={this.props.tweets} projection={this.state.proj}></Overlay>
          <ColombiaMap
width="600"
height="600"
data={{RISARALDA:10}}
setProjection={this.setProjection.bind(this)}
></ColombiaMap>
        <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <h2>Results:</h2>
        {this.props && this.props.tweets ?
          <div>
              <TweetsResults tweets={this.props.tweets}/>

          </div> :
          <p>Enter a query</p>
        }

      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);
