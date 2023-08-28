import { createReducer, on } from "@ngrx/store";
import { State } from "../app.model";
import * as StateActions from "./state.actions";

export const initialState: State = {
  position: {
    flipX: false,
    flipY: false,
  },
  pip: "host",
  pipActive: true,
  pipAboveChat: false,
  showChat: true,
};

export const stateReducer = createReducer(
  initialState,
  on(StateActions.setState, (_state, { newState }) => newState),
  on(StateActions.setPip, (state, { pip }) => ({ ...state, pip })),
  on(StateActions.setPosition, (state, { position }) => ({
    ...state,
    position,
  })),
  on(StateActions.setPipActive, (state, { pipActive }) => ({
    ...state,
    pipActive,
  })),
  on(StateActions.setPipAboveChat, (state, { pipAboveChat }) => ({
    ...state,
    pipAboveChat,
  })),
  on(StateActions.setShowChat, (state, { showChat }) => ({
    ...state,
    showChat,
  })),
);
