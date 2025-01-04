import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx'

function Layout({children}) {
  return (
    <div>
      <Header/>
      <div style={{minHeight:"100vh !important"}}>
      {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
