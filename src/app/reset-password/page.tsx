"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timeoutRef1 = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef2 = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef1.current) clearTimeout(timeoutRef1.current);
      if (timeoutRef2.current) clearTimeout(timeoutRef2.current);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    setIsLoading(true);
    
    // Simulate API call to reset password
    timeoutRef1.current = setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      timeoutRef2.current = setTimeout(() => {
        router.push("/login");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-background bg-grid items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/30 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"></div>
        
        <Card className="relative z-10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight">Reset Password</CardTitle>
            <CardDescription>
              {isSuccess 
                ? "Your password has been successfully reset." 
                : "Enter your new password below."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="rounded-full bg-green-500/20 p-3 text-green-500">
                  <CheckCircle2 size={48} />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  You will be redirected to the login page momentarily...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...register("password")}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...register("confirmPassword")}
                      className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                  Reset Password
                </Button>
              </form>
            )}
          </CardContent>
          {!isSuccess && (
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
