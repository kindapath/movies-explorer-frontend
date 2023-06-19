import { Outlet } from "react-router-dom"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";


const Layout = ({ isLoggedIn }) => {
  return (
    <section className='layout'>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </section>

  )
}

export default Layout;

