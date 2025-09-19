// 'use client' component that transforms the existing shop list into a full-width marquee
'use client';

import { useEffect } from 'react';

export default function ShopMarqueeClient(){
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('#shop');
    if(!section) return;
    section.classList.add('shopMarquee'); // full width style
    // Remove any title bar
    const title = section.querySelector('[data-shop-title], h2, header');
    if(title) (title as HTMLElement).style.display = 'none';

    // Grab product cards (links or divs)
    const list = section.querySelector('[data-product-list]') || section.querySelector('div, ul, ol');
    if(!list) return;

    // Collect immediate product card nodes
    let cards: HTMLElement[] = [];
    (list as HTMLElement).childNodes.forEach((n: any) => {
      if(n?.nodeType === 1) {
        const el = n as HTMLElement;
        // skip hidden/title nodes
        if (el.tagName === 'H2' || el.getAttribute('data-shop-title') !== null) return;
        cards.push(el);
      }
    });
    if(cards.length === 0) return;

    // Create track and move clones into it for infinite effect
    const track = document.createElement('div');
    track.className = 'shopTrack';
    section.appendChild(track);

    const minimum = 6;
    const base = cards.slice();
    while(cards.length < minimum) cards = cards.concat(base);

    const renderOnce = (arr: HTMLElement[]) => {
      arr.forEach((src, idx) => {
        const clone = src.cloneNode(true) as HTMLElement;
        clone.classList.add('marqueeCard');
        // ensure card sizing
        clone.style.minWidth = '240px';
        clone.style.maxWidth = '260px';
        track.appendChild(clone);
      });
    };
    renderOnce(cards);
    renderOnce(cards); // duplicate for seamless loop

    // hide original list/container content
    (list as HTMLElement).style.display = 'none';
  }, []);
  return null;
}
