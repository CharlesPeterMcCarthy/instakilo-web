import GooglePlace from './google-place';

export default interface Location {
  locationName: string;
  placeData: GooglePlace;
}
