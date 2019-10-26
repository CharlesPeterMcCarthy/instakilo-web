import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HashTagsService {

  constructor() { }

  public pluckHashTags = (text: string) => text
    .split(' ')
    .filter(w => w.startsWith('#') && w.length > 1)
    .map(t => this.removeHashSymbols(t))
    .filter(t => this.isValidHashTag(t));

  public isValidHashTag = (tag: string) => /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(tag); // Check tag is alphanumeric

  private removeHashSymbols = (tag: string) => tag.replace('#', ''); // Remove # symbol

}
