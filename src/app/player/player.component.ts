import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
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
export class PlayerComponent implements OnChanges {
  @Input() public source?: Player;
  @Input() public isActive = false;

  private hasChanged = false;

  protected getSrc(url: string) {
    if (url.startsWith("https://player.twitch.tv/")) {
      url = `${url}&parent=${window.location.hostname}`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["source"].firstChange ||
      changes["source"].previousValue?.url !==
        changes["source"].currentValue?.url
    ) {
      this.hasChanged = true;
    }
  }

  ngDoCheck() {
    if (this.hasChanged) {
      this.cd.markForCheck();
      this.hasChanged = false;
    }
  }
}
