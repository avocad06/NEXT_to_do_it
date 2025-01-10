import Link from 'next/link';
import styles  from './style.module.css';
import Image from 'next/image';
import logoPic from '../../../public/assets/logo.svg'
import m_logoPic from '../../../public/assets/logo_m.svg'

function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={'g_wrapper'}>
                <div className={styles.inner}>
                    {/* 새로고침 때문에 next Link 사용하지 않음 */}
                    <a href={'/'} className={styles.logo}>
                        <Image src={m_logoPic} alt={'do it 로고 이미지 모바일'} className={`${styles.logo_src} ${true ? styles.mobile : styles.pc}`}/>
                        <Image src={logoPic} alt={'do it 로고 이미지'} className={`${styles.logo_src} ${false ? styles.mobile : styles.pc}`}/>
                    </a>

                    {/* 영역이 추가될 수 있음 */}
                    <nav></nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar;