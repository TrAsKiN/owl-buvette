import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";
import { CASTS } from "./cast";
import { ChatCommandsComponent } from "./chat-commands/chat-commands.component";
import { ChatComponent } from "./chat/chat.component";
import { FooterComponent } from "./footer/footer.component";
import { Player, PlayerComponent } from "./player/player.component";
import { PlayersCommandsComponent } from "./players-commands/players-commands.component";
import { PlayersComponent, Position } from "./players/players.component";

export type Pip = "host" | "cast";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "app.component.html",
  imports: [
    CommonModule,
    RouterOutlet,
    PlayersComponent,
    PlayerComponent,
    ChatComponent,
    FooterComponent,
    PlayersCommandsComponent,
    ChatCommandsComponent,
  ],
})
export class AppComponent {
  private pip: Pip = "host";

  protected theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "theme-dark"
    : "theme-light";
  protected channel = "fefegg";
  protected position: Position = {
    flipX: false,
    flipY: false,
  };
  protected host: Player = {
    id: "host",
    isPip: this.pip === "host",
    url: `https://player.twitch.tv/?channel=${this.channel}`,
  };
  protected cast: Player = {
    id: "cast",
    isPip: this.pip === "cast",
    url: null,
  };

  constructor(
    renderer: Renderer2,
    route: ActivatedRoute,
    cd: ChangeDetectorRef
  ) {
    route.fragment
      .pipe(
        filter((fragment) => fragment !== ""),
        takeUntilDestroyed()
      )
      .subscribe((fragment) => {
        if (fragment) {
          const cast = CASTS.find(
            (cast) => cast.hash === fragment && !cast.disabled
          );
          if (cast) {
            this.cast.url = cast.url;
            return;
          }
        }
        const defaultCast = CASTS.find((cast) => !cast.disabled);
        if (defaultCast) {
          this.cast.url = defaultCast.url;
          return;
        }
        throw new Error("Unable to find a cast!");
      });
    renderer.setAttribute(
      window.document.body,
      "data-bs-theme",
      window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"
    );
    renderer.addClass(window.document.body, this.theme);
  }
}
