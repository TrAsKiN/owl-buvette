import { createAction, props } from "@ngrx/store";
import { Pip, Position, State } from "../app.model";

export const setState = createAction(
  "[State] set state",
  props<{ newState: State }>(),
);

export const setPip = createAction("[State] set PiP", props<{ pip: Pip }>());

export const setPipActive = createAction(
  "[State] set PiP active",
  props<{ pipActive: boolean }>(),
);

export const setPipAboveChat = createAction(
  "[State] set PiP above chat",
  props<{ pipAboveChat: boolean }>(),
);

export const setPosition = createAction(
  "[State] set PiP position",
  props<{ position: Position }>(),
);

export const setShowChat = createAction(
  "[State] set show chat",
  props<{ showChat: boolean }>(),
);
