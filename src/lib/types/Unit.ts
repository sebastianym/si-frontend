import { Image } from "./Image";
import { Meta } from "./Meta";
import { ResourceTypes } from "./ResourceType";
import { Schedule } from "./Schedule";

export interface UnitsMinimalResponse {
    data: UnitMinimal[];
    meta: Meta;
}

export interface Unit {
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    minimumLoanTime: number;
    is_active: boolean;
    schedule: Schedule[];
    image: Image;
    resource_types: ResourceTypes[];
    slug: string;
    id: number;
}

export interface UnitMinimal {
    id: number;
    attributes: {
        name: string;
        is_active: boolean;
        slug: string;
        image: {
            data: {
                attributes: {
                    url: string;
                    name: string;
                };
            };
        };
    };
    meta: Meta;
}
