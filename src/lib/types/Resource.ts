import { Image } from "./Image";
import { Location } from "./Location";
import { Meta } from "./Meta";

export interface ResourcesResponse {
    data: Resource[];
    meta: Meta;
}

export interface Resource {
    attributes: any;
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
    resource_type: {
        id: number;
        name: string;
        description: string;
        identifier: string;
        createdAt: string;
        updatedAt: string;
        is_active: boolean;
        slug: string;
    };
}