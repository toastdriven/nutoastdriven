import './resume.css';

export const metadata = {
  title: "Why, hello! I'm Daniel Lindsley.",
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

export default function Layout(props) {
  return (
    <html>
      <body>
        {props.children}
      </body>
    </html>
  );
}
