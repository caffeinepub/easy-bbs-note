import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContributorRequest } from "../backend.d";
import { ContributorStatus } from "../backend.d";
import { useActor } from "./useActor";

export function useApprovedContributors() {
  const { actor, isFetching } = useActor();
  return useQuery<ContributorRequest[]>({
    queryKey: ["contributors", "approved"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedContributors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllContributorRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<ContributorRequest[]>({
    queryKey: ["contributors", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContributorRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePendingContributorRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<ContributorRequest[]>({
    queryKey: ["contributors", "pending"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingContributorRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContributor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      subject: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContributorRequest(
        data.name,
        data.email,
        data.subject,
        data.description,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributors"] });
    },
  });
}

export function useUpdateContributorStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: bigint; status: ContributorStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateContributorStatus(data.id, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributors"] });
    },
  });
}

export function useSeedData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.seedData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributors"] });
    },
  });
}

export { ContributorStatus };
