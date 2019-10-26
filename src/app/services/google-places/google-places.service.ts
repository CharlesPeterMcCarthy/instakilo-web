/*
   The following line is not a comment
   It is a reference to a types declaration package
   It is used to enable Google Places functionality
   Do not remove it
*/
/// <reference types="@types/googlemaps" />

import { Injectable } from '@angular/core';
import GooglePlace from '../../interfaces/google-place';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GooglePlacesService {

  private placesSubject = new BehaviorSubject<GooglePlace[]>(null);
  private autoCompleteService = new google.maps.places.AutocompleteService();

  constructor() { }

  public getMatchingPlaces = () => this.placesSubject.asObservable();

  public autocompletePlacesMatching = (input: string): void =>
    this.autoCompleteService.getPlacePredictions({ input }, (places: GooglePlace[]) => this.placesSubject.next(places));

}
