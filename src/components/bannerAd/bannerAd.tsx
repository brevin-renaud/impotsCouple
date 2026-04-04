// components/AdSense.tsx
'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function BannerAd() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('BannerAd error:', err)
    }
  }, [])

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6220317370024875"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6220317370024875"
        data-ad-slot="2964749921"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  )
}