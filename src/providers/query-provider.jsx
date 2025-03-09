import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const QueryProvider = ({ children }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3,
      },
    },
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
