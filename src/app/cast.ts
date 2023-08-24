export interface Cast {
  hash: string;
  name: string;
  disabled: boolean;
  url: string;
}

export const CASTS: Cast[] = [
  {
    hash: "#owlFR",
    name: "OWL FR",
    disabled: false,
    url: "https://www.youtube.com/embed/live_stream?channel=UCI45pR3yMi0uGE47ewT43Ow",
  },
  {
    hash: "#owlEN",
    name: "OWL EN",
    disabled: false,
    url: "https://www.youtube.com/embed/live_stream?channel=UCiAInBL9kUzz1XRxk66v-gw",
  },
  {
    hash: "#contendersFR",
    name: "Contenders FR",
    disabled: false,
    url: "https://www.youtube.com/embed/live_stream?channel=UCJIvTeyysEHViDfNz3stLYQ",
  },
  {
    hash: "#contendersEN",
    name: "Contenders EN",
    disabled: false,
    url: "https://www.youtube.com/embed/live_stream?channel=UCWPW0pjx6gncOEnTW8kYzrg",
  },
  {
    hash: "#contendersTrials",
    name: "Contenders Trials EU",
    disabled: true,
    url: "https://www.youtube.com/embed/live_stream?channel=UCLj0Gz2FQKDyCWE5gk4iO_A",
  },
  {
    hash: "#contendersTwitch",
    name: "Contenders Twitch",
    disabled: true,
    url: "https://player.twitch.tv/?channel=overwatchcontenders",
  },
  {
    hash: "#overwatchYT",
    name: "Overwatch YouTube",
    disabled: true,
    url: "https://www.youtube.com/embed/live_stream?channel=UClOf1XXinvZsy4wKPAkro2A",
  },
  {
    hash: "#overwatchTTV",
    name: "Overwatch Twitch",
    disabled: true,
    url: "https://player.twitch.tv/?channel=playoverwatch",
  },
];
