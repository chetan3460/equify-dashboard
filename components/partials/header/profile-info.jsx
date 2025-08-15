"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const ProfileInfo = () => {
  // Static user data since authentication is removed
  const user = {
    name: "John Doe",
    email: "john@example.com",
    image: null
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {user.name}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
              @{user.email.split('@')[0]}
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            {
              name: "profile",
              icon: "heroicons:user",
            },
            {
              name: "Billing",
              icon: "heroicons:megaphone",
            },
            {
              name: "Settings",
              icon: "heroicons:paper-airplane",
            },
            {
              name: "Keyboard shortcuts",
              icon: "heroicons:language",
            },
          ].map((item, index) => (
            <Link
              href="/dashboard"
              key={`info-menu-${index}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:user-group" className="w-4 h-4" />
              team
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background">
              <Icon icon="heroicons:user-plus" className="w-4 h-4" />
              Invite user
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  {
                    name: "email",
                  },
                  {
                    name: "message",
                  },
                  {
                    name: "facebook",
                  },
                ].map((item, index) => (
                  <Link
                    href="/dashboard"
                    key={`message-sub-${index}`}
                    className="cursor-pointer"
                  >
                    <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <Link href="/dashboard">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:variable" className="w-4 h-4" />
              Github
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:phone" className="w-4 h-4" />
              Support
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  {
                    name: "portal",
                  },
                  {
                    name: "slack",
                  },
                  {
                    name: "whatsapp",
                  },
                ].map((item, index) => (
                  <Link href="/dashboard" key={`message-sub-${index}`}>
                    <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <Link href="/dashboard">
          <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer">
            <Icon icon="heroicons:cog-6-tooth" className="w-4 h-4" />
            Preferences
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
