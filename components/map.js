"use client";

export default function Map(props) {
  const address = props?.address || '';

  // Debug logging
  console.log("Environment variables:", {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    address: address
  });

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    console.error("Google Maps API key is missing");
    return (
      <div className="w-full h-[240px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="font-medium">Map configuration error</p>
          <p className="text-sm mt-1">API key not found</p>
        </div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="w-full h-[240px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        No address provided
      </div>
    );
  }

  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;

  return (
    <div className="w-full h-[240px] rounded-lg overflow-hidden">
      <iframe
        title={`Map showing location of ${address}`}
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}