'use client'

import { CategoryList } from '@/components/categorylist'
import { Pinned } from '@/components/pinned'
import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {

  const [name, setName] = useState('')

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

    setName(tg.initDataUnsafe.user?.first_name || '');
    
    tg.ready();
    tg.expand();
  }, []);

  return (
    <>
      <div className='Page'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ margin: '0', fontSize: '22px' }}>Hello,</span>
            <h3 style={{ margin: '0', fontSize: '35px', fontWeight: '500', marginTop: '-10px' }}>{name}</h3>
          </div>
          <MenuIcon width={30} height={30} />
        </div>

        <CategoryList />
        <Pinned />

      </div>
    </>
  );
}
