import Banner from "@/components/ui/banner/Banner";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";

import HeroImage from "../assets/images/Breakpoint=Desktop.png"
import HeroImageMobile from "../assets/images/Category=Hair Care, Breakpoint=_ 810 px.png"


import { PageSection } from "@/components/page-section/PageSection";
import { ProductCard, ProductCardProps } from "@/components/ui/card/ProductCard";
import KettleImage from "@/assets/images/Product Card/Frame 112-12.png"
import BlanderImage from "@/assets/images/Product Card/Frame 112-1.png"
import CountertopBlanderImage from "@/assets/images/Product Card/Frame 112.png"

import PowerBoardImage from "@/assets/images/Product Card/Frame 112-14.png"
import MagneticChargerStationImage from "@/assets/images/Product Card/Frame 112-15.png"

export default function Home() {

  const navigation = [
    { label: "Kitchen", href: "#kitchen" },
    { label: "Home Security", href: "#home-security" },
    { label: "Hair Care", href: "#hair-care" },
    { label: "Accessories", href: "#accessories" },
  ];

  const footerColumns = [
    {
      title: "Our Products",
      grid: true,
      links: [
        { label: "Kitchen", href: "#kitchen" },
        { label: "Hair Care", href: "#hair-care" },
        { label: "Home Security", href: "#home-security" },
        { label: "Accessories", href: "#accessories" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Where to buy", href: "/where-to-buy" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ];

  const kitchenProducts: ProductCardProps[] = [
    {
      title: "Octopus Kettle 1.7 L",
      description:
        "A 1.7 L kettle that boils fast on 1800W, with a body that stays cool to the touch",
      image: HeroImage,
      imageAlt: "Pouring hot water from the Octopus Kettle into a cup",
      href: "/products/kettle",
      layout: "overlay",
    },
    {
      title: "Octopus Blender",
      description: "A portable blender that blends straight into a cup you can take with you",
      image: BlanderImage,
      imageAlt: "Octopus portable blender",
      href: "/products/blender",
      layout: "stacked-center",
    },
    {
      title: "Octopus Countertop Blender",
      description: "A powerful blender that crushes ice and blends smooth with seven presets",
      image: CountertopBlanderImage,
      imageAlt: "Octopus countertop blender",
      href: "/products/countertop-blender",
      layout: "stacked-center",
    },
  ];

  const accessoriesProducts: ProductCardProps[] = [
    {
      title: "Octopus Power Bank 10,000 mAh",
      description: "A slim power bank with the USB-C cable already built in",
      image: KettleImage,
      imageAlt: "The Magnetic Charging Station",
      href: "/products/magnetic-station",
      layout: "stacked",
    },

    {
      title: "Octopus Power Board with USB Charging",
      description: "A compact power board with four sockets and four USB ports",
      image: PowerBoardImage,
      imageAlt: "The USB Charging",
      href: "/products/power-board",
      layout: "stacked",
    },
    {
      title: "Octopus 3-in-1 Magnetic Charging Station",
      description: "A Qi2 stand that charges your phone, watch and earbuds at the same time",
      image: MagneticChargerStationImage,
      imageAlt: "The Magnetic Charging Station",
      href: "/products/magnetic-station",
      layout: "stacked",
    },
  ];

  const [hero, ...rest] = kitchenProducts;

  return (
    <>
      <div className="xl:px-[128px] py-[16px] lg:px-[32px] md:px-[16px]">
        <Header
          navLinks={navigation}
          cta={{
            label: "Where to buy",
            href: "/where-to-buy",
          }}
        />
      </div>



      <PageSection title="Kitchen" description="Powerful appliances for everyday cooking" id="kitchen">
        <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
          <ProductCard {...hero} className="md:col-span-2 md:min-h-[26rem]" />

          {rest.map((p) => (
            <ProductCard key={p.title} {...p} className="md:max-h-[880px]" />
          ))}
        </section>
      </PageSection>


      <Banner
        image={HeroImage}
        mobileImage={HeroImageMobile}
        title="Octopus Ionic Hair Dryer"
        subtitle="Dry your hair faster and with less frizz with this powerful ionic hair dryer"
        cta={{
          label: "Learn more",
          href: "/products",
        }}
      />

      <PageSection title="Accessories" description="The little things that make everything work better" id="accessories">
        <section className="flex flex-col md:flex-row gap-6 p-4 ">
          {accessoriesProducts.map((p) => (
            <ProductCard key={p.title} {...p} className="w-full" />
          ))}
        </section>
      </PageSection>

      <Footer
        columns={footerColumns}
      />
    </>

  )
}
