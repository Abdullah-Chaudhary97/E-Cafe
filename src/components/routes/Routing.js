import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'
import Home from "../Home/index"
import Cart from "../CheckOut/Cart"
import Reservation from '../Reservation/Reservation';
import AboutUs from "../AboutUs/AboutUs"
import Product from '../Menu/Product';
import ProductDetail from '../Menu/ProductDetail';
import Colddrink from '../Menu/colddrink';
import Desserts from '../Menu/Desserts';
import Sandwich from '../Menu/sandwich';
import Coffee from '../Menu/coffee';
import Tea from '../Menu/Tea';
import Bakeryitams from '../Menu/bakeryitams';
import SignUp from "../login/signUp"
import LogIn from "../login/logIn"
import Footer from '../Footer/Footer'

// ScrollToTop component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly when route changes
    // Use both window.scrollTo and document.documentElement.scrollTop for maximum compatibility
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For older browsers
  }, [pathname]);

  return null;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={'/'} element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Home />
          </motion.div>
        } />
        <Route path={'/Reservation'} element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Reservation />
          </motion.div>
        }/>
        <Route path={'/Cart'} element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Cart />
          </motion.div>
        }/>
        <Route path={'/AboutUs'} element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AboutUs />
          </motion.div>
        }/>
        <Route path='/SignUp' element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SignUp />
          </motion.div>
        } />
        <Route path='/LogIn' element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <LogIn />
          </motion.div>
        } />
        <Route path='/Product/:id' element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ProductDetail />
          </motion.div>
        } />
        <Route path='/Product' element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Product />
          </motion.div>
        }>
          <Route index element={<Coffee />}/>
          <Route path='Coffee' element={<Coffee />} />
          <Route path='Tea' element={<Tea />} />
          <Route path='BakeryItams' element={<Bakeryitams />} />
          <Route path='ColdBeverages' element={<Colddrink />} />
          <Route path='Sandwich' element={<Sandwich />} />
          <Route path='Desserts' element={<Desserts />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function Routing() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <div>
          <Header/>
          <NavBar/>
          <AnimatedRoutes />
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}
