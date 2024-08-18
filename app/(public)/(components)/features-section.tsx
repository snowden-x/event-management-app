import { Badge } from "@/components/ui/badge";
import { Calendar, BadgePlus, TicketPlus, Check, CircleFadingPlus } from "lucide-react";


const features = [
    {
      icon: null,
      feature: "Create and manage organisations with unlimited members having different roles",
      heading: "Organisation Management",
    },
    {
      icon: null,
      feature: "Simply create, share and manage any private or public campus events",
      heading: "Event Management",
    },
    {
      icon: null,
      feature: "Manage all event tickets and attendees with a user friendly dashboard",
      heading: "Ticket Management",
    },
]

const FeatureCard = ({ icon, feature, heading }: { icon: JSX.Element, feature: string, heading:string }) => (
    <div className="w-full items-center text-card-foreground shadow-md rounded-lg p-6 pt-2 flex flex-col hover:shadow-lg transition-shadow duration-300 border">
      <div className="rounded-lg text-center flex items-center justify-center bg-primary/10 px-[150px] lg:px-[132px] py-20 mb-4">
        <div className="bg-white rounded-full p-2">
            {icon}
        </div>
      </div>
      <h3 className="font-medium text-md self-start">{heading}</h3>
      <p className="mt-2 text-sm font-light text-muted-foreground">{feature}</p>
    </div>
);
  
  const featureIcons = [

    <BadgePlus key="1" className="h-5 w-5 text-black" />,
    <Calendar key ="2" className="h-5 w-5 text-black" />,
    <TicketPlus key="3" className="h-5 w-5 text-black" />,    

  ];
  
  const FeaturesSection = () => (
    <section className="main_container py-16 bg-gradient-to-b from-background to-background-alt">
      <div className="sub_container">
        <Badge className="mb-7 shadow-md shadow-emerald-600 text-black bg-white text-sm font-medium">Features <span className="ml-2"><CircleFadingPlus className="h-4 w-4"></CircleFadingPlus></span></Badge>
        <h2 className="font-bold text-2xl mb-2 tracking-tighter font-roboto-mono italic">
          Here's what we offer
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl italic">
          Discover the powerful tools that make event management a breeze
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ feature, heading }, index) => (
            <FeatureCard key={index} icon={featureIcons[index]} feature={feature} heading={heading} />
          ))}
        </div>
      </div>
    </section>
  );
  
  export default FeaturesSection;