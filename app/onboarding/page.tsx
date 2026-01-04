'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'

const BUSINESS_TYPES = [
    'Plumber',
    'Locksmith',
    'Electrician',
    'Painter',
    'Carpenter',
    'Gardener',
    'Other',
]

export default function Onboarding() {
    const [businessName, setBusinessName] = useState('')
    const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const { error } = await supabase
                .from('kameo_artisans')
                .upsert({
                    id: user.id,
                    email: user.email,
                    business_name: businessName,
                    business_type: businessType.toLowerCase(),
                    status: 'trial'
                })
                .select()

            if (!error) {
                router.refresh()
                router.push('/dashboard')
            } else {
                alert('Erreur lors de la mise à jour.')
            }
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Bienvenue sur Kameo</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Finalisons votre profil professionnel
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-slate-700">
                            Nom de l&apos;entreprise
                        </label>
                        <div className="mt-2">
                            <input
                                id="businessName"
                                type="text"
                                required
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                placeholder="Plomberie Martin"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="businessType" className="block text-sm font-medium text-slate-700">
                            Type d&apos;activité
                        </label>
                        <div className="mt-2">
                            <select
                                id="businessType"
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            >
                                {BUSINESS_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {loading ? 'Enregistrement...' : 'Commencer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
