import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showNotifications = false;
  showLogin = false;

  ngOnInit(): void {}

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.showLogin = false;
    }
  }

  toggleLogin(event: Event) {
    event.stopPropagation();
    this.showLogin = !this.showLogin;
    if (this.showLogin) {
      this.showNotifications = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.showNotifications = false;
    this.showLogin = false;
  }

  @HostListener('click', ['$event'])
  onComponentClick(event: Event) {
    event.stopPropagation();
  }
}
