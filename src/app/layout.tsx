import type { Metadata } from 'next';
import './globals.css';
import Background from '@/components/Background';
import { getImagePath } from '@/utils/basePath';

export const metadata: Metadata = {
  title: 'Ball X Pit Companion',
  description: 'Companion site for Ball X Pit game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontPath = getImagePath('/fonts/TimesNewPixel.ttf');

  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'TimesNewPixel';
                src: url('${fontPath}') format('truetype');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
              }
            `,
          }}
        />
      </head>
      <body>
        <Background>{children}</Background>
      </body>
    </html>
  );
}
