export interface Location {
    coords:    Coords;
    timestamp: number;
    mocked:    boolean;
}

export interface Coords {
    latitude:         number;
    longitude:        number;
    altitude:         number;
    accuracy:         number;
    altitudeAccuracy: number;
    heading:          number;
    speed:            number;
}
