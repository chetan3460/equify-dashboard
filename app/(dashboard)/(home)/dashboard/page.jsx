"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// SMS Volume Chart Components - Organized Structure
import { SMSVolumeChart } from "./components/sms-volume-chart";

// Other Components
import LineChartWithPadding from "./components/linechart-with-padding";
import TitleSection from "./components/TitleSection";
import EcommerceCardsNew from "./components/EcommerceCardsNew";

const Dashboard = () => {
  // Your provided SMS Volume data - CLEAN AND ORGANIZED
  const smsData = {
    lastUpdated: "15:15:45",
    "12:00": {
      total: 155130,
      delivered: 77434,
      failed: 22575,
      retry: 55121,
    },
    "13:00": {
      total: 155130,
      delivered: 77434,
      failed: 22575,
      retry: 55121,
    },
    "14:00": {
      total: 155130,
      delivered: 77434,
      failed: 22575,
      retry: 55121,
    },
    "15:00": {
      total: 155130,
      delivered: 77434,
      failed: 22575,
      retry: 55121,
    },
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <TitleSection />
      {/* Draggable SMS Stats Cards */}
      <EcommerceCardsNew />

      {/* SMS Volume Chart - ORGANIZED COMPONENTS */}
      <SMSVolumeChart smsData={smsData} height={400} />

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Line Chart With XAxis Padding</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChartWithPadding />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
