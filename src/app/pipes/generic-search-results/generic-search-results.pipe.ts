import { Pipe, PipeTransform } from '@angular/core';
import { HashTagSearchResult, LocationSearchResult, UserSearchResult } from '@instakilo/common';

@Pipe({
  name: 'genericSearchResults'
})
export class GenericSearchResultsPipe implements PipeTransform {

  public transform(results: HashTagSearchResult[] | LocationSearchResult[] | UserSearchResult[], type: string): any {
    if (!results || !results.length) return null;

    if (type === 'hashtag') {
      const r = results as HashTagSearchResult[];
      return r.map((h: HashTagSearchResult) => ({ value: h._tag, id: h._tag, count: h.count }));
    }

    if (type === 'location') {
      const r = results as LocationSearchResult[];
      return r.map((l: LocationSearchResult) => ({ value: l.locationName, id: l._placeId, count: l.count }));
    }

    if (type === 'user') {
      const r = results as UserSearchResult[];
      return r.map((l: UserSearchResult) => ({ value: l.username, id: l.userId, count: l.count, avatar: l.avatar }));
    }

    return null;
  }

}
