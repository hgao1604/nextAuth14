"use client";

import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { ResetSchema, ResetSchemaType } from "@/schemas/authSchema";
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
import { login } from "@/actions/login";
import { useState } from "react";
import { reset } from "@/actions/reset";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetSchemaType) => {
    const response = await reset(data);
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Peter@example.com"
                      type="email"
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
export default ResetForm;
