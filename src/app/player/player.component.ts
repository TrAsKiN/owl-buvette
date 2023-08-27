import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Pip } from "../app.component";

export interface Player {
  id: Pip;
  isPip: boolean;
  url: string | null;
}

@Component({
  selector: "app-player",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "player.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  @Input() public source?: Player;
  @Input() public isActive = false;

  protected getSrc(url: string) {
    if (url.startsWith("https://player.twitch.tv/")) {
      url = `${url}&parent=${window.location.hostname}`;
    }
    if (url.startsWith("https://www.youtube.com/")) {
      url = `${url}&autoplay=1`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private _oldUrl?: string | null;

  constructor(
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
  ) {}

  ngDoCheck() {
    if (this.source?.id === "cast" && this._oldUrl !== this.source?.url) {
      this._oldUrl = this.source.url;
      this.cd.markForCheck();
    }
  }
}
