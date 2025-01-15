"use client"
import { setGithubToken } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader, } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
    const [token, setToken] = React.useState<string>("");
    const router = useRouter();
    const saveToken = () => {
        setGithubToken(token);
        router.push("/");
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card className="w-1/2">
                <CardHeader className="flex flex-col gap-3">
                    <h1 className="text-2xl">Login</h1>
                    <p className="text-small text-neutral-400">
                        Provide a GitHub token to log in. The token will be stored locally in your
                        browser only.
                        <br/>
                        You can generate a token <Link
                        href="https://github.com/settings/tokens">here</Link>.
                    </p>
                </CardHeader>
                <CardBody>
                    <Input label="Github Token" type="password"
                           onChange={(e) => setToken(e.target.value)}/>
                </CardBody>
                <CardFooter>
                    <Button onPress={saveToken}>Login</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
