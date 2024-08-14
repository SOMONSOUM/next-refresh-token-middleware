"use client";

import { login } from "@/actions/login";
import { ROUTES } from "@/common/constants";
import {
  FloatingLabelInput,
  PasswordInput,
  LoadingButton,
} from "@/components/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoginInput, LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const LoginScreen: React.FC = () => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginInput> = (input) => {
    startTransition(async () => {
      const { data, error } = await login(input);

      if (error || !data?.accessToken) {
        toast.error(error?.message, {
          position: "top-right",
          style: {
            fontSize: "11pt",
          },
        });
      } else {
        toast.success(`Welcome back!`, {
          position: "top-right",
          style: {
            fontSize: "11pt",
          },
        });
        router.push(ROUTES.DASHBOARD);
      }
    });
  };

  return (
    <div className="mt-4 mx-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={pending} type="submit">
            Login
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};
