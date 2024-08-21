import AboutProject from '../(components)/about-project';
import FAQSection from '../(components)/faq';
import Footer from '../(components)/footer';
import TeamSection from '../(components)/team-section';

export default function Page() {
    return (
        <div>
            <AboutProject />
            <TeamSection />
            <FAQSection />
            <Footer />
        </div>
    )
}
