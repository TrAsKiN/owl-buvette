import React, { Component } from "react";

export class Player extends Component {
  authenticate() {
    return window.gapi.auth2
      ?.getAuthInstance()
      .signIn({ scope: "https://www.googleapis.com/auth/youtube" })
      .then(
        function () {
          console.log("Sign-in successful");
        },
        function (err) {
          console.error("Error signing in", err);
        }
      );
  }
  loadClient() {
    window.gapi.client.setApiKey("AIzaSyCA9bUF-_tW7XUV4kA1J1tQntVgF6vqAhM");
    return window.gapi.client
      .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  execute() {
    return window.gapi.client.youtube.search
      .list({
        part: ["snippet"],
        channelId: "UCiAInBL9kUzz1XRxk66v-gw",
        eventType: "live",
        type: ["video"],
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }

  render() {
    window.gapi.load("client:auth2", function () {
      window.gapi.auth2.init({
        client_id:
          "319625395821-cut7ch6i98bm7t4u0om7felr61ktok66.apps.googleusercontent.com",
      });
    });
    this.authenticate()?.then(this.loadClient);

    const pipClass = [];
    if (this.props.isPip) {
      pipClass.push("pip");
      if (!this.props.isActive) {
        pipClass.push("invisible");
      }
    }
    if (
      this.props.url.startsWith("https://www.youtube.com/embed/live_stream")
    ) {
    }
    return (
      <iframe
        id={this.props.id}
        src={this.props.url}
        className={pipClass.join(" ")}
      />
    );
  }
}
