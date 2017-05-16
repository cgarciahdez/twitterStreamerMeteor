import React, {Component} from "react";
import { Meteor } from "meteor/meteor";


export default class Overlay extends Component {

    constructor(props) {
      super(props);

      this.state = {
          canvas: null
      }
    }

    drawPoints(){
        var canvas = this.state.canvas;
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        console.log(this.props.tweets)
        this.props.tweets.map((tweet)=>{
            let point = this.props.projection(tweet.coordinates.coordinates);
            console.log(point);
            ctx.moveTo(point[0], point[1]);
            ctx.arc(point[0], point[1], 5, 0, Math.PI * 2, true);

        });
        ctx.fill();


    }

    componentDidMount(){
        console.log(this.props.tweets);
        var canvas = this.state.canvas;
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        console.log(this.props.tweets)
        this.props.tweets.map((tweet)=>{
            let point = this.props.projection(tweet.coordinates.coordinates);
            console.log(point);
            ctx.moveTo(point[0], point[1]);
            ctx.arc(point[0], point[1], 5, 0, Math.PI * 2, true);

        });
        ctx.fill();
    }


  render() {
      console.log(this.props.tweets);
    return (<div className="overlay">
    	<canvas id="overlay" width="600" height="600" ref={(c)=>{this.state.canvas=c}}></canvas>
    </div>);
  }
}
