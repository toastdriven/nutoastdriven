import Image from 'next/image';

import '../globals.css';

import toastLogoMega from '../../../public/img/toast_logo_mega.png';

export const metadata = {
  title: {
    template: '%s | Toast Driven',
    default: 'Toast Driven',
  },
  description: 'Toast Driven is the online moniker of Daniel Lindsley.',
  keywords: [
    'Toast Driven',
    'Daniel Lindsley',
    'Django',
    'Python',
    'JavaScript',
    'PostgreSQL',
    'web development',
  ],
  colorScheme: 'light',
  creator: 'Daniel Lindsley',
  metadataBase: new URL('https://toastdriven.com'),
  openGraph: {
    images: '/img/toast_logo.png',
  },
  icons: {
    icon: '/img/toast_logo_small.png',
    apple: [
      { url: '/img/iphone_icon.png' },
    ],
  },
  verification: {
    google: '2fVCRlOwoBlSmCaBVUbn9yfesbOaCCPR7kKzqYaR2Ps=',
    yahoo: '62e6f95f81f0ed70',
    microsoft: '6DE0938BEF504F6D906CDEBBA18EB4F9',
    other: {
      me: ['daniel@toastdriven.com'],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body lang="en">
        <div className="mx-16 my-20 flex flex-row">
          <div className="mx-auto w-72 mt-4 grow-0 shrink-0">
            <Image
              src={toastLogoMega}
              alt="Toast Driven"
            />
          </div>

          <div className="ml-12 grow-0 shrink min-w-sm max-w-lg">
            <header>
              <h1 className="mb-6">
                <a href="/">Toast Driven</a>
              </h1>
            </header>

            <section id="content">
              {children}
            </section>

            <footer id="about">
              <p className="copyright">
                Established 2008 &mdash;
                Copyright {new Date().getFullYear()}
              </p>
            </footer>
          </div>

          <div className="grow shrink"></div>
        </div>
      </body>
    </html>
  );
}
