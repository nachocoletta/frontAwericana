import '../styles/globals.css'
import { SessionProvider } from '@/context/SessionProvider'
import { MyPublicationsProvider } from '@/context/MyPublicationsProvider'

export default function App ({ Component, pageProps }) {
  return (
    <SessionProvider>
      <MyPublicationsProvider>
        <Component {...pageProps} />
      </MyPublicationsProvider>
    </SessionProvider>
  )
}
