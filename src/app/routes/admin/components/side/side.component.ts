import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthService} from '@services/auth';
import {Auth} from '@routes/auth/auth.model';
import { AdminService } from '@services/admin';
import { ListMenu } from '../menu';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideComponent implements OnInit, OnDestroy {
  isCollapsed: boolean;
  menus;
  private subUser: Subscription;
  user: Auth;

  constructor(
    private layoutService: AdminService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.layoutService.collapsed$.subscribe(v => this.isCollapsed = v);
    this.subUser = this.authService.user.subscribe(user => {
      if (user) {
        this.menus = JSON.parse(JSON.stringify(ListMenu)).map(item => {
          item.child = item.child.filter(subItem => subItem.level <= user.level);
          return item;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }

}
