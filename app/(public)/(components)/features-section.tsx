import { Badge } from "@/components/ui/badge"
import { CircleFadingPlus } from "lucide-react"
import Image from "next/image"
import Feature1 from "@/public/dddepth-171.jpg"
import Feature2 from "@/public/dddepth-150.jpg"
import Feature3 from "@/public/dddepth-236.jpg"

const features = [
  {
    image: Feature1,
    feature: "Create and manage organisations with unlimited members having different roles",
    heading: "Organisation Management",
  },
  {
    image: Feature2,
    feature: "Simply create, share and manage any private or public campus events",
    heading: "Event Management",
  },
  {
    image: Feature3,
    feature: "Manage all event tickets and attendees with a user friendly dashboard",
    heading: "Ticket Management",
  },
]

const FeatureCard = ({ image, feature, heading }: { image: any; feature: string; heading: string }) => (
  <div className="w-full items-center text-card-foreground shadow-md rounded-lg p-6 pt-2 flex flex-col hover:shadow-lg transition-shadow duration-300 border">
    <div className="rounded-lg text-center flex items-center justify-center bg-primary/10 mb-4 overflow-hidden">
      <Image src={image} alt={heading} width={300} height={240} objectFit="cover"/>
    </div>
    <h3 className="font-medium text-md self-start">{heading}</h3>
    <p className="mt-2 text-sm font-light text-muted-foreground">{feature}</p>
  </div>
)

const FeaturesSection = () => (
  <section className="main_container py-16 bg-gradient-to-b from-background to-background-alt">
    <div className="sub_container">
      <Badge className="mb-7 shadow-md shadow-emerald-600 text-black bg-white text-sm font-medium">
        Features <CircleFadingPlus className="inline-block ml-2 h-4 w-4" />
      </Badge>
      <h2 className="font-bold text-2xl mb-2 tracking-tighter font-roboto-mono italic">
        Here's what we offer
      </h2>
      <p className="text-muted-foreground mb-12 max-w-2xl italic">
        Discover the powerful tools that make event management a breeze
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ image, feature, heading }, index) => (
          <FeatureCard key={index} image={image} feature={feature} heading={heading} />
        ))}
      </div>
    </div>
  </section>
)

export default FeaturesSection