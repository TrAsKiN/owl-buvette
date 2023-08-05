import React, { Component } from "react";
import { getLiveStreamFromChannel } from "./Youtube";

export class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { url: props.url };
  }

  async getLiveUrl() {
    if (
      this.props.url.startsWith("https://www.youtube.com/embed/live_stream")
    ) {
      const channelId = new URL(this.props.url).searchParams.get("channel");
      const liveUrl = await getLiveStreamFromChannel(channelId);
      console.log(liveUrl);
      this.setState({ url: liveUrl ?? this.props.url });
    }
  }

  componentDidMount() {
    this.getLiveUrl();
  }

  render() {
    const pipClass = [];
    if (this.props.isPip) {
      pipClass.push("pip");
      if (!this.props.isActive) {
        pipClass.push("invisible");
      }
    }

    console.log(this.state.url);

    return (
      <iframe
        id={this.props.id}
        src={this.state.url}
        className={pipClass.join(" ")}
      />
    );
  }
}
