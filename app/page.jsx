"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard immediately
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-semibold text-default-900">
          Redirecting to Dashboard...
        </div>
      </div>
    </div>
  );
};

export default HomePage;
