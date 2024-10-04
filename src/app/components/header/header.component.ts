import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showNotifications = false;

  ngOnInit(): void {}

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.showNotifications = false;
  }

  @HostListener('click', ['$event'])
  onComponentClick(event: Event) {
    event.stopPropagation();
  }
}
