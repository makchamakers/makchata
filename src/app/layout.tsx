import type { Metadata } from 'next';
import StyledComponentsRegistry from '../../lib/registry';
import './globals.css';

export const metadata: Metadata = {
  title: 'Makchata',
  description: 'Makchata by MakchaMakers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
