import Banner from "@/components/ui/banner/Banner";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";

import HeroImage from "../assets/images/Breakpoint=Desktop.png"
import HeroImageMobile from "../assets/images/Category=Hair Care, Breakpoint=_ 810 px.png"

export default function Home() {

  const navigation = [
    { label: "Kitchen", href: "/kitchen" },
    { label: "Home Security", href: "/home-security" },
    { label: "Hair Care", href: "/hair-care" },
    { label: "Accessories", href: "/accessories" },
  ];

  const footerColumns = [
    {
      title: "Our Products",
      grid: true,
      links: [
        { label: "Kitchen", href: "/kitchen" },
        { label: "Hair Care", href: "/hair-care" },
        { label: "Home Security", href: "/home-security" },
        { label: "Accessories", href: "/accessories" },
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
      <Footer
        columns={footerColumns}
      />
    </>

  )
}
