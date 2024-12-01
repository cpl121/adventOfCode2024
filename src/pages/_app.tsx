import { DayProvider } from '@/context'
import '@/styles/globals.css'
import '@fontsource/twinkle-star'
import type { AppProps } from 'next/app'
import type { JSX } from 'react'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <DayProvider>
            <Component {...pageProps} />
        </DayProvider>
    )
}
