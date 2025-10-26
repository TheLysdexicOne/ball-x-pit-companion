import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ball X Pit Companion',
  description: 'Companion site for Ball X Pit game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
