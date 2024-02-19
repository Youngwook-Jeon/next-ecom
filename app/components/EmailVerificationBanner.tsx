"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "@hooks/useAuth";

interface Props {
  id?: string;
  verified?: boolean;
}

export default function EmailVerificationBanner({ id, verified }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const { profile } = useAuth();

  const applyForReverification = async () => {
    if (!profile) return;
    setSubmitting(true);
    const res = await fetch("/api/users/verify?userId=" + profile.id, {
      method: "GET",
    });

    const { message, error } = await res.json();
    if (res.ok) {
      toast.success(message);
    } else if (error) {
      toast.error(error);
    }
    setSubmitting(false);
  };
  if (profile?.verified) return null;

  // const applyForReverification = async () => {
  //   if (!id) return;

  //   setSubmitting(true);
  //   const res = await fetch("/api/users/verify?userId=" + id, {
  //     method: "GET",
  //   });
  //   const { message, error } = await res.json();
  //   if (!res.ok && error) {
  //     toast.error(error);
  //   }

  //   toast.success(message);
  //   setSubmitting(false);
  // };

  // if (verified) return null;

  return (
    <div className="p-2 text-center bg-blue-50">
      <span>{`It looks like you haven't verified your email.`}</span>
      <button
        disabled={submitting}
        onClick={applyForReverification}
        className="ml-2 font-semibold underline"
      >
        {submitting ? "Generating link..." : "Get verification link."}
      </button>
    </div>
  );
}
