import VerifyClient from "@/app/components/VerifyClient";

export default function Page({
  params,
}: {
  params: { uid: string; token: string };
}) {
  return <VerifyClient uid={params.uid} token={params.token} />;
}