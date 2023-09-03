import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState, provideStore } from "@ngrx/store";
import { routes } from "./app.routes";
import { StateEffects } from "./store/state.effects";
import { stateReducer } from "./store/state.reducer";
import { featureKey } from "./store/state.selectors";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: featureKey, reducer: stateReducer }),
    provideEffects(StateEffects),
  ],
};
