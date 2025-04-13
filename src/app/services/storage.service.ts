import { Injectable } from "@angular/core";
import { State } from "../app.model";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  public state?: State;

  constructor() {
    const storedState = window.localStorage.getItem("state");
    if (storedState?.length) {
      this.state = JSON.parse(storedState);
    }
  }

  public save(data: State) {
    this.state = data;
    window.localStorage.setItem("state", JSON.stringify(this.state));
  }
}
