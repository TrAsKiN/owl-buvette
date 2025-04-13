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
import { StorageService } from "./services/storage.service";
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected DEFAULT_HOST = "fefegg";

  protected theme?: Theme = THEMES.find(
    theme =>
      theme.id ===
      (window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"),
  );

  protected channel = signal(this.DEFAULT_HOST);
  protected host = signal<Player>({ type: Pip.Host, url: undefined });
  protected cast = signal<Player>({ type: Pip.Cast, url: undefined });

  protected selectedCast = signal<Cast | undefined>(undefined);
  protected position = signal(
    this.storage.state?.position || { flipX: false, flipY: false },
  );
  protected showChat = signal(this.storage.state?.showChat || true);
  protected pip = signal(this.storage.state?.pip || Pip.Host);
  protected pipActive = signal(this.storage.state?.pipActive || true);
  protected pipAboveChat = signal(this.storage.state?.pipAboveChat || false);

  constructor(
    renderer: Renderer2,
    route: ActivatedRoute,
    private storage: StorageService,
  ) {
    this.host.update(host => ({
      ...host,
      url: `https://player.twitch.tv/?channel=${this.channel()}`,
    }));
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
          this.channel.set(host);
          this.host.update(host => ({
            ...host,
            url: `https://player.twitch.tv/?channel=${this.channel()}`,
          }));
        }

        if (link) {
          this.cast.update(cast => ({
            ...cast,
            url: `https://www.youtube.com/embed/${link}?autoplay=1`,
          }));
          return;
        }

        const cast = CASTS.find(
          cast => cast.hash.slice(1) === castHash && !cast.disabled,
        );
        if (cast && this.cast().url === cast.url) {
          return;
        }
        if (cast && this.cast().url !== cast.url) {
          this.cast.update(cast => ({
            ...cast,
            url: cast.url,
          }));
          this.selectedCast.set(cast);
          return;
        }

        const defaultCast = CASTS.find(cast => !cast.disabled);
        if (!cast && defaultCast && this.cast().url !== defaultCast.url) {
          this.cast.update(cast => ({
            ...cast,
            url: defaultCast.url,
          }));
          this.selectedCast.set(defaultCast);
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

    effect(() => {
      storage.save({
        position: this.position(),
        pip: this.pip(),
        pipActive: this.pipActive(),
        showChat: this.showChat(),
        pipAboveChat: this.pipAboveChat(),
      });
    });
  }

  protected isDark() {
    return this.theme?.id === "dark";
  }
}
