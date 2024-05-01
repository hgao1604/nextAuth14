"use client";

import { BeatLoader } from "react-spinners";
import CardWrapper from "@/components/auth/CardWrapper";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { verifyToken } from "@/actions/verificationEmail";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

const VerifyEmailPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Invalid token");
      setIsLoading(false);
      return;
    }
    try {
      const response = await verifyToken(token);
      console.log(response);
      if (response?.error) {
        setError(response.error);
        setSuccess("");
      }
      if (response?.success) {
        setSuccess(response.success);
        setError("");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  if (!token) {
    setError("Invalid token");
  }

  return (
    <CardWrapper
      headLabel="Confirming your email"
      backLabel="Back to login"
      backLink="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        <BeatLoader loading={isLoading} />
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
export default VerifyEmailPage;
