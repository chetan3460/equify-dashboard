"use client";
import React from "react";
import Link from "next/link";

// Inline SVG components to avoid import issues
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

// For now, using simple replacements for other SVG components
const DSearch = ({ className, onClick }) => (
  <svg className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MobileFooter = ({ handleOpenSearch }) => {
  return (
    <footer className="bg-card bg-no-repeat   shadow-[0_-4px_29px_#9595952b] dark:shadow-[0_-4px_29px_#000000cc] footer-bg  border-t dark:border-none flex justify-around items-center backdrop-filter backdrop-blur-[40px] fixed left-0 w-full z-50 bottom-0 py-[12px] px-4">
      <div className="flex flex-col items-center justify-center">
        <DSearch
          className="h-6 w-6  cursor-pointer"
          onClick={handleOpenSearch}
        />
        <p className="mb-0 mt-1.5 text-xs text-default-600">Search</p>
      </div>
      <div className="relative shadow-[0_-4px_10px_#9595952b] dark:shadow-[0_-4px_10px_#0000004d] bg-card border-t dark:border-none bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg  h-[70px] w-[70px] z-[-1] -mt-[40px] flex justify-center items-center">
        <div className="rounded-full bg-primary p-3 h-[60px] w-[60px] flex items-center justify-center  relative left-0 top-0 custom-dropshadow  text-center">
          <Link href="/dashboard">
            <SiteLogo className="h-8 w-8  text-primary-foreground" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Settings className="h-6 w-6  cursor-pointer opacity-50" />
        <p className="mb-0 mt-1.5 text-xs text-default-400">Settings</p>
      </div>
    </footer>
  );
};

export default MobileFooter;
