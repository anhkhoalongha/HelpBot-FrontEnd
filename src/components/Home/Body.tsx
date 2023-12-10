import Footer from "../footer/FooterAdmin"
import CallToAction from "./CallToAction/CallToAction"
import Header from "./Header/Header"
import Hero from "./Hero/Hero"
import Marketing from "./Marketing/Marketing"
import Pricing from "./Pricing/Pricing"
import Testimonial from "./Testimonial/Testimonial"

const Body = () => {
    return (
        <div>
            <Header />
            <Hero />

            <Marketing />

            <Testimonial />

            <Pricing />

            <CallToAction />

            <Footer />

        </div>
    )
};


export default Body;