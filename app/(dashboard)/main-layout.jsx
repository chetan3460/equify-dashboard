"use client";
import React from "react";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Footer from "@/components/partials/footer";
import MobileSidebar from "@/components/partials/sidebar/mobile-sidebar";
import HeaderSearch from "@/components/header-search";
import { useMounted } from "@/hooks/use-mounted";
import LayoutLoader from "@/components/layout-loader";
import { DragProvider } from "@/components/draggable/DragProvider";
import { DragConfirmationPopup } from "@/components/draggable/DragModeHeader";
const MainLayout = ({ children }) => {
  const { collapsed } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const location = usePathname();
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }

  // Hardcoded vertical layout with classic sidebar
  return (
    <DragProvider>
      <Header handleOpenSearch={() => setOpen(true)} />
      <Sidebar />

      <div
        className={cn("content-wrapper transition-all duration-150", {
          "xl:ml-[248px]": !collapsed,
          "xl:ml-[72px]": collapsed,
        })}
      >
        <div
          className={cn("lg:py-6 py-4 lg:px-10 px-7 page-min-height", {})}
        >
          <LayoutWrapper
            setOpen={setOpen}
            open={open}
            location={location}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>
      <Footer />
      
      {/* Global drag confirmation popup */}
      <DragConfirmationPopup />
    </DragProvider>
  );
};

export default MainLayout;

const LayoutWrapper = ({ children, setOpen, open, location }) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar className="left-[300px]" />
      <HeaderSearch open={open} setOpen={setOpen} />
    </>
  );
};
