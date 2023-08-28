import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { tap } from "rxjs";
import { StorageService } from "../storage.service";

@Injectable()
export class StateEffects {
  saveState$ = createEffect(
    () =>
      this.actions$.pipe(
        tap((action) => {
          console.log(action);
          this.storage.save();
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private storage: StorageService,
  ) {}
}
