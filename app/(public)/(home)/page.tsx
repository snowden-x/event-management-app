
import { Button } from "@/components/ui/button";
import Footer from "../(components)/footer";
import Header from "../(components)/header";
import { ArrowRight, Box } from "lucide-react";
import Link from "next/link";
import { _dashboardEvents } from "@/lib/routes";
import { AutoplayCarousel } from "../(components)/landing-carousel";
import FeaturesSection from "../(components)/features-section";
import Faq from "@/app/(public)/(components)/faq";

const features = [
  {
    icon: null,
    feature: "Create and manage organisations with unlimited members having different roles",
  },
  {
    icon: null,
    feature: "Simply create, share and manage any private or public campus events",
  },
  {
    icon: null,
    feature: "Manage all event tickets and attendees with a user friendly dashboard",
  },
]



export const dynamic = 'force-dynamic';


export default async function Index() {

  return (
    <>
      <Header />
      <section className="border-b relative py-20 lg:py-5 bg-gradient-to-b from-background to-background-alt overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute top-0 left-0 w-64 h-64 text-accent-foreground/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M47.5,-51.2C59.9,-34.8,67.6,-17.4,67.8,0.2C68,17.8,60.6,35.6,48.1,49.9C35.6,64.2,17.8,75,1.3,73.7C-15.2,72.4,-30.4,59,-45.6,44.7C-60.8,30.4,-76,15.2,-77.8,-1.8C-79.6,-18.8,-68,-37.6,-52.7,-54C-37.4,-70.4,-18.7,-84.4,-0.6,-83.8C17.4,-83.2,34.8,-67.9,47.5,-51.2Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-96 h-96 text-accent-foreground/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M38.9,-47.8C49.8,-35.3,57.6,-21.8,61.4,-6.2C65.2,9.4,65,27.1,56.6,39.4C48.2,51.7,31.6,58.5,14.8,61.8C-2,65.1,-19,64.9,-34.9,58.5C-50.8,52.1,-65.5,39.5,-71.6,23.5C-77.7,7.5,-75.2,-11.9,-66.3,-27.2C-57.4,-42.5,-42.1,-53.7,-27,-59.9C-11.9,-66,-0.9,-67.1,8.1,-63.3C17,-59.6,28,-60,38.9,-47.8Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="sub_container flex flex-col items-center justify-start relative z-10">
          <h1 className="relative text-accent-foreground max-w-md text-4xl md:text-4xl leading-normal font-bold tracking-tight text-center">
            <span className="max-w-md text-4xl md:text-4xl leading-normal font-bold tracking-tight text-center transform rotate-[-10deg] bg-gradient-to-r from-gray-500 to-green-500 bg-clip-text text-transparent">Event</span> Ticketing & Management Made Easy
          </h1>
          <p className="max-w-prose text-sm font-normal text-muted-foreground mt-4 lg:mt-7 text-center">
            Effortlessly manage and participate in campus events with our intuitive and comprehensive platform, simplifying the process of organizing, promoting, and attending events all in one convenient place.
          </p>
          <Button size="xs" className="group mt-7 rounded-full py-5">
            <Link href={`${_dashboardEvents}?new=true`}>
              Start An Event Now
            </Link>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          {/* Carousel */}
          <div className="w-full max-w-2xl rounded-lg bg-secondary aspect-video mt-7 relative">
            <AutoplayCarousel />
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg className="w-full h-auto" viewBox="0 0 1440 320" fill="currentColor">
            <path d="M0,128L30,138.7C60,149,120,171,180,181.3C240,192,300,192,360,170.7C420,149,480,107,540,117.3C600,128,660,192,720,202.7C780,213,840,171,900,160C960,149,1020,171,1080,181.3C1140,192,1200,128,1260,122.7C1320,117,1380,171,1410,197.3L1440,224L1440,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      <section className="main_container py-10">
        <FeaturesSection />
      </section>
      <section className="main_container py-7 border border-t">
        <div className="sub_container">
          <div className="w-full mt-3 flex_center rounded-lg bg-primary/10">
            <Faq></Faq>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
