import '../design_tokens/globals.css'
import '../design_tokens/dropdown.css'
import '../design_tokens/typography.css'
import '../design_tokens/navbar.css'
import '../design_tokens/modal.css'
import '../design_tokens/form.css'
import '../design_tokens/button.css'
import '../design_tokens/image.css'
import '../design_tokens/table.css'

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