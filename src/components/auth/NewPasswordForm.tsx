"use client";

import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import {
  NewPasswordSchema,
  type NewPasswordSchemaType,
} from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { useState } from "react";
import { newPassword } from "@/actions/reset";
import { useSearchParams } from "next/navigation";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: NewPasswordSchemaType) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const response = await newPassword(data, token);
    if (response?.error) {
      setError(response.error);
      setSuccess("");
    }
    if (response?.success) {
      setSuccess(response.success);
      setError("");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <CardWrapper
      headLabel="Reset your password"
      backLabel="Back to login"
      backLink="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default NewPasswordForm;
