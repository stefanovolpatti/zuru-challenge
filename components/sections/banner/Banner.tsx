import Image from "next/image";
import { cn } from "cn";
import { Button } from "@/components/ui/button/Button";
import type { BannerContent } from "@/types/content";

type BannerProps = BannerContent & {
  className?: string;
};

export function Banner({ title, subtitle, image, mobileImage, cta, className }: BannerProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[660px] w-full items-start pt-16 text-primary md:min-h-[666px] md:items-center md:pt-0",
        className
      )}
    >

      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className={cn("object-cover", mobileImage && "hidden md:block")}
      />
      {mobileImage && (
        <Image src={mobileImage} alt="" fill sizes="100vw" className="object-cover md:hidden" />
      )}

      <div className="relative z-10 mx-auto w-full px-6 md:px-8 lg:px-32">
        <div className="flex max-w-[508px] flex-col items-center gap-5 text-center md:items-start md:text-left">
          <h2 className="max-w-3xl text-2xl font-bold md:text-3xl lg:text-4xl">{title}</h2>

          {subtitle && <p className="max-w-2xl text-base md:text-lg">{subtitle}</p>}

          {cta && (
            <Button href={cta.href} variant={cta.variant ?? "red"}>
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
