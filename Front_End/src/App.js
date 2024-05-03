import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Components/default';
import { Box } from '@mui/material'
//components
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import ProductFilterPage from './Components/ItemDetails/ProductFilterPage';
import ProfileSection from './Components/Login/ProfileSection';
import { Typography, Container } from '@mui/material';
import Footer from './Components/Header/Footer';
import SellerPage from './Components/Seller/SellerPage';
import Checkout from './Components/Checkout/Checkout';
function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Routes>
              <Route path= '/' element={<Home />} />
              <Route path= '/cart' element={<Cart />} />
              <Route path= '/become-seller' element={<SellerPage />} />
              <Route path= '/productfilter' element={<ProductFilterPage />} />
              <Route path= '/profilesection' element={<ProfileSection />} />
              <Route path= '/product/:id' element={<DetailView />} />
              <Route path= '/checkout' element={<Checkout />} />
            </Routes>
          </Box>
          <Footer />
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
