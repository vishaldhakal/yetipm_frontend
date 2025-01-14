import PropertyListingHeroSection from "../rentals/rentals-detail-setion/hero-section";
import PropertyDetails from "../rentals/rentals-detail-setion/content-section";
import NearbySections from "../rentals/rentals-detail-setion/nearby-section";
import AdditionalInfo from "../rentals/rentals-detail-setion/additional-info";

const RentalsDetailView = ({ rentalDetail }) => {
  return (
    <div>
      <PropertyListingHeroSection rentalDetail={rentalDetail} />
      <PropertyDetails rentalDetail={rentalDetail} />
      <NearbySections rentalDetail={rentalDetail} />
      <AdditionalInfo rentalDetail={rentalDetail} />
    </div>
  );
};

export default RentalsDetailView;
