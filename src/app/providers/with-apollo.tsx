"use client"
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { API_URL } from "~/shared/get-env";

const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`,
    credentials: 'same-origin',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
})



export const WithApollo = ({children}: React.PropsWithChildren)  => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);
