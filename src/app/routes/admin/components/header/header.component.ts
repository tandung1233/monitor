import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

import {AuthService} from '@services/auth';
import {Auth} from '@routes/auth/auth.model';
import {AdminService} from '@services/admin';
import {ListMenu} from '@routes/admin/components/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subUser: Subscription;
  private subCollapsed: Subscription;
  private subDrawer: Subscription;
  private subDesktop: Subscription;
  private subLink: Subscription;
  menus;

  cart = [];

  isCollapsed: boolean;
  isDrawer: boolean;
  isDesktop: boolean;
  link: string;
  loading = false;
  visibleProfile = false;
  user: Auth;
  links = {
    home: 'Dashboard',
    d: 'Detail Monitor',
    group: 'Group',
    user: 'User',
    permission: 'Permission',
  };
  title = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    public translate: TranslateService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.subUser = this.authService.user.subscribe(user => {
      this.user = user;
      if (user) {
        this.menus = JSON.parse(JSON.stringify(ListMenu)).map(item => {
          item.child = item.child.filter(subItem => subItem.level <= user.level);
          return item;
        });
      }
    });
    this.subCollapsed = this.adminService.collapsed$.subscribe(v => this.isCollapsed = v);
    this.subDrawer = this.adminService.drawer$.subscribe(v => this.isDrawer = v);
    this.subDesktop = this.adminService.desktop$.subscribe(v => this.isDesktop = v);
    this.subLink = this.adminService.link$.subscribe(v => {
      if (v) {
        this.link = v.toString();
        this.translate
          .get('titles.' + this.links[v])
          .subscribe((res) => {
            this.title = res;
            document.getElementById('header_title').innerHTML = res;
            document.title = res;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
    this.subCollapsed.unsubscribe();
    this.subDrawer.unsubscribe();
    this.subDesktop.unsubscribe();
    this.subLink.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.adminService.desktop$.next(event.currentTarget.innerWidth > 767);
  }

  toggle(): void{
    if (this.isDesktop) {
      this.adminService.collapsed$.next(!this.isCollapsed);
      this.adminService.drawer$.next(false);
    } else {
      this.adminService.drawer$.next(!this.isDrawer);
      this.adminService.collapsed$.next(false);
    }
  }

  loadData(visible: boolean): void {
    // if (visible) {
    //   this.loading = true;
    //   setTimeout(() => this.loading = false, 500);
    // }
  }

  openProfile(): void {
    this.visibleProfile = true;
    this.loadData(true);
  }

  changeLanguage(value: string): void {
    localStorage.setItem('ng-language', value);
    this.translate.setDefaultLang(value);
  }

  closeProfile(): void {
    this.visibleProfile = false;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
