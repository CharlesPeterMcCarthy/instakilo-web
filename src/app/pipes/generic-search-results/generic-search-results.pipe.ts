import { Pipe, PipeTransform } from '@angular/core';
import { HashTagSearchResult, LocationSearchResult } from '@instakilo/common';

@Pipe({
  name: 'genericSearchResults'
})
export class GenericSearchResultsPipe implements PipeTransform {

  public transform(results: HashTagSearchResult[] | LocationSearchResult[], type: string): any {
    if (!results || !results.length) return null;

    if (type === 'hashtag') {
      const r = results as HashTagSearchResult[];
      return r.map((h: HashTagSearchResult) => ({ value: h._tag, id: h._tag, count: h.count }));
    }

    if (type === 'location') {
      const r = results as LocationSearchResult[];
      return r.map((l: LocationSearchResult) => ({ value: l.locationName, id: l._placeId, count: l.count }));
    }

    return null;
  }

}
