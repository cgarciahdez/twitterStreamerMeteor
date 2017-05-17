import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx"
import HiddenOverlay from './HiddenOverlay.jsx'
import {Well} from 'react-bootstrap';



import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";
import Tweet from './Tweet.jsx'

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        proj: null,
        getPixel: null,
        tweetActual:""

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

  setGetPixel(p){
      console.log(p);
      this.setState({getPixel:p});
  }

  putTweet(x,y){
      console.log(x);
      var tweet = this.state.getPixel(x,y);
      console.log(tweet)
      this.setState({tweetActual:tweet})
  }


  render() {
    console.log("render!");
    return (
      <div>
          <div style={{'text-align':'center'}}><h1>Visualizador de tweets en Colombia<br></br><small>Camila García</small></h1></div>
          <hr></hr>
          <div className="col-md-6">
             <div><h4>Hover over the points and see the tweet to the right!</h4></div>
          <HiddenOverlay tweets={this.props.tweets} projection={this.state.proj} setPixel={this.setGetPixel.bind(this)}></HiddenOverlay>
          <Overlay tweets={this.props.tweets} projection={this.state.proj}></Overlay>
          <ColombiaMap
width="600"
height="600"
data={{RISARALDA:0}}
setProjection={this.setProjection.bind(this)}
putTweet={this.putTweet.bind(this)}
></ColombiaMap>

</div>
<div className="col-md-6">
    {this.state.tweetActual?
        <Well>
    <Tweet key={this.state.tweetActual.id} tweet={this.state.tweetActual}></Tweet>
    </Well>
    :
    <p></p>
    }
        <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Press enter to start stream!" style={{width:'200px'}}/>
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
