import { Section } from "./ui/section.jsx";
import Github from "./logos/github";
import Glow from "./ui/glow";
import { Mockup, MockupFrame } from "./ui/mockup";
import { SocialStats } from "./ui/social-stats.jsx";
import { Badge } from "./ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";
import Screenshot from "./ui/screenshot";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


export default function Hero({
    title = "qs_lib: Empower Your Quasar Scripts",
    description = "qs_lib is an open-source library for Quasar, crafted to streamline script development for FiveM servers. Modular, lightweight, and compatible with your favorite frameworks, it’s the perfect tool to elevate your projects.",
    badge = (
        <Badge variant="outline" className="animate-appear">
            <span className="text-muted-foreground">Latest Release: qs_lib v1.0.0</span>
            <a
                href="/docs/qs_lib/"
                className="flex items-center gap-1"
            >
                Discover What’s New
                <ArrowRightIcon className="size-3" />
            </a>
        </Badge>
    ),
    buttons = [
        {
            href: "/docs/qs_lib/",
            text: "Get Started",
            variant: "default",
        },
        {
            href: "https://github.com/username/qs_lib",
            text: "Github",
            variant: "glow",
            icon: <Github className="mr-2 size-4" />,
        },
    ],
    extraContent = <SocialStats />,
    className,
    mockups = {
        left: (
            <Screenshot
                srcLight="/img/image.png"
                srcDark="img/image.png"
                alt="Launch UI app screenshot"
                width={1248}
                height={765}
            />
        ),
        center: (
            <Screenshot
                srcLight="/img/image.png"
                srcDark="img/image.png"
                alt="Launch UI app screenshot"
                width={1248}
                height={765}
            />
        ),
        right: (
            <Screenshot
                srcLight="/img/image.png"
                srcDark="img/image.png"
                alt="Launch UI app screenshot"
                width={1248}
                height={765}
            />
        ),
    },
}) {
    return (
        <Section
            className={cn(
                "fade-bottom w-full overflow-hidden pb-0 sm:pb-0 md:pb-0 z-50",
                className,
            )}
        >
            <div className="max-w-[60%] relative mx-auto flex flex-col gap-12 pt-8">
                <div className="relative z-10 flex flex-col items-start gap-6 sm:gap-8">
                    {badge !== false && badge}
                    <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground inline-block max-w-[840px] bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
                        {title}
                    </h1>
                    <p className="text-md animate-appear text-muted-foreground max-w-[840px] font-medium text-balance opacity-xd delay-100 lg:text-xl">
                        {description}
                    </p>
                    {buttons !== false && buttons.length > 0 && (
                        <div className="animate-appear flex gap-4 opacity-xd delay-300">
                            {buttons.map((button, index) => (
                                <Button
                                    key={index}
                                    variant={button.variant || "default"}
                                    size="lg"
                                    asChild
                                >
                                    <a href={button.href}>
                                        {button.icon}
                                        {button.text}
                                        {button.iconRight}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    )}
                    {extraContent !== false && (
                        <div className="animate-appear flex gap-4 opacity-xd delay-300">
                            {extraContent}
                        </div>
                    )}
                </div>
                {mockups !== false && (
                    <div className="group relative sm:px-24">
                        <div className="relative left-[-24%] z-10 h-[24px] rotate-[-24deg] skew-y-12 transition-all delay-200 duration-700 ease-in-out group-hover:left-[-32%] group-hover:rotate-[-12deg] group-hover:skew-y-6">
                            <MockupFrame
                                className="animate-appear shadow-mockup opacity-xd delay-500"
                                size="small"
                            >
                                <Mockup type="responsive">{mockups.left}</Mockup>
                            </MockupFrame>
                        </div>
                        <div className="relative z-10 h-[24px] rotate-[-24deg] skew-y-12 transition-all delay-200 duration-700 ease-in-out group-hover:rotate-[-12deg] group-hover:skew-y-6">
                            <MockupFrame
                                className="animate-appear shadow-mockup opacity-xd delay-1000"
                                size="small"
                            >
                                <Mockup type="responsive">{mockups.center}</Mockup>
                            </MockupFrame>
                        </div>
                        <div className="relative left-[32%] z-10 rotate-[-24deg] skew-y-12 transition-all delay-200 duration-700 ease-in-out group-hover:left-[48%] group-hover:rotate-[-12deg] group-hover:skew-y-6">
                            <MockupFrame
                                className="animate-appear shadow-mockup opacity-xd delay-1500"
                                size="small"
                            >
                                <Mockup type="responsive">{mockups.right}</Mockup>
                            </MockupFrame>
                        </div>
                    </div>
                )}
                <Glow
                    variant="center"
                    className="animate-appear-zoom mt-32 opacity-xd delay-2000 lg:-mt-12"
                />
            </div>
        </Section>
    );
}