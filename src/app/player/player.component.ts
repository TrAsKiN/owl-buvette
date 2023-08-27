import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { Player } from "../app.model";
import { CachedSrcDirective } from "../cached-src.directive";
import {
  selectPip,
  selectPipActive,
  selectPosition,
} from "../store/state.selectors";

@Component({
  selector: "app-player",
  standalone: true,
  imports: [CommonModule, CachedSrcDirective],
  templateUrl: "player.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  @Input() public player?: Player;
  @ViewChild("playerElement") public playerElement?: ElementRef<HTMLElement>;

  protected pipActive$ = this.store.select(selectPipActive);
  protected isPip = false;
  protected getSrc(url: string) {
    if (url.startsWith("https://player.twitch.tv/")) {
      url = `${url}&parent=${window.location.hostname}`;
    }
    if (url.startsWith("https://www.youtube.com/")) {
      url = `${url}&autoplay=1`;
    }
    return url;
  }

  private _cachedUrl?: string | null;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store,
  ) {
    this.store
      .select(selectPosition)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (this.isPip) {
          this.playerElement?.nativeElement.classList.add("animate");
        }
      });
  }

  ngOnInit() {
    this.store.select(selectPip).subscribe((pip) => {
      this.isPip = pip === this.player?.type;
      this.cd.markForCheck();
    });
  }

  ngDoCheck() {
    if (this.player?.type === "cast" && this._cachedUrl !== this.player.url) {
      this._cachedUrl = this.player.url;
      this.cd.markForCheck();
    }
  }

  onTransitionEnd() {
    this.playerElement?.nativeElement.classList.remove("animate");
  }
}
