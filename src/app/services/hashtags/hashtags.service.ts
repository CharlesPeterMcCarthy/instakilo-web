import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HashTagsService {

  constructor() { }

  public pluckHashTags = (text: string) => text.split(' ').filter(w => w.startsWith('#') && w.length > 1);

}
