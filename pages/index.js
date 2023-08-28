import Head from 'next/head'
import styles from '../modules/styles/Home.module.css'
import Navbar from '../components/navbar/left_bar'

export default function Home() {
  return (
    <div style={{background:"#181818"}}>
      <Head>
        <title>WorldWarII</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="content">
          <div className="row">
            <div className="col-3">
              <Navbar active={"aircraft"}/>
            </div>
            <div className="col-9">

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}