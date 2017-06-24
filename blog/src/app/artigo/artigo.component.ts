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
  constructor(private activatedRoute: ActivatedRoute, private http: Http,
    private zone: NgZone, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get('/api/artigo/' +id)
        .subscribe(artigo => {
          this.zone.run(() =>{
            this.resultadoArtigo(artigo);
          });
      });
    });
  }

  resultadoArtigo(artigo){
    console.log(artigo);
    this.artigo = JSON.parse(artigo._body);
    this.html.get("assets/artigos"+ this.artigo.id + ".html")
    .subscribe(file => {
      this.zone.run(() => {
        this.resultadoHtmlArtigo(file);
        jQuery.getScript('assets/artigo' + this.artigo.id + '.js');
      });
    });
  }

  resultadoHtmlArtigo(file){
    this.html = this.sanitizer.bypassSecurityTrustHtml(file._body);
  }

}
