import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../app.model";

export const featureKey = "state";

export const selectFeature = createFeatureSelector<State>(featureKey);

export const selectState = createSelector(
  selectFeature,
  (state: State) => state,
);

export const selectPosition = createSelector(
  selectFeature,
  (state: State) => state && state.position,
);

export const selectPip = createSelector(
  selectFeature,
  (state: State) => state && state.pip,
);

export const selectPipActive = createSelector(
  selectFeature,
  (state: State) => state && state.pipActive,
);

export const selectPipAboveChat = createSelector(
  selectFeature,
  (state: State) => state && state.pipAboveChat,
);

export const selectShowChat = createSelector(
  selectFeature,
  (state: State) => state && state.showChat,
);
