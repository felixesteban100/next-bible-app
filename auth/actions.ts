"use server"
import { signIn, signOut } from "@/auth"

export async function signInAction(formData: FormData) {
    await signIn("google", { redirectTo: formData.get('redirectTo')?.toString() ?? "/" })
}

export async function signOutAction() {
    await signOut()
}