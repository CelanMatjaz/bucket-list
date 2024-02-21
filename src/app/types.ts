export interface File {
    name: string;
    lastModified: number;
    size: number;
}

export interface Bucket {
    id: string;
    name: string;
    location: string;
    files: File[]
}

export type NewBucket = Omit<Bucket, "id">

export interface Location {
    id?: string;
    label: string;
    value: string;
}