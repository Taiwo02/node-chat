import { Component, OnInit, OnDestroy } from '@angular/core';
import {DocumentService} from '../../document.service';
import {Subscription} from 'rxjs';
import {Document} from '../../document';
import {startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Navigation } from 'selenium-webdriver';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  document: Document;
  constructor(private documentService: DocumentService, private router:Router) { }
  ngOnInit() {
      // this.router.navigate(["/document/posts"])
   }
}
