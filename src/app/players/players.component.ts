import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

export interface Position {
  flipX: boolean;
  flipY: boolean;
}

@Component({
  selector: "app-players",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      id="players"
      [class.pip-left]="position?.flipX"
      [class.pip-right]="!position?.flipX"
      [class.pip-top]="position?.flipY"
      [class.pip-bottom]="!position?.flipY"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class PlayersComponent {
  @Input() public position?: Position;
}
