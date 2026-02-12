'use client'

import type { GetProfileResponse } from "@/app/api/auth/profile/[id]/get-profile";
import { signOut } from "@/auth/actions";
import { getInitials } from "@/utils/get-initials";
import { getRingColor } from "@/utils/ring-color";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface ProfileButtonProps {
  user: GetProfileResponse
}

export function ProfileButton({ user }: ProfileButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const role = user.role || ''

  const handleLogout = async () => {
    setIsDropdownOpen(false)
    await signOut()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`rounded-full ring-4 ${getRingColor(role)} cursor-pointer focus:outline-none`}
      >
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.avatarUrl || undefined} alt={user.nome} />
          <AvatarFallback className="bg-orange-600 text-white">
            {getInitials(user.nome)}
          </AvatarFallback>
        </Avatar>
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
            <Link
              href="/aluno/perfil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        </>
      )}
    </div>
  )
}