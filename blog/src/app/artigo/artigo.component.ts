import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http,Response, RequestOptions, Headers } from '@angular/http';
import { Artigo } from '../home/home.component';
import * as jQuery from 'jquery';
import 'rxjs/add/operator/map';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.css']
})
export class ArtigoComponent implements OnInit {
  public html: any = "";
  artigo = new Artigo();
  constructor(private activatedRoute: ActivatedRoute, http: Http,
    private zone: NgZone, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
