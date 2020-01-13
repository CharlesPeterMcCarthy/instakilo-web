/*
   The following line is not a comment
   It is a reference to a types declaration package
   It is used to enable Google Places functionality
   Do not remove it
*/
/// <reference types="@types/googlemaps" />

import { Injectable } from '@angular/core';
import { GooglePlace } from '@instakilo/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GooglePlacesService {

  private placesSubject: BehaviorSubject<GooglePlace[]> = new BehaviorSubject<GooglePlace[]>(null);
  private autoCompleteService: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService();

  public getMatchingPlaces = (): Observable<google.maps.places.AutocompletePrediction[]> => this.placesSubject.asObservable();

  public autocompletePlacesMatching = (input: string): void =>
    this.autoCompleteService.getPlacePredictions({ input }, (places: GooglePlace[]) =>
      this.placesSubject.next(places)
    );

  public resetResults = (): void => this.placesSubject.next(null);

}
