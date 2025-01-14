import RentalsDetailView from "@/components/sections/view/rentals-detail-view";

export default async function RentalsDetailPage({ params }) {
  const { slug } = params;
  const rentalDetail = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${slug}`
  ).then((res) => res.json());
  return <RentalsDetailView rentalDetail={rentalDetail} />;
}
