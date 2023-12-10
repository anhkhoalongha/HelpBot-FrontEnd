import { ClerkProvider } from '@clerk/nextjs';

import Navbar from '@/components//Home/NavBar/Navbar';
import CallToAction from '@/components/Home/CallToAction/CallToAction';
import Footer from '@/components/Home/Footer/Footer';
import Header from '@/components/Home/Header/Header';
import Hero from '@/components/Home/Hero/Hero';
import Marketing from '@/components/Home/Marketing/Marketing';
import Pricing from '@/components/Home/Pricing/Pricing';
import Testimonial from '@/components/Home/Testimonial/Testimonial';

const Index = () => {
  return (
    <ClerkProvider>
      <div>
        <Navbar />
        <div>
          <Header />
          <Hero />
          <Marketing />
          <Testimonial />
          <Pricing />
          <CallToAction />
          <Footer />
        </div>
      </div>
    </ClerkProvider>
  );
};

export default Index;
