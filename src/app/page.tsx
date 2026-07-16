"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Menu, Shield, CheckCircle2, ChevronRight, Lock, Globe2, Zap, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Subtle Background Grid & Lighting */}
      <div className="fixed inset-0 bg-grid z-0 opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none z-0"></div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 border border-primary/30 rounded-xl p-2">
            <Shield size={20} className="text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">Securify</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-white hover:text-primary transition-colors">Home</Link>
          <Link href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</Link>
          <Link href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Enterprise</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href={user ? "/profile" : "/login"} className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors mr-2">
            {user ? "Profile" : "Sign In"}
          </Link>
          <Link href={user ? "/profile" : "/signup"}>
            <Button className="rounded-full h-10 px-6 font-semibold bg-white text-black hover:bg-gray-200">
              {user ? "Dashboard" : "Get Started"}
            </Button>
          </Link>
          <button className="text-gray-300 hover:text-white sm:hidden"><Menu size={24} /></button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-6 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-8 backdrop-blur-md">
            <Shield size={14} className="text-primary" />
            <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Military-Grade Encryption</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] mb-6">
            Total Online Freedom. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Absolute Security.
            </span>
          </h1>
          
          <p className="text-gray-400 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed">
            Protect your privacy and browse without limits. Our next-generation VPN ensures your digital life remains invisible and secure.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-24">
            <Link href="/signup">
              <Button className="rounded-full h-14 px-8 text-base font-bold shadow-[0_0_20px_rgba(242,24,62,0.3)] bg-primary text-white hover:bg-primary/90">
                Start Free Trial <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="rounded-full h-14 px-8 text-base font-bold bg-white/5 border-white/10 hover:bg-white/10 hover:text-white">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Abstract Dashboard Mockup instead of messy globe */}
          <div className="w-full max-w-5xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-20"></div>
            <div className="relative z-10 w-full rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl p-2 shadow-2xl overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="w-full bg-[#111] rounded-xl md:rounded-[2rem] border border-white/5 aspect-[21/9] flex items-center justify-center relative overflow-hidden">
                {/* Simulated UI Map */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
                
                {/* Connection Line & Nodes */}
                <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d="M 25 35 Q 50 10, 75 65" fill="none" stroke="rgba(242,24,62,0.5)" strokeWidth="0.5" strokeDasharray="2 2" className="animate-pulse" />
                </svg>
                
                <div className="absolute top-[35%] left-[25%] flex flex-col items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(242,24,62,0.8)] animate-pulse"></div>
                  <div className="bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md text-xs font-medium text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div> New York, USA
                  </div>
                </div>

                <div className="absolute top-[65%] right-[25%] flex flex-col items-center gap-2">
                  <div className="w-3 h-3 bg-white/80 rounded-full"></div>
                  <div className="bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md text-xs font-medium text-gray-300">
                    Frankfurt, DE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Feature Badges (Replacing Marquee) */}
        <section className="w-full max-w-7xl mx-auto px-6 py-10 mb-20 border-y border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
            <div className="flex flex-col items-center gap-3">
              <Globe2 size={24} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Global Coverage</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Lock size={24} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-300">AES-256 Encryption</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Zap size={24} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Server size={24} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-300">No-Log Policy</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The Ultimate Shield For Your Digital Life
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Whether you're browsing at home or on public Wi-Fi, Securify ensures your personal data stays safe from hackers, trackers, and surveillance.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10 mt-1">
                  <Shield size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Complete Privacy</h3>
                  <p className="text-gray-400 text-sm">We never log your traffic or personal data. Your browsing history is yours alone.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10 mt-1">
                  <Globe2 size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Unrestricted Access</h3>
                  <p className="text-gray-400 text-sm">Bypass geo-restrictions and enjoy your favorite content from anywhere in the world.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Side - Cleaner Pricing */}
          <div className="relative">
            {/* Soft Glow Behind Pricing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
              {/* Pro Plan (Highlighted) */}
              <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-3xl p-8 border border-primary/30 shadow-[0_0_30px_rgba(242,24,62,0.15)] relative overflow-hidden transform sm:-translate-y-4">
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
                </div>
                <h4 className="text-lg font-medium text-white mb-2">Pro Plan</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-white">$9.99</span>
                  <span className="text-sm text-gray-400">/mo</span>
                </div>
                <ul className="space-y-4 text-sm text-gray-300 mb-8">
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary"/> 5 Devices Simultaneously</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary"/> 5000+ Global Servers</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary"/> Dedicated IP Option</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-primary"/> 24/7 Priority Support</li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full rounded-full h-12 bg-primary text-white font-bold hover:bg-primary/90">
                    Choose Pro
                  </Button>
                </Link>
              </div>

              {/* Basic Plan */}
              <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/10 relative">
                <h4 className="text-lg font-medium text-white mb-2">Basic Plan</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-white">$4.99</span>
                  <span className="text-sm text-gray-400">/mo</span>
                </div>
                <ul className="space-y-4 text-sm text-gray-400 mb-8">
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-gray-500"/> 1 Device Only</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-gray-500"/> 100+ Core Servers</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-gray-500"/> Standard Speed</li>
                  <li className="flex items-center gap-3 opacity-40"><CheckCircle2 size={16}/> No Dedicated IP</li>
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full rounded-full h-12 bg-transparent border-white/20 text-white font-bold hover:bg-white/5">
                    Choose Basic
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Footer Section */}
        <footer className="w-full border-t border-white/10 mt-10 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-primary" />
                <span className="font-bold text-lg tracking-tight">Securify</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Download</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Server Locations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="w-full border-t border-white/5 py-4 text-center">
            <p className="text-[10px] text-gray-600">© 2026 Securify. All Rights Reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
