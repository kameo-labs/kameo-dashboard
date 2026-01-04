'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { Check, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function Pricing() {
    const [price, setPrice] = useState<{
        amount: number,
        currency: string,
        rechargePrice?: number,
        rechargeCredits?: number
    } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const supabase = createClient()
                const { data, error } = await supabase.functions.invoke('kameo-payment/config', {
                    method: 'GET'
                })
                if (!error && data) {
                    setPrice({
                        amount: data.amount,
                        currency: data.currency,
                        rechargePrice: data.rechargePrice,
                        rechargeCredits: data.rechargeCredits
                    })
                }
            } catch (e) {
                console.error("Failed to fetch price", e)
            } finally {
                setLoading(false)
            }
        }
        fetchPrice()
    }, [])

    return (
        <section id="pricing" className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Des tarifs simples.
                    </h2>
                    <p className="text-lg text-slate-600">
                        Commencez gratuitement. Passez en pro quand votre agenda est plein.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Free Plan */}
                    <div className="rounded-3xl p-8 border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-colors relative">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Découverte</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-extrabold tracking-tight text-slate-900">0€</span>
                            </div>
                            <p className="mt-4 text-slate-500 text-sm">Sans engagement. Payez à l&apos;utilisation.</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>10 Crédits offerts à l&apos;inscription</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>
                                    Recharge à la carte
                                    {price?.rechargePrice ? ` (${price.rechargePrice}€ / ${price.rechargeCredits} leads)` : ''}
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>Installation Widget Web</span>
                            </li>
                        </ul>
                        <Link href="/login?mode=signup">
                            <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200" size="lg">Créer un compte</Button>
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="rounded-3xl p-8 border-2 border-blue-600 bg-blue-50/10 shadow-xl relative">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
                            POPULAIRE
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-blue-900">Artisan Pro</h3>
                            <div className="mt-4 flex items-baseline">
                                {loading ? (
                                    <div className="h-10 w-32 bg-slate-100 animate-pulse rounded"></div>
                                ) : (
                                    <>
                                        <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                                            {price?.amount || 29}€
                                        </span>
                                        <span className="ml-1 text-xl font-semibold text-slate-500">/mois</span>
                                    </>
                                )}
                            </div>
                            <p className="mt-4 text-slate-500 text-sm">Pour ceux qui veulent remplir leur agenda.</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>Leads ILLIMITÉS</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>Widget "Caméléon" Personnalisé</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>Support Prioritaire (WhatsApp)</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>Pas de commission sur les devis</span>
                            </li>
                        </ul>
                        <Link href="/login?mode=signup">
                            <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200" size="lg">
                                Devenir Pro
                            </Button>
                        </Link>
                    </div>

                </div>

                <p className="text-center text-xs text-slate-400 mt-8">
                    Prix TTC. Sans engagement. Annulable à tout moment depuis votre dashboard.
                </p>
            </div>
        </section>
    )
}
