import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {

  @Input() public title: string;
  @Input() public titleText: string;
  @Input() public bodyText: string;
  @Input() public btns: Array<{ text: string; message: string }>;

  constructor(
    private modalService: NgbModal
  ) { }

  public ngOnInit(): void { }

}
