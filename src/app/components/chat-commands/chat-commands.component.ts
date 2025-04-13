import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, model } from "@angular/core";

@Component({
  selector: "app-chat-commands",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "chat-commands.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatCommandsComponent {
  public pipActive = model<boolean>();
  public pipAboveChat = model<boolean>();
  public showChat = model<boolean>();

  onChangePipActive() {
    const pipActive = !this.pipActive();
    this.pipActive.set(pipActive);
    if (!pipActive) {
      this.pipAboveChat.set(false);
    }
  }

  onChangeAboveChat() {
    const pipAboveChat = !this.pipAboveChat();
    this.pipAboveChat.set(pipAboveChat);
    if (pipAboveChat) {
      this.pipActive.set(true);
    }
  }

  onChangeShowChat() {
    const showChat = !this.showChat();
    this.showChat.set(showChat);
    if (!showChat) {
      this.pipAboveChat.set(false);
    }
  }
}
