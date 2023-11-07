import type { Metadata } from 'next';
import StyledComponentsRegistry from '../../lib/registry';
import Providers from '../../lib/Providers';
import './globals.css';

// TODO: 실제 도메인으로 변경해야함
export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
  title: 'Makchata',
  description: 'Makchata by MakchaMakers',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '막차타',
    description:
      '막차타는 막차를 타고 싶은 사람들을 위한 서비스입니다. 귀가길에 막차를 타려면 언제 일어나야 하는지 진동과 메시지로 알려드립니다. 어떻게? 직관적이게 따뜻하게 귀엽게 맞춤형으로!',
    type: 'website',
    locale: 'ko_KR',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    images: [
      {
        url: '/assets/images/img_thumbnail.png',
        width: 800,
        height: 600,
        alt: '막차타',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
