import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const getGithubToken = () => {
    return localStorage.getItem("github-token");
}

export const setGithubToken = (token: string) => {
    localStorage.setItem("github-token", token);
}


export const useAuthenticatedQuery = (queryKey: Array<string>, url: string) => {
    const token = getGithubToken();
    const {data, isError} = useQuery({
        queryKey,
        queryFn: async () => {
            const data = await fetch(url, {headers: {"Authorization": `Bearer ${token}`}});
            if (!data.ok) {
                throw new Error("Unauthorized");
            }
            return await data.json();
        },
        retry: false,
    });
    useEffect(() => {
        if (isError) {
            redirect("/login");
        }
    }, [isError]);
    return data;
}
