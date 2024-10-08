"use client";
import LandingImage from "@/public/landing1.jpg";
import LandingImage2 from "@/public/landing2.jpg";
import LandingImage3 from "@/public/landing3.jpg";
import LandingImage4 from "@/public/landing4.jpg";

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
    const images = [LandingImage4, LandingImage2, LandingImage3, LandingImage];

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
                                className={`rounded-lg shadow object-cover object-left-top ${image === LandingImage3 ? 'object-right-bottom' : ''}`}
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
