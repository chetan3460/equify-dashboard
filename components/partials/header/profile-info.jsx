"use client";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/app/assets/images/avatar.png";

const ProfileInfo = () => {
  // Static user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    image: avatar, // webpack bundles it
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer focus:outline-none"
      >
        <Image
          src={user.image}
          alt={user.name}
          width={36}
          height={36}
          className="rounded-full"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-default-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
          {/* User Info */}
          <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-200 dark:border-default-200">
            <Image
              src={user.image}
              alt={user.name}
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <div className="text-sm font-medium text-default-800 capitalize">
                {user.name}
              </div>
              <Link
                href="/dashboard"
                className="text-xs text-default-600 hover:text-primary"
              >
                @{user.email.split("@")[0]}
              </Link>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {[
              { name: "Profile", icon: "heroicons:user" },
              { name: "Billing", icon: "heroicons:credit-card" },
              { name: "Settings", icon: "heroicons:cog-6-tooth" },
              { name: "Keyboard Shortcuts", icon: "heroicons:command-line" },
            ].map((item, index) => (
              <Link href="/dashboard" key={index}>
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-default-600 capitalize hover:bg-gray-100 dark:hover:bg-default-200 cursor-pointer">
                  <Icon icon={item.icon} className="w-4 h-4" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-default-200 py-1">
            <Link href="/dashboard">
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-default-600 capitalize hover:bg-gray-100 dark:hover:bg-default-200 cursor-pointer">
                <Icon icon="heroicons:cog-6-tooth" className="w-4 h-4" />
                Preferences
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
