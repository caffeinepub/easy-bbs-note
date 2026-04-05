import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContributorRequest {
    id: bigint;
    status: ContributorStatus;
    subject: string;
    name: string;
    createdAt: Time;
    description: string;
    email: string;
}
export type Time = bigint;
export enum ContributorStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    getAllContributorRequests(): Promise<Array<ContributorRequest>>;
    getApprovedContributors(): Promise<Array<ContributorRequest>>;
    getPendingContributorRequests(): Promise<Array<ContributorRequest>>;
    seedData(): Promise<void>;
    submitContributorRequest(name: string, email: string, subject: string, description: string): Promise<bigint>;
    updateContributorStatus(id: bigint, status: ContributorStatus): Promise<void>;
}
