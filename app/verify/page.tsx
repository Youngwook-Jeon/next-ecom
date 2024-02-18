"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  searchParams: { token: string; userId: string };
}

export default function Verify(props: Props) {
  const { token, userId } = props.searchParams;
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users/verify", {
      method: "POST",
      body: JSON.stringify({ token, userId }),
    }).then(async (res) => {
      const apiRes = await res.json();
      const { error, message } = apiRes as { message: string; error: string };
      if (res.ok) {
        toast.success(message);
        router.replace("/");
      } else if (error) {
        toast.error(error);
      }
      router.replace("/");
    });
  }, []);

  if (!token || !userId) return redirect("/404");

  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      Please wait...
      <p>We are verifying your email.</p>
    </div>
  );
}
