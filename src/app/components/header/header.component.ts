import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showNotifications = false;
  sections: { id: string, offset: number }[] = [];

  ngOnInit(): void {
    this.sections = [
      { id: 'dashboard', offset: this.getOffsetTop('dashboard') },
      { id: 'financialSummary', offset: this.getOffsetTop('financialSummary') },
      { id: 'transactionForm', offset: this.getOffsetTop('transactionForm') },
      { id: 'budget', offset: this.getOffsetTop('budget') },
      { id: 'transactionsHistory', offset: this.getOffsetTop('transactionsHistory') }
    ];
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    for (let section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activateMenuItem(section.id);
        }
      }
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activateMenuItem(sectionId);
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  private getOffsetTop(sectionId: string): number {
    const element = document.getElementById(sectionId);
    return element ? element.offsetTop : 0;
  }

  private activateMenuItem(sectionId: string) {
    document.querySelectorAll('.menu-item').forEach(item => {
      item.classList.remove('active');
    });
    const activeItem = document.querySelector(`.menu-item[appActiveLink="${sectionId}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }
}
