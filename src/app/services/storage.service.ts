import { Injectable } from "@angular/core";
import { State } from "../app.model";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private data?: State;

  constructor() {
    const storedState = window.localStorage.getItem("state");
    if (storedState?.length) {
      this.data = JSON.parse(storedState);
    }
  }

  public restore() {
    return this.data;
  }

  public save(data: State) {
    this.data = data;
    window.localStorage.setItem("state", JSON.stringify(this.data));
  }
}
