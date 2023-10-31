import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import { AuthService } from '@services/auth';
import {columns} from '@columns/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit{
  isLoading = false;

  columns = columns(this);

  constructor(
    private router: Router,
    public translate: TranslateService,
    private authService: AuthService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {

  }

  submitForm(validateForm): void {
    if (validateForm.status === 'VALID') {
      this.isLoading = true;
      this.authService
        .signUp(validateForm.value)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          res => {
            this.router.navigate(['/auth']);
          }
        );
    }
  }
}
