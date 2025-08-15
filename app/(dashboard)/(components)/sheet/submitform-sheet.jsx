"use client";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

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
export default function SubmitFormInDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <span className="text-xl mr-1">
            <Icon icon="icon-park-outline:plus" />
          </span>
          New Account
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[736px] p-0">
        <SheetHeader className="py-3 pl-4">
          <SheetTitle>Create a New Account</SheetTitle>
        </SheetHeader>
        <hr />
        <div className="px-5 py-6 h-[calc(100vh-120px)]">
          <ScrollArea className="h-full">
            <div className=" text-center py-2">
              <div className="flex justify-center">
                <Link href="#">
                  <SiteLogo className="w-12 h-12 mb-2 text-primary" />
                </Link>
              </div>
              <h3 className="text-2xl font-bold text-default-700 ">
                Create a new account
              </h3>
              <p className="text-default-600  mt-1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
                quod delectus amet.
              </p>
            </div>
            {/* form */}
            <div className="md:grid md:grid-cols-2 gap-6 mt-6 space-y-6 md:space-y-0">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Name</Label>
                <Input
                  type="text"
                  placeholder="Please enter user name"
                  id="username"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="url">URL</Label>
                <Input type="text" placeholder="Please enter url" id="url" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="owner">Owner</Label>
                <Select id="owner">
                  <SelectTrigger>
                    <SelectValue placeholder="Please select an owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Owner 1</SelectItem>
                    <SelectItem value="2">Owner 2</SelectItem>
                    <SelectItem value="3">Owner 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="choose-type">Type</Label>
                <Select id="choose-type">
                  <SelectTrigger>
                    <SelectValue placeholder="Please Choose the type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Type 1</SelectItem>
                    <SelectItem value="2">Type 2</SelectItem>
                    <SelectItem value="3">Type 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="approver">Type</Label>
                <Select id="approver">
                  <SelectTrigger>
                    <SelectValue placeholder="Please choose the approver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Approver 1</SelectItem>
                    <SelectItem value="2">Approver 2</SelectItem>
                    <SelectItem value="3">Approver 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="datetime">Date Time</Label>
                <Input type="date" id="url" />
              </div>
              <div className="md:col-span-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea placeholder="Please enter url description" />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        <SheetFooter className="gap-3 pt-4 block">
          <div className="flex items-center gap-2.5 justify-center">
            <SheetClose asChild>
              <Button color="destructive" variant="outline" size="xs"> Cancel </Button>
            </SheetClose>
            <Button size="xs" >Submit</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
