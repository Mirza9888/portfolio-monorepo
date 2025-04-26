'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContentView from "@/sections/content/views/content-view";

// Create a client
const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <ContentView />
        </QueryClientProvider>
    );
}