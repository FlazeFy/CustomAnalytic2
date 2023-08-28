import '../modules/styles/globals.css'
import '../modules/styles/navbar.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return <Component {...pageProps} />
}

export default MyApp