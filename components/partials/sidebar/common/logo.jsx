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

// export default function SidebarLogo() {
//   return (
//     <div className="p-4 flex items-center">
//       <SiteLogo className="text-primary" />
//     </div>
//   );
// }

import Image from "next/image";
import siteLogo from "@/public/images/logo/logo.svg";

export default function SidebarLogo() {
  return (
    <div className="p-4 flex items-center">
      <Image
        src={siteLogo}
        alt="Logo"
        width={100}
        height={100}
        className="text-primary"
      />
    </div>
  );
}
