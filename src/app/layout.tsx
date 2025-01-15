"use client"
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <QueryClientProvider client={queryClient}>
            <html lang="en" className="dark">
            <body>
            <NextUIProvider>
                {children}
            </NextUIProvider>
            </body>
            </html>
        </QueryClientProvider>
    );
}
