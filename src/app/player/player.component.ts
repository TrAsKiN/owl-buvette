import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
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
export class PlayerComponent implements OnInit, OnChanges, DoCheck {
  @Input() public source?: Player;
  @Input() public isActive = false;

  private url?: string | null;

  protected getSrc(url: string) {
    if (url.startsWith("https://player.twitch.tv/")) {
      url = `${url}&parent=${window.location.hostname}`;
    }
    if (url.startsWith("https://www.youtube.com/")) {
      url = `${url}&autoplay=1`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  constructor(
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.url = this.source?.url;
  }

  ngDoCheck() {
    if (this.url !== this.source?.url) {
      this.cd.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["source"].currentValue?.url !== this.url) {
      this.url = changes["source"].currentValue.url;
    }
  }
}
