import React, {Component} from "react";
import { Meteor } from "meteor/meteor";



export default class Tweet extends Component {
  render() {
    return (<div className="tweet">
        <div className="row">
            <div className="col-md-1">
                <img src={this.props.tweet.user.profile_image_url} alt={this.props.tweet.user.screen_name + "profile image"}/>
            </div>

            <div className="col-md-11">
                <span>{this.props.tweet.created_at} </span>
            	<span><strong> @{this.props.tweet.user.screen_name}</strong> </span>
                <br></br>
              <span>{this.props.tweet.text} </span>
            </div>

      </div>
      <br></br>
      {/*<span>{JSON.stringify(this.props.tweet)}</span>*/}
    </div>);
  }
}
