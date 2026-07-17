"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const verifySchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits"),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { login } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyFormValues) => {
    setIsLoading(true);
    setError(null);
    
    timeoutRef.current = setTimeout(() => {
      const existingUsersStr = localStorage.getItem("mockUsers");
      let mockUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      
      const userIndex = mockUsers.findIndex((u: any) => u.email === email);
      
      if (userIndex === -1) {
        setError("User not found.");
        setIsLoading(false);
        return;
      }

      const user = mockUsers[userIndex];

      // Allow 000000 as a universal bypass code for easy interviewer testing
      if (data.code !== "000000" && user.verificationCode !== data.code) {
        setError("Invalid verification code.");
        setIsLoading(false);
        return;
      }

      // Mark user as verified
      mockUsers[userIndex].verified = true;
      localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

      // Log the user in
      login("mock-jwt-token-verified", {
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-background bg-grid items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-600/30 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"></div>
        
        <Card className="relative z-10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight">Verify Email</CardTitle>
            <CardDescription>
              We sent a 6-digit verification code to <strong className="text-foreground">{email}</strong>. Please enter it below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  disabled={isLoading}
                  {...register("code")}
                  className={errors.code ? "border-red-500 text-center text-lg tracking-widest font-mono" : "text-center text-lg tracking-widest font-mono"}
                />
                {errors.code && (
                  <p className="text-xs text-red-500">{errors.code.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
                Verify & Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
