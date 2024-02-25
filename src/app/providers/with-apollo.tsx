"use client";

import { API_URL } from "~/shared/get-env";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

// have a function to create a client for you
function makeClient() {
    const httpLink = new HttpLink({
        uri: `${API_URL}/graphql`,
        credentials: 'same-origin',
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        fetchOptions: { cache: "no-store" },
        // you can override the default `fetchOptions` on a per query basis
        // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
    });

    return new NextSSRApolloClient({
        // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    // in a SSR environment, if you use multipart features like
                    // @defer, you need to decide how to handle these.
                    // This strips all interfaces with a `@defer` directive from your queries.
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    httpLink,
                ])
                : httpLink,
    });
}

// create a component to wrap in app 
export function withApollo({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}