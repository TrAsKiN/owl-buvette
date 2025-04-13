import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from "@angular/core";
import { Cast, Pip, Position } from "../../app.model";
import { CASTS } from "../../cast";

@Component({
  selector: "app-players-commands",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "players-commands.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersCommandsComponent {
  public selectedCast = input<Cast>();
  public host = input<string>();
  public pip = model<Pip>();
  public pipActive = model<boolean>();
  public pipAboveChat = model<boolean>();
  public position = model<Position>();

  protected casts = CASTS.filter(cast => !cast.disabled);

  onChangeSwap() {
    this.pip.update(pip => (pip === Pip.Cast ? Pip.Host : Pip.Cast));
  }
  onChangeActive() {
    this.pipActive.update(pipActive => !pipActive ?? true);
  }
  onChangeX() {
    this.position.update(position => ({
      flipX: !position?.flipX ?? true,
      flipY: position?.flipY ?? true,
    }));
  }
  onChangeY() {
    this.position.update(position => ({
      flipX: position?.flipX ?? true,
      flipY: !position?.flipY ?? true,
    }));
  }
}
