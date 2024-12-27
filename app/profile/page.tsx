import ManageSub from "@/components/pricing/ManageSub";
import ProfileUpdate from "./_components/ProfileUpdate";

export default function page() {
  return (
    <div className="container">
      <ProfileUpdate />
      <ManageSub />
    </div>
  );
}
