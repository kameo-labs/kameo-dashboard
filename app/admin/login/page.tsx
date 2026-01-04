
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Loader2, ShieldCheck } from 'lucide-react'
import { getURL } from '@/utils/get-url'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const redirectTo = `${window.location.origin}/auth/callback?next=/admin` // Redirect back to Admin Dash

        const { error } = await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: {
                emailRedirectTo: redirectTo,
                shouldCreateUser: true // Allow creation, access is guarded by DB table anyway
            },
        })

        if (error) {
            setMessage(error.message)
        } else {
            setMessage('Lien d\'accès envoyé 📨')
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-sm space-y-8 p-8 border border-gray-800 rounded-xl bg-gray-950/50 backdrop-blur">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/30 ring-1 ring-blue-500/50">
                        <ShieldCheck className="h-6 w-6 text-blue-500" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight">Accès Administrateur</h2>
                    <p className="mt-2 text-sm text-gray-400">Restreint au personnel autorisé</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email Admin</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md border-0 bg-gray-800/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                            placeholder="admin@kameo.app"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition-all"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'S\'identifier'}
                    </button>
                </form>

                {message && (
                    <div className={`text-center text-sm p-3 rounded bg-gray-900 border ${message.includes('Error') ? 'border-red-900 text-red-400' : 'border-green-900 text-green-400'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}
