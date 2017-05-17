import React, {Component} from "react";
import { Meteor } from "meteor/meteor";


export default class Overlay extends Component {

    constructor(props) {
      super(props);

      this.state = {
          canvas: null
      }
      this.lastId=0
    }



    componentWillUpdate(nextP){
        var canvas = this.state.canvas;
        var ctx = canvas.getContext('2d');

        ctx.globalAlpha = 0.5;
        let maxId=this.lastId;
        ctx.fillStyle = '#9400d3';
        ctx.strokeStyle = 'black';
        nextP.tweets.map((tweet)=>{
                if(tweet.id>this.lastId){
                    ctx.beginPath();
                let point = this.props.projection(tweet.coordinates.coordinates);

                ctx.moveTo(point[0]+5, point[1]);
                ctx.arc(point[0], point[1], 5, 0, Math.PI * 2, true);
                ctx.fill();

                if(tweet.id>maxId){
                    maxId=tweet.id;
                }
            }

        });
        this.lastId=maxId;
    }




  render() {
      console.log(this.props.tweets);
    return (<div style={{position:"absolute","pointer-events":"none"}} className="overlay">
    	<canvas id="overlay" width="600" height="600" ref={(c)=>{this.state.canvas=c}}></canvas>
    </div>);
  }
}
