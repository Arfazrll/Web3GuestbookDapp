import './globals.css';

export const metadata = {
    title: 'Web3 Guestbook',
    description: 'A decentralized guestbook app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
