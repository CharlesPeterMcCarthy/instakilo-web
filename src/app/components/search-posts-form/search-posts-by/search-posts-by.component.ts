import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSearch, faArrowRight, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconCollection } from '../../../interfaces/icon-collection';

@Component({
  selector: 'search-posts-by',
  templateUrl: './search-posts-by.component.html',
  styleUrls: ['./search-posts-by.component.less']
})
export class SearchPostsByComponent implements OnInit {

  @Input() public searchBy: string;
  @Input() public searchByIcon: IconDefinition;
  @Input() public searchHelpText: string;
  @Input() public searchTerm: string;
  @Input() public isSearching: boolean = false;
  @Input() public linkStart: string;
  @Input() public matchResults: Array<{ value: string; id: string; count: number }>;
  @Input() public noResults: boolean = false;
  @Output() public keyPressedEE: EventEmitter<string> = new EventEmitter();

  public icons: IconCollection = {
    search: faSearch,
    rightArrow: faArrowRight,
    remove: faTimes
  };

  constructor() { }

  public ngOnInit(): void { }

  public keyPressed = (e: KeyboardEvent): void => {
    const target = e.target as HTMLInputElement;
    this.keyPressedEE.emit(target.value);
  }

  public resetField = (field: HTMLInputElement): void => {
    field.value = '';
    this.keyPressedEE.emit('');
  }

  public focusField = (field: HTMLInputElement): void => {
    field.focus();
  }

}
