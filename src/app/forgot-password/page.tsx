"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // In a real app we might show a toast error here
    }
  };

  return (
    <div className="flex min-h-screen bg-background bg-grid items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-600/30 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"></div>
        
        <Card className="relative z-10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight">Forgot Password</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "Check your email for a reset link." 
                : "Enter your email address and we'll send you a link to reset your password."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="rounded-full bg-green-500/20 p-3 text-green-500">
                  <CheckCircle2 size={48} />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  We have sent a password reset link to your email. Please check your inbox and spam folder.
                </p>
                <Link href="/login" className="w-full mt-4">
                  <Button variant="outline" className="w-full">
                    Return to sign in
                  </Button>
                </Link>

              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    disabled={isLoading}
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Send reset link
                </Button>
              </form>
            )}
          </CardContent>
          {!isSubmitted && (
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">
                Back to sign in
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
