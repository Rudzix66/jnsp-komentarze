import React, { Component } from "react";
import Comments from "./Comments.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(
      "https://www.googleapis.com/youtube/v3/commentThreads?key=YOUR_API_KEY_HERE&textFormat=plainText&part=snippet&videoId=V6u-ly1JvNs&maxResults=200"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ comments: data });
      })
      .catch(console.log);
  }

  render() {
    if (this.state.comments) {
      return <Comments comments={this.state.comments} />;
    } else {
      return null;
    }
  }
}

export default App;
