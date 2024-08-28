export interface Unit {
    id: number;
    attributes: {
        createdAt: string;
        updatedAt: string;
        name: string;
        description: string;
        minimumLoanTime: number;
        is_active: boolean;
        schedule: Array<{
            id: number;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
        }>;
        image: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    alternativeText: string | null;
                    caption: string | null;
                    width: number;
                    height: number;
                    formats: {
                        small: ImageFormat;
                        medium: ImageFormat;
                        thumbnail: ImageFormat;
                    };
                    hash: string;
                    ext: string;
                    mime: string;
                    size: number;
                    url: string;
                    previewUrl: string | null;
                    provider: string;
                    provider_metadata: any | null;
                    createdAt: string;
                    updatedAt: string;
                };
            };
        };
    };
}

interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}