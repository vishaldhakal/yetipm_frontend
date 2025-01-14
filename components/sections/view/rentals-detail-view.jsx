import React from "react";
import PropertyListingHeroSection from "../rentals/rentals-detail-setion/hero-section";
import PropertyDetails from "../rentals/rentals-detail-setion/content-section";
import NearbySections from "../rentals/rentals-detail-setion/nearby-section";
import AdditionalInfo from "../rentals/rentals-detail-setion/additional-info";

const RentalsDetailView = () => {
  return (
    <div>
      <PropertyListingHeroSection />
      <PropertyDetails />
      <NearbySections />
      <AdditionalInfo />
    </div>
  );
};

export default RentalsDetailView;
