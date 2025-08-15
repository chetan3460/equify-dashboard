import { Badge } from "@/components/ui/badge";

// Inline SVG component to avoid import issues
const Bell = ({ className }) => (
  <svg className={className} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.35" d="M15.625 8.00033V8.58699C15.625 9.29116 15.825 9.97949 16.2017 10.5653L17.125 12.0012C17.9675 13.3128 17.3242 15.0953 15.8583 15.5095C12.0281 16.5945 7.97186 16.5945 4.14166 15.5095C2.67582 15.0953 2.03249 13.3128 2.87499 12.0012L3.79832 10.5653C4.1763 9.97479 4.37675 9.28813 4.37582 8.58699V8.00033C4.37582 4.77866 6.89416 2.16699 9.99999 2.16699C13.1058 2.16699 15.625 4.77866 15.625 8.00033Z" fill="currentColor"/>
    <path d="M10.625 5.5C10.625 5.33424 10.5591 5.17527 10.4419 5.05806C10.3247 4.94085 10.1658 4.875 9.99999 4.875C9.83423 4.875 9.67526 4.94085 9.55805 5.05806C9.44084 5.17527 9.37499 5.33424 9.37499 5.5V8.83333C9.37499 8.99909 9.44084 9.15806 9.55805 9.27527C9.67526 9.39249 9.83423 9.45833 9.99999 9.45833C10.1658 9.45833 10.3247 9.39249 10.4419 9.27527C10.5591 9.15806 10.625 8.99909 10.625 8.83333V5.5ZM6.03583 15.9542C6.30812 16.7909 6.83823 17.5201 7.55024 18.0371C8.26225 18.5542 9.11963 18.8327 9.99958 18.8327C10.8795 18.8327 11.7369 18.5542 12.4489 18.0371C13.1609 17.5201 13.691 16.7909 13.9633 15.9542C11.3425 16.4458 8.65749 16.4458 6.03583 15.9542Z" fill="currentColor"/>
  </svg>
);
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { notifications } from "./notification-data";
import shortImage from "@/public/images/all-img/short-image-2.png";

const NotificationMessage = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200 
          data-[state=open]:bg-default-100  dark:data-[state=open]:bg-default-200 
           hover:text-primary text-default-500 dark:text-default-800  rounded-full  "
        >
          <Bell className="h-5 w-5 " />
          <Badge className=" w-4 h-4 p-0 text-xs  font-medium  items-center justify-center absolute left-[calc(100%-18px)] bottom-[calc(100%-16px)] ring-2 ring-primary-foreground">
            5
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className=" z-[999] mx-4 lg:w-[412px] p-0"
      >
        <DropdownMenuLabel
          style={{ backgroundImage: `url(${shortImage.src})` }}
          className="w-full h-full bg-cover bg-no-repeat p-4 flex items-center"
        >
          <span className="text-base font-semibold text-white flex-1">
            Notification
          </span>
          <span className="text-xs font-medium text-white flex-0 cursor-pointer hover:underline hover:decoration-default-100 dark:decoration-default-900">
            Mark all as read{" "}
          </span>
        </DropdownMenuLabel>
        <div className="h-[300px] xl:h-[350px]">
          <ScrollArea className="h-full">
            {notifications.map((item, index) => (
              <DropdownMenuItem
                key={`inbox-${index}`}
                className="flex gap-9 py-2 px-4 cursor-pointer dark:hover:bg-background"
              >
                <div className="flex-1 flex items-center gap-2">
                  <Avatar className="h-10 w-10 rounded">
                    <AvatarImage src={item.avatar.src} />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-default-900 mb-[2px] whitespace-nowrap">
                      {item.fullName}
                    </div>
                    <div className="text-xs text-default-900 truncate max-w-[100px] lg:max-w-[185px]">
                      {" "}
                      {item.message}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "text-xs font-medium text-default-900 whitespace-nowrap",
                    {
                      "text-default-600": !item.unreadmessage,
                    }
                  )}
                >
                  {item.date}
                </div>
                <div
                  className={cn("w-2 h-2 rounded-full mr-2", {
                    "bg-primary": !item.unreadmessage,
                  })}
                ></div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </div>
        <DropdownMenuSeparator />
        <div className="m-4 mt-5">
          <Button asChild type="text" className="w-full">
            <Link href="/dashboard">View All</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMessage;
