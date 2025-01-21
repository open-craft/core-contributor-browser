"use client"
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useAuthenticatedQuery } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type CCPageParamsType = {
    params: Promise<{
        org: string,
        repo: string,
    }>
}

export default function Page({params}: CCPageParamsType) {
    const [filter, setFilter] = React.useState<string>("");
    const {org, repo} = React.use(params);
    const data = useAuthenticatedQuery(
        [org, repo, 'contributor'],
        `https://api.github.com/repos/${org}/${repo}/collaborators?affiliation=all&permission=push`
    );

    return (
        <>
            <Input placeholder="Search" onChange={(e) => setFilter(e.target.value)}/>
            <Table>
                <TableHeader>
                    <TableColumn>Avatar</TableColumn>
                    <TableColumn>Access Level</TableColumn>
                    <TableColumn>Username</TableColumn>
                    <TableColumn>Links</TableColumn>
                </TableHeader>
                <TableBody>
                    {data?.map((item: GitHubUser) => item.login.includes(filter) && (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Avatar src={item.avatar_url} radius="sm"/>
                            </TableCell>
                            <TableCell>{item.role_name}</TableCell>
                            <TableCell><Link href={item.html_url}>{item.login}</Link></TableCell>
                            <TableCell>
                                <Link href={item.html_url}>Open user profile</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
