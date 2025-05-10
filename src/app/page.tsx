'use client'

import { Pinned } from '@/components/pinned'
import { StatToday } from '@/components/todays'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      console.error('Telegram WebApp NOT DETECTED');
      return;
    }
  
    console.log('WebApp environment:', {
      initData: tg.initData,
      initDataUnsafe: tg.initDataUnsafe,
    });
  
    tg.ready();
    tg.expand();
  }, []);

  return (
    <>
      <div className='Page'>
        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <UserCircleIcon width={30} height={30} />
          </div>
          <Settings />
        </div> */}
        <Pinned />
        {/* <Daily /> */}

        <StatToday />
      </div>
    </>
  );
}
