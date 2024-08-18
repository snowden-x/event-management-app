"use client";
import LandingImage from "@/public/dddepth-150.jpg";
import LandingImage2 from "@/public/dddepth-171.jpg";
import LandingImage3 from "@/public/dddepth-202.jpg";
import LandingImage4 from "@/public/dddepth-236.jpg";
import LandingImage5 from "@/public/dddepth-312.jpg";
import LandingImage6 from "@/public/dddepth-242.jpg";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";

export const AutoplayCarousel = () => {
    const [api, setApi] = useState<CarouselApi | undefined>();
    const [current, setCurrent] = useState(0);
    const images = [LandingImage, LandingImage2, LandingImage3, LandingImage4, LandingImage5, LandingImage6];

    useEffect(() => {
        if (!api) {
            return;
        }

        // Set the current slide on change
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });

        // Infinite loop logic
        api.on("scroll", () => {
            if (api.selectedScrollSnap() === images.length - 1) {
                setTimeout(() => {
                    api.scrollTo(0);
                }, 2000); // Wait for the transition to complete before looping
            }
        });

        // Autoplay
        const timer = setInterval(() => {
            if (api) {
                api.scrollNext();
            }
        }, 2000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, [api]);

    return (
        <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="relative w-full h-full aspect-video">
                            <Image
                                alt={`carousel-image-${index + 1}`}
                                className="rounded-lg shadow object-cover"
                                src={image}
                                fill
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};
