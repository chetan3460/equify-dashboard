"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Inline SVG component to avoid import issues
const SiteLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3868_4519)">
      <path d="M0 18.3826C0 16.8785 1.19391 15.6592 2.66667 15.6592H18V17.7017C18 19.2058 16.8061 20.4251 15.3333 20.4251H0V18.3826Z" fill="currentColor"/>
      <path d="M9.33329 32.0001C7.86056 32.0001 6.66663 30.7807 6.66663 29.2767V21.1064H8.66663C10.1394 21.1064 11.3333 22.3258 11.3333 23.8298V32.0001H9.33329Z" fill="currentColor"/>
      <path d="M0 0H18.6667C26.0305 0 32 6.09655 32 13.617H0V0Z" fill="currentColor"/>
      <path d="M16 31.9996C18.1011 31.9996 20.1817 31.5769 22.1229 30.7558C24.0641 29.9346 25.828 28.731 27.3137 27.2136C28.7995 25.6963 29.978 23.8949 30.7821 21.9124C31.5861 19.9299 32 17.805 32 15.6592H22.8411C22.8411 16.5767 22.6641 17.4852 22.3203 18.3329C21.9765 19.1805 21.4727 19.9507 20.8374 20.5995C20.2021 21.2483 19.448 21.7629 18.618 22.114C17.788 22.4651 16.8984 22.6458 16 22.6458V31.9996Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_3868_4519">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);
import footerImage from "@/public/images/landing-page/footer.png"
import facebook from "@/public/images/social/facebook-1.png"
import dribble from "@/public/images/social/dribble-1.png"
import linkedin from "@/public/images/social/linkedin-1.png"
import github from "@/public/images/social/github-1.png"
import behance from "@/public/images/social/behance-1.png"
import twitter from "@/public/images/social/twitter-1.png"
import youtube from "@/public/images/social/youtube.png"

const Footer = () => {
  const socials = [
    {
      icon: facebook,
      href: "https://www.facebook.com/Codeshaperbd/"
    },
    {
      icon: github,
      href: "https://github.com/Codeshaper-bd"
    },
    {
      icon: linkedin,
      href: "https://www.linkedin.com/company/codeshaper/"
    },
    {
      icon: youtube,
      href: "https://www.youtube.com/@codeshaper4181"
    },
    {
      icon: twitter,
      href: "https://twitter.com/codeshaperbd"
    },
    {
      icon: dribble,
      href: "https://dribbble.com/codeshaperbd"
    },
    {
      icon: behance,
      href: "https://www.behance.net/codeshaper"
    }
  ]
  return (
    <footer
      className=" bg-cover bg-center bg-no-repeat relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-default-900/90 dark:before:bg-default-100"
      style={{
        background: `url(${footerImage.src})`
      }}
    >
      <div className="py-16 2xl:py-[120px]">
        <div className="max-w-[700px] mx-auto flex flex-col items-center relative">
          <Link
            href="/"
            className="inline-flex items-center gap-4 text-primary-foreground"
          >
            <SiteLogo className="w-[50px] h-[52px]" />
            <span className="text-3xl font-semibold">DashTail</span>
          </Link>
          <p className="text-base leading-7 text-default-200 dark:text-default-600 text-center mt-3">
            DashTail is a developer-friendly, ready-to-use admin template designed for building attractive, scalable, and high-performing web applications, powered by the cutting-edge technologies of Next.js and Tailwind CSS.</p>
          <div className="mt-9 flex justify-center flex-wrap gap-4">
            <Button asChild variant="outline" className="rounded text-primary-foreground border-primary">
              <Link href="/dashboard">View Demo</Link>
            </Button>
            <Button asChild variant="outline" className="rounded text-primary-foreground border-primary">
              <Link href="/docs/introduction">View Documentation</Link>
            </Button>
            <Button asChild variant="outline" className="rounded text-primary-foreground border-primary">
              <Link href="/">Buy Now</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center flex-wrap gap-5">
            {
              socials.map((item, index) => (
                <Link
                  href={item.href}
                  key={`social-link-${index}`}
                  target="_blank"
                >
                  <Image src={item.icon} alt="social" width={30} height={30} />
                </Link>
              ))
            }
          </div>
        </div>
      </div>
      <div className="relative bg-default-900 dark:bg-default-50 py-6">
        <div className="container flex flex-col text-center md:text-start md:flex-row gap-2">
          <p className="text-primary-foreground flex-1 text-base xl:text-lg font-medium">COPYRIGHT &copy; 2024 DashTail All rights Reserved</p>
          <p className="text-primary-foreground flex-none text-base font-medium">
            Hand-crafted & Made by {" "}
            <Link href="/" className="text-primary hover:underline">Codeshaper</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;