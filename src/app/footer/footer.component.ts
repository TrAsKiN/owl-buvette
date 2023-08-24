import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Octokit } from "@octokit/rest";
import { Popover } from "bootstrap";
import { from } from "rxjs";
import semver from "semver";
import Package from "../../../package.json";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "footer.component.html",
})
export class FooterComponent implements AfterViewInit {
  protected upToDate = true;
  protected version = Package.version;

  @ViewChild("drops") drops?: ElementRef<HTMLElement>;

  constructor() {
    from(
      new Octokit().repos.getLatestRelease({
        owner: "TrAsKiN",
        repo: "owl-buvette",
      })
    ).subscribe(({ data }) => {
      const remoteVersion = semver.clean(data.tag_name);
      if (remoteVersion && semver.compare(this.version, remoteVersion) < 0) {
        console.warn(`Your app version is not up-to-date!`);
        this.upToDate = false;
      }
    });
  }

  ngAfterViewInit() {
    if (this.drops?.nativeElement) {
      new Popover(this.drops.nativeElement, { html: true });
    }
  }
}
