'use client'

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold">
                        Nexum
                    </span>
                </Link>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/aluno/dashboard" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Dashboard
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/professor/cadastro-aluno" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Cadastrar Aluno
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
                <nav className="flex items-center">
                    <Link
                      href="/auth/login"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Login
                      </NavigationMenuLink>
                    </Link>
                </nav>
            </div>
        </div>
    </header>
  )
}