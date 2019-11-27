import { Component, OnInit, OnDestroy } from '@angular/core';
import {DocumentService} from '../../document.service';
import {Subscription} from 'rxjs';
import {Document} from '../../document';
import {startWith} from 'rxjs/operators';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  document: Document;
  constructor(private documentService: DocumentService) { }
  ngOnInit() {
   }
}
