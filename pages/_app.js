import '../modules/styles/globals.css'
import '../modules/styles/dropdown.css'
import '../modules/styles/typography.css'
import '../modules/styles/navbar.css'
import '../modules/styles/modal.css'
import '../modules/styles/form.css'

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return <>
    <Component {...pageProps}/>
    <ToastContainer />
  </>
}

export default MyApp