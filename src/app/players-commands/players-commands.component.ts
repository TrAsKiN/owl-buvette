import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CASTS, Cast } from "../cast";
import { THEMES, Theme } from "../theme";

@Component({
  selector: "app-players-commands",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "players-commands.component.html",
})
export class PlayersCommandsComponent {
  @Input() public selectedCast?: Cast;
  @Input() public selectedTheme?: Theme;

  protected casts = CASTS.filter((cast) => !cast.disabled);
  protected themes = THEMES;

  onChangeTheme(event: Event) {
    event.preventDefault();
  }
}
