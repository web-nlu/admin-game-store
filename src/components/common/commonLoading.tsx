import {BlinkBlur} from "react-loading-indicators";
import React from "react";

export default function CommonLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center mb-6">
      <BlinkBlur color="#2b7fff" size="medium" text="" textColor=""/>
    </div>
  )
}