import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  viewChild,
} from "@angular/core";
import { Pip, Player, Position } from "../../app.model";
import { CachedSrcDirective } from "../../directives/cached-src.directive";

@Component({
  selector: "app-player",
  imports: [CommonModule, CachedSrcDirective],
  templateUrl: "player.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  public player = input.required<Player>();
  public playerElement = viewChild<ElementRef<HTMLElement>>("playerElement");
  public pipActive = input(true);
  public pip = input(Pip.Host);
  public position = input<Position>();

  protected isPip = computed(() => this.pip() === this.player().type);
  protected getSrc(url?: string) {
    if (url?.startsWith("https://player.twitch.tv/")) {
      url = `${url}&parent=${window.location.hostname}`;
    }
    if (url?.startsWith("https://www.youtube.com/")) {
      url = `${url}&autoplay=1`;
    }
    return url;
  }

  private cachedUrl?: string;

  constructor() {
    effect(() => {
      if (this.position()) {
        this.playerElement()?.nativeElement.classList.add("animate");
      }
    });
    effect(() => {
      if (this.cachedUrl !== this.player().url) {
        this.cachedUrl = this.player().url;
      }
    });
  }

  onTransitionEnd() {
    this.playerElement()?.nativeElement.classList.remove("animate");
  }
}
