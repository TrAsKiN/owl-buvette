import { CommonModule } from "@angular/common";
import { Component, Renderer2 } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter } from "rxjs";
import { Cast, Player, Theme } from "./app.model";
import { CASTS } from "./cast";
import { ChatCommandsComponent } from "./chat-commands/chat-commands.component";
import { ChatComponent } from "./chat/chat.component";
import { FooterComponent } from "./footer/footer.component";
import { PlayerComponent } from "./player/player.component";
import { PlayersCommandsComponent } from "./players-commands/players-commands.component";
import {
  selectPipAboveChat,
  selectPosition,
  selectShowChat,
} from "./store/state.selectors";
import { THEMES } from "./theme";

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
  protected theme?: Theme = THEMES.find(
    (theme) =>
      theme.id ===
      (window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"),
  );
  protected channel = "fefegg";
  protected host: Player = {
    type: "host",
    url: `https://player.twitch.tv/?channel=${this.channel}`,
  };
  protected cast: Player = {
    type: "cast",
    url: null,
  };
  protected selectedCast?: Cast;
  protected position$ = this.store.select(selectPosition);
  protected showChat$ = this.store.select(selectShowChat);

  constructor(
    renderer: Renderer2,
    route: ActivatedRoute,
    private store: Store,
  ) {
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
    store
      .select(selectPipAboveChat)
      .pipe(takeUntilDestroyed())
      .subscribe((pipAboveChat) => {
        if (pipAboveChat) {
          renderer.addClass(window.document.body, "above");
        } else {
          renderer.removeClass(window.document.body, "above");
        }
      });
    store
      .select(selectShowChat)
      .pipe(takeUntilDestroyed())
      .subscribe((showChat) => {
        if (!showChat) {
          renderer.addClass(window.document.documentElement, "fullscreen");
        } else {
          renderer.removeClass(window.document.documentElement, "fullscreen");
        }
      });
  }

  protected isDark() {
    return this.theme?.id === "dark";
  }
}
