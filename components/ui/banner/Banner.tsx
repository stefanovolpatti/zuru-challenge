
import { StaticImageData } from "next/image";
import Button from "../button/Button";

interface BannerProps {
    title: string;
    subtitle: string;
    image: StaticImageData;
    mobileImage?: StaticImageData;
    cta: {
        label: string;
        href: string;
    };
    className?: string;
    textColor?: string;
}

const Banner = ({
    title,
    subtitle,
    image,
    mobileImage,
    cta,
    className = "text-primary",
    textColor,
}: BannerProps) => {
    return (
        <section
            className={`
                relative flex w-full
                min-h-[660px]
                items-start pt-16
                md:min-h-[666px]
                md:items-center md:pt-0
                ${className}
            `}
        >
            {/* Desktop background */}
            <div
                className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
                style={{
                    backgroundImage: `url("${image.src}")`,
                }}
            />

            {/* Mobile background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
                style={{
                    backgroundImage: `url("${(mobileImage ?? image).src}")`,
                }}
            />

            <div className="absolute inset-0" />

            <div className="
                relative z-10 mx-auto w-full
                px-6 md:px-8 lg:px-32
            ">
                <div className="
                    flex flex-col items-center text-center gap-5
                    md:items-start md:text-left
                    max-w-[508px]
                ">
                    <h5 className={`
                        max-w-3xl
                        text-2xl font-bold
                        md:text-3xl lg:text-4xl
                        ${textColor ?? ""}
                    `}>
                        {title}
                    </h5>

                    <span className={`
                        max-w-2xl text-base
                        md:text-lg
                        ${textColor ?? ""}
                    `}>
                        {subtitle}
                    </span>

                    <Button type="red" label={cta.label} />
                </div>
            </div>
        </section>
    );
};

export default Banner;
