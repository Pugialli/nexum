"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function DsTestPage() {
  return (
    <div className="container mx-auto p-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-6">Button Component Showcase</h1>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Variants</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link" asChild>
            <a href="#">Link</a>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">With Icon</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button>
            <PlusIcon data-icon="inline-start" />
            Default
          </Button>
          <Button>
            Large
            <PlusIcon data-icon="inline-end" />
          </Button>
          <Button size="sm">
            <PlusIcon data-icon="inline-start" />
            Small
          </Button>
          <Button size="xs">
            <PlusIcon data-icon="inline-start" />
            Extra Small
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Icon Only</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="icon-xs">
            <PlusIcon />
          </Button>
          <Button size="icon-sm">
            <PlusIcon />
          </Button>
          <Button size="icon">
            <PlusIcon />
          </Button>
          <Button size="icon-lg">
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Disabled State</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button disabled>Default</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
          <Button variant="link" disabled>
            Link
          </Button>
          <Button disabled>
            <PlusIcon data-icon="inline-start" />
            With Icon
          </Button>
          <Button size="icon" disabled>
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
