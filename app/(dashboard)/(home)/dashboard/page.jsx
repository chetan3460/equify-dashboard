"use client";
import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

import TitleSection from "./components/TitleSection";
// Import draggable system components
import EcommerceCardsNew from "./components/EcommerceCardsNew";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <TitleSection />
      {/* Draggable SMS Stats Cards */}
      <EcommerceCardsNew />
    </div>
  );
};

export default Dashboard;
