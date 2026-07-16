"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon, Mail, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Handled by protected route logic in AuthContext
  }

  return (
    <div className="flex min-h-screen bg-background bg-grid items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-600/30 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"></div>
        
        <Card className="relative z-10">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary">
              <UserIcon size={40} />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">{user.name}</CardTitle>
            <CardDescription className="flex items-center justify-center mt-1">
              <ShieldCheck size={14} className="mr-1 text-green-500" />
              Authenticated User
            </CardDescription>
          </CardHeader>
          
          <CardContent className="mt-4">
            <div className="space-y-4 rounded-lg bg-muted/50 p-4 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground flex items-center">
                  <UserIcon size={14} className="mr-2" /> User ID
                </span>
                <span className="text-sm font-mono">{user.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground flex items-center">
                  <Mail size={14} className="mr-2" /> Email
                </span>
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20" 
              onClick={logout}
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
