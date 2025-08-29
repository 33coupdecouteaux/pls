"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { GlassButton } from "@/components/ui/glassbutton";
import { RadioIcon } from "../ui/radio";

interface NavAuthButtonProps {
  className?: string;
}

export default function NavAuthButton({ className = "" }: NavAuthButtonProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  if (isPending) {
    return (
      <div className={`liquid-glass-button ${className}`}>
        <div className="animate-pulse bg-white/20 rounded-full w-8 h-8"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="relative" ref={dropdownRef}>
        <GlassButton
          size="sm"
          onClick={() => setShowDropdown(!showDropdown)}
          className={className}
        >
          <RadioIcon size={20}/>
        </GlassButton>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-48 liquid-glass-dropdown rounded-xl overflow-hidden z-50">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl" />
            <div className="relative p-2">
              <div className="px-3 py-2 border-b border-white/10">
                <p className="text-sm font-medium text-white">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-300 truncate">
                  {session.user.email}
                </p>
              </div>
              
              <button
                onClick={() => {
                  router.push("/dashboard");
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                📊 Dashboard
              </button>
              
              <button
                onClick={() => {
                  signOut();
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-red-400/20 rounded-lg transition-colors"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
