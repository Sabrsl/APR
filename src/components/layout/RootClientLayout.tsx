'use client';

import { Header } from "./Header";
import { FooterWrapper } from "./FooterWrapper";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import { usePathname } from 'next/navigation';

interface RootClientLayoutProps {
  children: React.ReactNode;
}

export default function RootClientLayout({ children }: RootClientLayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        {!isAdminPage && <FooterWrapper />}
      </div>
    </ThemeProvider>
  );
} 