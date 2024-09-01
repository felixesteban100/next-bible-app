"use client"

import { useEffect } from "react";

export function useKeyPress(callback: () => void, keyCodes: string[]): void {
    useEffect(() => {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (keyCodes.includes(e.code)) {
                e.preventDefault()
                callback();
            }
        });
        return () => {
            window.removeEventListener("keydown", (e: KeyboardEvent) => {
                if (keyCodes.includes(e.code)) {
                    e.preventDefault()
                    callback();
                }
            });
        };
    });
}