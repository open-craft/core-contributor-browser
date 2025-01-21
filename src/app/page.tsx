"use client"
import { useAuthenticatedQuery } from "@/lib/utils";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import React from "react";


export default function Home() {
    const [filter, setFilter] = React.useState<string>("");
    const data = useAuthenticatedQuery(['repos-list'], "https://api.github.com/user/repos");

    return (
        <>
            <Input placeholder="Search" onChange={(e) => setFilter(e.target.value)}/>
            <Table hideHeader>
                <TableHeader>
                    <TableColumn>Avatar</TableColumn>
                    <TableColumn>Repository</TableColumn>
                    <TableColumn>Link to repo</TableColumn>
                    <TableColumn>Link to contributors</TableColumn>
                </TableHeader>
                <TableBody>
                    {data?.map((item: GitHubRepo) => item.full_name.includes(filter) && (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Link href={item.owner.html_url}>
                                    <Avatar src={item.owner.avatar_url} radius="none"/>
                                </Link>
                            </TableCell>
                            <TableCell>{item.full_name}</TableCell>
                            <TableCell>
                                <Link href={item.html_url}>
                                    Open
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={item.full_name}>
                                    Browse Contributors
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
