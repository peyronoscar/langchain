"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";

interface BulletPointsProps {
  max: number;
  value: string | undefined;
  onValueChange: (value: string) => void;
}

export function BulletPoints({ max, value, onValueChange }: BulletPointsProps) {
  const [input, setInput] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="grid gap-2 pt-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="bulletpoints">Bullet Points</Label>
          <span className="rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
            {input.length} / {max}
          </span>
        </div>
        <input
          className="w-full p-2 border rounded-md"
          id="bulletpoints"
          type="text"
          value={input}
          onChange={handleChange}
          maxLength={max}
        />
      </div>
    </div>
  );
}
