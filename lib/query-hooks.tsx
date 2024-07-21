"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthProfile, getProfile, getUserOrganisations, modifyProfile, setOrganisation } from "./queries";
import { dashboardKeys, publicKeys } from "./query-keys";

export function useGetAuthProfile() {
    const queryKey = dashboardKeys.authProfile;
    const queryFn = async () => await getAuthProfile();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
}

export function useGetProfile() {
    const queryKey = dashboardKeys.profile;
    const queryFn = async () => await getProfile();

    return useQuery({queryFn, queryKey, refetchOnWindowFocus: false});
}

export const useModifyProfile = () => {
    const queryClient = useQueryClient();

    const queryKey = dashboardKeys.profile;
    return useMutation({
      mutationFn: modifyProfile,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKey })
    })
}

export function useGetUserOrganisations() {
    const queryKey = dashboardKeys.orgs();
    const queryFn = async() => await getUserOrganisations();
    
    return useQuery({queryKey, queryFn, refetchOnWindowFocus: false});
}

export const useSetOrganisation = () => {
    const queryClient = useQueryClient();

    const queryKey = dashboardKeys.orgs();
    return useMutation({
      mutationFn: setOrganisation,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKey })
    })
}