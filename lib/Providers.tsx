'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default Providers;
