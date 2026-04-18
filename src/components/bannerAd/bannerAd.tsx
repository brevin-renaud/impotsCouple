// components/AdSense.tsx
'use client'

import { useEffect } from 'react'

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