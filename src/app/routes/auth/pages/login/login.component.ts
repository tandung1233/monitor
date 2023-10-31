import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs/operators';

import {NzMessageService} from 'ng-zorro-antd/message';

import {FormModel} from '@components/form/form.model';
import {AuthService} from '@services/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent {
  isLoading: boolean;
  columns: FormModel[] = [
    {
      name: 'loginName',
      title: 'routes.auth.login.loginName',
      formItem: {
        rules: [
          {
            type: 'required',
          },
        ]
      }
    },
    {
      name: 'password',
      title: 'routes.auth.login.password',
      formItem: {
        type: 'password',
        rules: [
          {
            type: 'required',
          },
        ]
      }
    },
    {
      name: 'rememberMe',
      title: 'routes.auth.login.remember',
      formItem: {
        type: 'checkbox'
      }
    },
  ];

  isVisibleForgotPassword = false;
  phoneForgotPassword = '';

  constructor(
    private router: Router,
    public translate: TranslateService,
    private authService: AuthService,
    private message: NzMessageService,
  ) {}

  submitForm(validateForm): void {
    if (validateForm.status === 'VALID') {
      this.isLoading = true;
      this.authService
        .signIn(validateForm.value)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(res => this.router.navigate(['']));
    }
  }

  handleShowForgotPassword(): void {
    this.isVisibleForgotPassword = true;
  }
  handleCancelForgotPassword(): void {
    this.isVisibleForgotPassword = false;
    this.phoneForgotPassword = '';
  }
  handleForgotPasswordAction(): void {
    if (this.phoneForgotPassword !== '') {
      this.isLoading = true;
      this.authService
        .forgotPass(this.phoneForgotPassword)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(res => this.handleCancelForgotPassword());
    }
  }

}
