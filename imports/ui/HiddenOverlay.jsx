import React, {Component} from "react";
import { Meteor } from "meteor/meteor";


export default class HiddenOverlay extends Component {

    constructor(props) {
      super(props);

      this.state = {
          canvas: null,

      }
      this.tweets = {};
      this.lastId=0
      this.counter=1
    }


    findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    componentWillUpdate(nextP){
        var canvas = this.state.canvas;
        var ctx = canvas.getContext('2d');

        let maxId=this.lastId;

        nextP.tweets.map((tweet)=>{
            if(tweet.id>this.lastId){
                ctx.beginPath();
                let b = this.counter%256
                let g = Math.floor(this.counter/256)%256
                let r = Math.floor(this.counter/(256*256))%256
                colorLlave = r+","+g+","+b;
                color = 'rgba('+r+","+g+","+b+',255)';
                console.log(color);
                console.log(colorLlave);
                ctx.fillStyle = 'rgba('+r+","+g+","+b+',255)';
                console.log(ctx);
                let point = this.props.projection(tweet.coordinates.coordinates);

                ctx.moveTo(point[0]+5, point[1]);
                ctx.arc(point[0], point[1], 5, 0, Math.PI * 2, true);
                ctx.fill();

                if(tweet.id>maxId){
                    maxId=tweet.id;
                }
                this.tweets[colorLlave] = tweet;
                console.log(this.tweets)
                this.counter+=1;
            }

        });
        this.lastId=maxId;


        //ctx.stroke();

    }

    getPixelColor(x,y){
        console.log(x);
        var canvas = this.state.canvas;
        var ctx = canvas.getContext('2d');
        var p = ctx.getImageData(x, y, 1, 1).data;
        console.log(p);
        var t = this.tweets[p[0]+","+p[1]+","+p[2]]
        // console.log(t);
        return t;
    }

    componentDidMount(){
        console.log(this.getPixelColor.bind(this))
        this.props.setPixel(this.getPixelColor.bind(this));
    }


  render() {
      console.log(this.props.tweets);
    return (<div ref="elem" style={{position:"absolute","visibility":"hidden"}} className="overlay" >
    	<canvas id="overlay" width="600" height="600" ref={(c)=>{this.state.canvas=c}}></canvas>
    </div>);
  }
}
