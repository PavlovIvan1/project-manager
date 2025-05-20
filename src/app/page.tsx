'use client'

import { CategoryList } from '@/components/categorylist'
import { Pinned } from '@/components/pinned'
import { MenuIcon } from 'lucide-react'
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
      {/* <div className='Page'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        </div>
        <Project name='ads' budget={100} />
        <Pinned />
        {/* <Daily /> */}
        {/* <StatToday /> */}
      {/* </div> */}

      <div className='Page'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ margin: '0', fontSize: '22px' }}>Hello,</span>
            <h3 style={{ margin: '0', fontSize: '35px', fontWeight: '500', marginTop: '-10px' }}>Ivan</h3>
          </div>
          <MenuIcon width={30} height={30} />
        </div>

        <CategoryList />
        <Pinned />

      </div>
    </>
  );
}
