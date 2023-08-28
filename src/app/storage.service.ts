import { Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { State } from "./app.model";
import { setState } from "./store/state.actions";
import { selectState } from "./store/state.selectors";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private data?: State;

  constructor(store: Store) {
    const storedState = window.localStorage.getItem("state");
    if (storedState && storedState !== "") {
      store.dispatch(setState({ newState: JSON.parse(storedState) }));
    }

    store
      .select(selectState)
      .pipe(
        takeUntilDestroyed(),
        tap((state) => console.log("state", state)),
      )
      .subscribe((state) => (this.data = state));
  }

  public save() {
    window.localStorage.setItem("state", JSON.stringify(this.data));
  }
}
