// import { useSidebar } from "@/store";
// import { Link } from "lucide-react";
// import React from "react";
// import Image from "next/image";

// const SiteLogo = ({ className }) => (
//   <Image
//     src="/images/logo/logo.svg"
//     alt="Logo"
//     width={100}
//     height={100}
//     className={className}
//   />
// );

// const SidebarLogo = ({ hovered }) => {
//   const { sidebarType, setCollapsed, collapsed } = useSidebar();
//   return (
//     <div className="px-4 py-4 ">
//       <div className=" flex items-center">
//         <div className="flex flex-1 items-center  space-x-3  ">
//           <SiteLogo className="text-primary h-8 w-8" />
//           {/* {(!collapsed || hovered) && (
//             <div className="flex-1  text-xl text-primary  font-semibold">
//               Your App Name
//             </div>
//           )} */}
//         </div>
//         {sidebarType === "classic" && (!collapsed || hovered) && (
//           <div className="flex-none lg:block hidden">
//             <div
//               onClick={() => setCollapsed(!collapsed)}
//               className={`h-4 w-4 border-[1.5px] border-default-900 dark:border-default-200 rounded-full transition-all duration-150
//           ${
//             collapsed
//               ? ""
//               : "ring-2 ring-inset ring-offset-4 ring-default-900  bg-default-900  dark:ring-offset-default-300"
//           }
//           `}
//             ></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SidebarLogo;
import { useSidebar } from "@/store";
import Image from "next/image";

const SiteLogo = ({ className }) => (
  <Image
    src="/images/logo/logo.svg"
    alt="Logo"
    width={100}
    height={100}
    className={className}
  />
);

const SidebarLogo = ({ hovered }) => {
  const { sidebarType, setCollapsed, collapsed } = useSidebar();
  const showToggle = sidebarType === "classic" && (!collapsed || hovered);

  return (
    <div className="px-4 py-4 flex items-center">
      <div className="flex flex-1 items-center space-x-3">
        <SiteLogo className="text-primary" />
      </div>

      {showToggle && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden lg:block h-4 w-4 rounded-full border-[1.5px] transition-all duration-150
            border-default-900 dark:border-default-200
            ${
              collapsed
                ? ""
                : "ring-2 ring-inset ring-offset-4 ring-default-900 bg-default-900 dark:ring-offset-default-300"
            }
          `}
        />
      )}
    </div>
  );
};

export default SidebarLogo;
