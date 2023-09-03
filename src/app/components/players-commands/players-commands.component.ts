import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { Cast, Pip, Position } from "../../app.model";
import { CASTS } from "../../cast";
import { setPip, setPipActive, setPosition } from "../../store/state.actions";
import {
  selectPip,
  selectPipAboveChat,
  selectPipActive,
  selectPosition,
} from "../../store/state.selectors";

@Component({
  selector: "app-players-commands",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "players-commands.component.html",
})
export class PlayersCommandsComponent {
  @Input() public selectedCast?: Cast;
  @Input() public host?: string;

  protected casts = CASTS.filter(cast => !cast.disabled);

  protected pip?: Pip;
  protected pipActive?: boolean;
  protected pipAboveChat?: boolean;
  private position?: Position;

  constructor(private store: Store) {
    this.store
      .select(selectPip)
      .pipe(takeUntilDestroyed())
      .subscribe(pip => (this.pip = pip));
    this.store
      .select(selectPipActive)
      .pipe(takeUntilDestroyed())
      .subscribe(pipActive => (this.pipActive = pipActive));
    this.store
      .select(selectPipAboveChat)
      .pipe(takeUntilDestroyed())
      .subscribe(pipAboveChat => (this.pipAboveChat = pipAboveChat));
    this.store
      .select(selectPosition)
      .pipe(takeUntilDestroyed())
      .subscribe(position => (this.position = position));
  }

  onChangeSwap() {
    this.store.dispatch(setPip({ pip: this.pip === "cast" ? "host" : "cast" }));
  }
  onChangeActive() {
    this.store.dispatch(setPipActive({ pipActive: !this.pipActive ?? true }));
  }
  onChangeX() {
    this.store.dispatch(
      setPosition({
        position: {
          flipX: !this.position?.flipX ?? true,
          flipY: this.position?.flipY ?? true,
        },
      }),
    );
  }
  onChangeY() {
    this.store.dispatch(
      setPosition({
        position: {
          flipX: this.position?.flipX ?? true,
          flipY: !this.position?.flipY ?? true,
        },
      }),
    );
  }
}
