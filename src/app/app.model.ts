export enum Pip {
  Host = "host",
  Cast = "cast",
}

export interface Cast {
  hash: string;
  name: string;
  disabled: boolean;
  url: string;
}
export interface Theme {
  id: string;
  name: string;
}
export interface Position {
  flipX: boolean;
  flipY: boolean;
}
export interface Player {
  type: Pip;
  url?: string;
}
export interface State {
  position: Position;
  pip: Pip;
  pipActive: boolean;
  pipAboveChat: boolean;
  showChat: boolean;
}
