import { Modal } from '@redq/reuse-modal';
import '@redq/reuse-modal/es/index.css';
import 'common/assets/css/flaticon.css';
import '../containers/CryptoModern/CountDown/timer.css';
import 'common/assets/css/icon-example-page.css';
// swiper bundle styles
import 'swiper/css/bundle';
import 'common/assets/css/react-slick.css';
import 'common/assets/css/rc-collapse.css';
import 'rc-collapse/assets/index.css';
import 'common/assets/css/rc-drawer.css';
import Navbar from 'containers/WebApp/Navbar';
import { useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import { useRouter } from 'next/router';

export default function CustomApp({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  
  const [s,setS] = useState(0);

  useEffect(()=>{
    console.log(pathname);
    if(pathname !== '/'){
        setS(1);
        console.log('lililil')
    } else{
      setS(0);
    }
  },[pathname])


  return (
    <Modal>
       <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar open={open} setOpen={setOpen} s={s}/>
            </DrawerProvider>
          </Sticky>
      <Component {...pageProps} />
    </Modal>
  );
}
