import Button from "@/components/ui/button/Button";

interface PageSectionProps {
    id?: string;
    title: string;
    description: string;
    children: React.ReactNode;
}

export function PageSection({ id, title, description, children }: PageSectionProps) {
    return (
        <div className="lg:mx-[128px] my-[180px]" id={id}>
            <div className="flex flex-col items-center gap-4 mt-16 mb-20">
                <h5 className="text-primary font-bold text-6xl">{title}</h5>
                <span className="text-secondary mb-8">{description}</span>
                <Button label="Explore all products" type="neutral" />
            </div>
            {children}
        </div>
    )
}