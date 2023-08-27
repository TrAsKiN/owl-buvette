import { CommonModule } from "@angular/common";
import { Component, Renderer2 } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";
import { CASTS, Cast } from "./cast";
import { ChatCommandsComponent } from "./chat-commands/chat-commands.component";
import { ChatComponent } from "./chat/chat.component";
import { FooterComponent } from "./footer/footer.component";
import { Player, PlayerComponent } from "./player/player.component";
import { PlayersCommandsComponent } from "./players-commands/players-commands.component";
import { THEMES, Theme } from "./theme";

export type Pip = "host" | "cast";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "app.component.html",
  imports: [
    CommonModule,
    RouterOutlet,
    PlayerComponent,
    ChatComponent,
    FooterComponent,
    PlayersCommandsComponent,
    ChatCommandsComponent,
  ],
})
export class AppComponent {
  private pip: Pip = "host";

  protected theme?: Theme = THEMES.find(
    (theme) =>
      theme.id ===
      (window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"),
  );
  protected channel = "fefegg";
  protected position = {
    flipX: false,
    flipY: false,
  };
  protected host: Player = {
    id: "host",
    isPip: true,
    url: `https://player.twitch.tv/?channel=${this.channel}`,
  };
  protected cast: Player = {
    id: "cast",
    isPip: false,
    url: null,
  };
  protected selectedCast?: Cast;

  constructor(renderer: Renderer2, route: ActivatedRoute) {
    route.fragment
      .pipe(
        takeUntilDestroyed(),
        filter((fragment) => fragment !== ""),
      )
      .subscribe((fragment) => {
        const cast = CASTS.find(
          (cast) => cast.hash.slice(1) === fragment && !cast.disabled,
        );
        if (cast && this.cast.url !== cast.url) {
          this.cast.url = cast.url;
          this.selectedCast = cast;
          return;
        }
        const defaultCast = CASTS.find((cast) => !cast.disabled);
        if (defaultCast && this.cast.url !== defaultCast.url) {
          this.cast.url = defaultCast.url;
          this.selectedCast = defaultCast;
          return;
        }
        throw new Error("Unable to find a cast!");
      });
    if (this.theme) {
      renderer.setAttribute(
        window.document.body,
        "data-bs-theme",
        this.theme?.id,
      );
      renderer.addClass(window.document.body, this.theme.id);
    }
  }

  protected isDark() {
    return this.theme?.id === "dark";
  }
}
