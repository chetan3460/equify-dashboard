"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ColorAlert = () => {
  return (
    <div className="space-y-4 ">
      <Alert>
        <AlertDescription>
          I&apos;m an alert with primary background color.!
        </AlertDescription>
      </Alert>
      <Alert color="secondary">
        <AlertDescription>
          I&apos;m an alert with secondary background color.!
        </AlertDescription>
      </Alert>

      <Alert color="warning">
        <AlertDescription>
          I&apos;m an alert with warning background color.!
        </AlertDescription>
      </Alert>
      <Alert color="success">
        <AlertDescription>
          I&apos;m an alert with success background color.!
        </AlertDescription>
      </Alert>
      <Alert color="destructive">
        <AlertDescription>
          I&apos;m an alert with destructive background color.!
        </AlertDescription>
      </Alert>
      <Alert color="info">
        <AlertDescription>
          I&apos;m an alert with info background color.!
        </AlertDescription>
      </Alert>
      <Alert color="dark">
        <AlertDescription>
          I&apos;m an alert with dark background color.!
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ColorAlert;
