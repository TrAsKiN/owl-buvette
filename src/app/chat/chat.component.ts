import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="chat" [class.d-none]="!show">
      <iframe [src]="url"></iframe>
    </div>
  `,
})
export class ChatComponent {
  @Input() show: boolean = true;
  @Input() isDark: boolean = true;
  @Input() channel?: string;

  protected url?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.twitch.tv/embed/${this.channel}/chat${
        this.isDark ? "?darkpopout&" : "?"
      }parent=${window.location.hostname}`
    );
  }
}
