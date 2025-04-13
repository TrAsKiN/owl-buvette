import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  effect,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs";
import { Cast, Pip, Player, Theme } from "./app.model";
import { CASTS } from "./cast";
import { ChatCommandsComponent } from "./components/chat-commands/chat-commands.component";
import { ChatComponent } from "./components/chat/chat.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PlayerComponent } from "./components/player/player.component";
import { PlayersCommandsComponent } from "./components/players-commands/players-commands.component";
import { THEMES } from "./theme";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    imports: [
        CommonModule,
        PlayerComponent,
        ChatComponent,
        FooterComponent,
        PlayersCommandsComponent,
        ChatCommandsComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected DEFAULT_HOST = "fefegg";

  protected theme?: Theme = THEMES.find(
    theme =>
      theme.id ===
      (window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"),
  );

  protected channel = this.DEFAULT_HOST;
  protected host: Player = { type: Pip.Host, url: undefined };
  protected cast: Player = { type: Pip.Cast, url: undefined };

  protected selectedCast?: Cast;
  protected position = { flipX: false, flipY: false };
  protected showChat = signal(true);
  protected pip = signal(Pip.Host);
  protected pipActive = signal(true);
  protected pipAboveChat = signal(false);

  constructor(renderer: Renderer2, route: ActivatedRoute) {
    this.host.url = `https://player.twitch.tv/?channel=${this.channel}`;
    route.fragment
      .pipe(
        takeUntilDestroyed(),
        filter(fragment => fragment !== ""),
      )
      .subscribe(fragment => {
        const castHash = fragment?.match(/^(?!(host|link))(\w+)/)?.shift();
        const link = fragment
          ?.match(/link=(\w+)/)
          ?.slice(1)
          .shift();
        const host = fragment
          ?.match(/host=(\w+)/)
          ?.slice(1)
          .shift();
        if (host) {
          this.channel = host;
          this.host.url = `https://player.twitch.tv/?channel=${this.channel}`;
        }

        if (link) {
          this.cast.url = `https://www.youtube.com/embed/${link}?autoplay=1`;
          return;
        }

        const cast = CASTS.find(
          cast => cast.hash.slice(1) === castHash && !cast.disabled,
        );
        if (cast && this.cast.url === cast.url) {
          return;
        }
        if (cast && this.cast.url !== cast.url) {
          this.cast.url = cast.url;
          this.selectedCast = cast;
          return;
        }

        const defaultCast = CASTS.find(cast => !cast.disabled);
        if (!cast && defaultCast && this.cast.url !== defaultCast.url) {
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

    effect(() => {
      if (this.pipAboveChat()) {
        renderer.addClass(window.document.body, "above");
      } else {
        renderer.removeClass(window.document.body, "above");
      }
    });
    effect(() => {
      if (!this.showChat()) {
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
