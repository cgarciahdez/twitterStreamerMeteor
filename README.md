# Colombia Tweets Visualizer

![demo image](/public/demo.png)


This is an app created from the boilerplate provided for the 2017-1 Web Development course at Uniandes. With it, you can visualize tweets in the Colombia map and see the latest ones in real time.

## Deploy

Clone or download the repository to your computer. Because this app uses the twitter api to get the stream of tweets, you will need to create a twitter developer app to get your consumer and access token keys and secrets. Next, you will need to set them to enviroments in your computer. Afterwards, you have to install the necessary npm packages and run the program:

### Mac Users

```
export TWITTER_CONSUMER_KEY="yourCredentialsHere"
export TWITTER_CONSUMER_SECRET="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_KEY="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_SECRET="yourCredentialsHere"

meteor npm install
meteor
```

### Windows Users

```
set TWITTER_CONSUMER_KEY=yourCredentialsHere
set TWITTER_CONSUMER_SECRET=yourCredentialsHere
set TWITTER_ACCESS_TOKEN_KEY=yourCredentialsHere
set TWITTER_ACCESS_TOKEN_SECRET=yourCredentialsHere

meteor npm install
meteor
```

After this, you can see your application in http://localhost:3000

Be sure to press enter in the query area to start the stream!

## Secret Sauce

The special add on of my project is the visualization of tweets when you hover over them in the map. That way, you can now _what_ they are saying in every part of the country, and not just sit down and wonder where that tweet about the free food came from!
