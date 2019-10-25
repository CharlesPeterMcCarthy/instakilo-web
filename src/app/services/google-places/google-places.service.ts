/*
   The following line is not a comment
   It is a reference to a types declaration package
   It is used to enable Google Places functionality
   Do not remove it
*/
/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GooglePlacesService {

  constructor() { }

  public autocompletePlacesMatching = (input) => {
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: [ 'establishment' ]
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place);
    });
  }

}
