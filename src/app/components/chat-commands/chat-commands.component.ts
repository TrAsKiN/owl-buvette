import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import {
  setPipAboveChat,
  setPipActive,
  setShowChat,
} from "../../store/state.actions";
import {
  selectPipAboveChat,
  selectPipActive,
  selectShowChat,
} from "../../store/state.selectors";

@Component({
  selector: "app-chat-commands",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "chat-commands.component.html",
})
export class ChatCommandsComponent {
  protected pipActive?: boolean;
  protected pipAboveChat?: boolean;
  protected showChat?: boolean;

  constructor(private store: Store) {
    this.store
      .select(selectPipActive)
      .pipe(takeUntilDestroyed())
      .subscribe((pipActive) => {
        this.pipActive = pipActive;
      });
    this.store
      .select(selectPipAboveChat)
      .pipe(takeUntilDestroyed())
      .subscribe((pipAboveChat) => {
        this.pipAboveChat = pipAboveChat;
      });
    this.store
      .select(selectShowChat)
      .pipe(takeUntilDestroyed())
      .subscribe((showChat) => {
        this.showChat = showChat;
      });
  }

  onChangePipActive() {
    const pipActive = !this.pipActive;
    this.store.dispatch(setPipActive({ pipActive }));
    if (!pipActive) {
      this.store.dispatch(
        setPipAboveChat({
          pipAboveChat: false,
        }),
      );
    }
  }
  onChangeAboveChat() {
    const pipAboveChat = !this.pipAboveChat;
    this.store.dispatch(
      setPipAboveChat({
        pipAboveChat,
      }),
    );
    if (pipAboveChat) {
      this.store.dispatch(setPipActive({ pipActive: true }));
    }
  }
  onChangeShowChat() {
    const showChat = !this.showChat;
    this.store.dispatch(setShowChat({ showChat }));
    if (!showChat) {
      this.store.dispatch(
        setPipAboveChat({
          pipAboveChat: false,
        }),
      );
    }
  }
}
