import { Image } from "./Image";
import { Location } from "./Location";
import { Meta } from "./Meta";

export interface ResourcesResponse {
    data: Resource[];
    meta: Meta;
}

export interface Resource {
    id: number;
    identifier: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    is_active: boolean;
    slug: string;
    image: Image;
    location: Location;
}