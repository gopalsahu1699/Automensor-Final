"use client";
import Script from 'next/script';

export default function WhatsAppFloat() {
  return (
    <Script
      id="aisensy-wa-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(d, t) {
            var g = d.createElement(t);
            var s = d.getElementsByTagName(t)[0];
            g.src = 'https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js';
            g.id = 'aisensy-wa-widget';
            g.setAttribute('widget-id', 'aaayes');  // Your new widget ID
            s.parentNode.insertBefore(g, s);
          }(document, 'script'));
        `
      }}
    />
  );
}
