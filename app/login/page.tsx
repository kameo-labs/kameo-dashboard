'use client'

import { useState, Suspense } from 'react'
import { getURL } from '@/utils/get-url'

// ... inside component ...

// Dynamic URL based on environment (Local/Vercel/Prod)
const redirectTo = `${getURL()}/auth/callback`
console.log("🔗 Redirecting to:", redirectTo)
import { createBrowserClient } from '@supabase/ssr'
import { useSearchParams } from 'next/navigation'
import { Loader2, Mail } from 'lucide-react'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

        const cleanEmail = email.trim()

        // Dynamic URL based on environment (Local/Vercel/Prod)
        const redirectTo = `${getURL()}/auth/callback`
        console.log("🔗 Redirecting to:", redirectTo)

        const { error } = await supabase.auth.signInWithOtp({
            email: cleanEmail,
            options: {
                emailRedirectTo: redirectTo,
                shouldCreateUser: true
            },
        })

        if (error) {
            console.error(error)
            // Display detailed error
            setMessage(error.message)
        } else {
            setMessage('Lien envoyé ! Vérifiez votre boîte mail (et Mailpit en local).')
        }
        setLoading(false)
    }

    return (
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900">
                    {mode === 'signup' ? 'Créer un compte' : 'Connexion'}
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                    Entrez votre email pro pour continuer
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Email professionnel
                    </label>
                    <div className="relative mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="artisan@exemple.com"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail className="h-4 w-4 text-slate-400" />
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (mode === 'signup' ? "S'inscrire" : 'Envoyer le lien magique')}
                    </button>
                </div>
            </form>

            {message && (
                <div className={`text-center text-sm ${message.includes('Error') || message.includes('invalid') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </div>
            )}
        </div>
    )
}

export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <Suspense fallback={<div>Chargement...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    )
}
