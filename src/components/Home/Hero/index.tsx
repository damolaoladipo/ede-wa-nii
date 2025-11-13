"use client"

import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { heroData } from "@/_data/hero-data"
import { Button } from "@/components/ui/button" // import shadcn Button

const slides = [
  { id: 1, bg: "/images/hero/bg-1.png" },
  { id: 2, bg: "/images/hero/bg-4.png" },
]

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentSlide, setCurrentSlide] = useState(0)

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  useEffect(() => {
  if (!emblaApi) return
  const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap())
  emblaApi.on("select", onSelect)

  return () => {
    emblaApi.off("select", onSelect)
  } // TypeScript now understands it returns void
}, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      const nextIndex = (emblaApi.selectedScrollSnap() + 1) % slides.length
      emblaApi.scrollTo(nextIndex)
    }, 5000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide) => (
          <section
            key={slide.id}
            className="flex-[0_0_100%] relative bg-cover bg-center py-20 md:mt-40 md:pb-28"
            style={{ backgroundImage: `url(${slide.bg})` }}
          >
            <div className="container mx-auto lg:max-w-[1880px] px-16 grid grid-cols-12">
              <div className="bg-white rounded-md p-10 lg:col-span-5 md:col-span-7 sm:col-span-10 col-span-12 dark:bg-dark">
                {/* Heading */}
                <h3 className="text-midnight_text dark:text-white text-3xl md:text-4xl lg:text-7xl font-bold mb-6">
                  {heroData.heading}
                </h3>

                {/* Subheading */}
                <p className="text-muted dark:text-white/60 text-base mb-5">
                  {heroData.subheading}
                </p>

                {/* Buttons */}
                <div className="flex justify-start gap-3 mt-5">
                  <Button asChild variant={heroData.button1.variant}>
                    <a href={heroData.button1.href}>{heroData.button1.text}</a>
                  </Button>
                  <Button asChild variant={heroData.button2.variant}>
                    <a href={heroData.button2.href} className="flex items-center gap-2">
                      {heroData.button2.text}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-secondary" : "bg-white/40"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
