'use client';

import AsideMenu from "../Components/Aside/Aside";
import Header from "../Components/Header/Header";
import styles from "./album.module.scss";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';

export default function Album() {
    const pathname = usePathname();
    const router = useRouter();

    const handleNavigation = () => {
        if (pathname !== "/desired-path") {
            router.push("/desired-path");
        }
    };

    return (
        <>
            <div className={styles.main}>
                <AsideMenu />
                <div className={styles.albumdiv}>
                    <Header />
                    <button onClick={handleNavigation}>Go to Desired Path</button> {}
                    <Image 
                        src="/images/image-19long.png"
                        alt="Album Image"
                    />
                </div>
            </div>
        </>
    );
}

