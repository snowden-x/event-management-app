import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, UserIcon, TicketIcon, UsersIcon, BuildingIcon, SearchIcon, Calendar, Users, Zap } from "lucide-react"
import Team from "./team-section"
import Header from "./header"
import FeaturesSection from "./features-section"
import FAQSection from "./faq"
import Footer from "./footer"
import ConnectImg from "@/public/about.jpg";
import Image from "next/image"
import { _dashboardEvents } from "@/lib/routes";
import Link from "next/link";
export default function About() {
  return (
    <>
      <Header></Header>
      <div className="flex flex-col min-h-screen bg-muted border-b dark:border-b-white">
        <main className="flex-1 bg-muted">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">

                <Image
                  alt="Event management app screenshot"
                  className="mx-auto overflow-hidden border rounded-xl object-cover sm:w-full lg:order-last"
                  height="700"
                  src={ConnectImg}
                  width="550"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold mb-11 tracking-tighter lg:text-3xl">
                      Simplify Your Event Management
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Our event management app streamlines the entire process, from initial concept to final execution.
                      Say goodbye to stress and hello to seamless event management.
                    </p>
                  </div>
                  <ul className="grid gap-2 mt-5 py-4">
                    <li className="flex items-center gap-2">
                      <Calendar className="h-5 font-thin w-5" />
                      <span className="font-normal">Creation, scheduling and management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span className="font-normal">Collaborative tools for team coordination</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      <span className="font-normal">Real-time updates and notifications</span>
                    </li>
                  </ul>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg">
                      <Link href={_dashboardEvents}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>

  )
}
