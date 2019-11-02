import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class HashTagsService {

  public pluckHashTags = (text: string): string[] =>
    _.uniq(text
      .split(/\s+/) // Split by whitespace (including new lines)
      .filter((w: string) => w.startsWith('#') && w.length > 1)
      .map((t: string) => this.removeHashSymbols(t))
      .map((t: string) => t.toLowerCase())
      .filter((t: string) => this.isValidHashTag(t))
    );

  public isValidHashTag = (tag: string): boolean => /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(tag); // Check tag is alphanumeric

  private removeHashSymbols = (tag: string): string => tag.replace('#', ''); // Remove # symbol

}
