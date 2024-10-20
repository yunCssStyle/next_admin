import ReactQueryProvider from '@/common/provider/ReactQueryProvider';
import { getQueryClient } from '@/common/provider/getQueryClient';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import ThemeProvider from '@/common/provider/ThemeProvider';
import type { Metadata } from 'next';
import AuthProviders from '@/common/provider/AuthProviders';
import Script from 'next/script';
import '@/common/theme/style.css';

export const metadata: Metadata = {
  title: 'Mine-warZ Admin',
  description: '마인워즈 관리자 페이지'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang={'ko'}>
      <body style={{ minWidth: 1360 }}>
        <div id="google_translate_element"></div>
        <ReactQueryProvider>
          <ThemeProvider>
            <AuthProviders>
              <Hydrate state={dehydratedState}>{children}</Hydrate>
            </AuthProviders>
          </ThemeProvider>
        </ReactQueryProvider>
        <Script id={'googleTranslate'}>{`
        function googleTranslateElementInit() {
            new google.translate.TranslateElement(
                {
                    pageLanguage: 'ko',
                    includedLanguages: 'en,ko',
                    autoDisplay: true,
                    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL // none or HORIZONTAL, SIMPLE
                },
                'google_translate_element'
            );
           
        }
        `}</Script>
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></Script>
      </body>
    </html>
  );
}
