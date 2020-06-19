import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  token: string;
  loadingVerify = false;
  isError: any;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {

    // ======= GET PARAMS {TOKEN} ========

    activatedRoute.queryParams
      .subscribe(params => {
        this.token = params.token;
        this.verifyAccount(this.token);
      });

  }

  ngOnInit(): void {
  }

  verifyAccount(token) {
    this.loadingVerify = true;
    this.authService.verifyAccount(token)
      .subscribe(data => {
        this.loadingVerify = false;
      }, error => {
        this.isError = error.errors;
        this.loadingVerify = false;
      });
  }

}
