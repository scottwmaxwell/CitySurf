import Fuse from "fuse.js";
import citydata from "../assets/citydata.json";

// Define the structure of the GeoJSON data
interface GeoJSONFeature {
    type: string;
    properties: {
        name: string;
        icon?: string;
    };
    geometry: {
        type: string;
        coordinates: [number, number];
    };
}
interface GeoJSON {
    type: string;
    features: GeoJSONFeature[];
}

export class CitySearchService{

    citydataTyped = citydata as GeoJSON;
    
    fuseOptions = {
        isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "properties.name",
        ]
    };

    fuse = new Fuse(this.citydataTyped.features, this.fuseOptions);

    findCity = (searchPattern: string) => {
        return this.fuse.search(searchPattern).slice(0, 5);
    } 
}