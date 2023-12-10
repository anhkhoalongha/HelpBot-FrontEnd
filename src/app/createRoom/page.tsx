import '../../styles/auth/style.css';

import { ClerkProvider } from '@clerk/nextjs';

import CreateRoom from '@/components/createRoom/createRoom';
import Footer from '@/components/Home/Footer/Footer';
import Header from '@/components/Home/Header/Header';
import Navbar from '@/components/Home/NavBar/Navbar';

const Index = () => {
  return (
    <ClerkProvider>
      <div>
        <Header />
        <Navbar />
        <CreateRoom />
        <Footer />
      </div>
    </ClerkProvider>
  );
};

export default Index;
