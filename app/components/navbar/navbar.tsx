"use client";

import Link from 'next/link';
import styles  from './style.module.css';
import Image from 'next/image';
// TODO svgr 사용해서 url 이랑 리액트 컴포넌트화 병행 가능하도록 변경하기
// import Logo from '../icons/logo.svg'; 
// import MobileLogo from '../icons/logo_m.svg'; 
import logoPic from '../../../public/assets/logo.png';
import m_logoPic from '../../../public/assets/logo_m.png'; 

function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={'g_wrapper'}>
                <div className={styles.inner}>
                    {/* 새로고침 때문에 next Link 사용하지 않음 */}
                    <a href={'/'} className={styles.logo}>
                        <Image width={71} height={40} src={m_logoPic} alt={'do it 로고 이미지 모바일'} className={`${styles.logo_src} ${styles.mobile}`}/>
                        <Image width={151} height={40} src={logoPic} alt={'do it 로고 이미지'} className={`${styles.logo_src} ${styles.pc}`}/>
                    </a>

                    {/* 영역이 추가될 수 있음 */}
                    <nav></nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar;