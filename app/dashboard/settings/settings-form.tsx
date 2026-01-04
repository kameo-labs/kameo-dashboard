'use client'

import { createClient } from '@/utils/supabase/client'

import { useTransition, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { updateSettings } from './actions'

interface SettingsFormProps {
    artisan: {
        hourly_rate: number | null
        notify_email: boolean | null
        notify_sms: boolean | null
        business_name: string | null
        business_type: string | null
        subscription_status: string | null
        credits: number | null
    }
}

const BUSINESS_TYPES = [
    'Plumber',
    'Locksmith',
    'Electrician',
    'Painter',
    'Carpenter',
    'Gardener',
    'Other',
]

export function SettingsForm({ artisan }: SettingsFormProps) {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await updateSettings(formData)
            if (result.error) {
                toast.error('Erreur lors de la mise à jour: ' + result.error)
            } else {
                toast.success('Paramètres sauvegardés avec succès !')
            }
        })
    }

    const [price, setPrice] = useState<{ amount: number, currency: string } | null>(null)

    useEffect(() => {
        const fetchPrice = async () => {
            const supabase = createClient()
            const { data, error } = await supabase.functions.invoke('kameo-payment/config', {
                method: 'GET'
            })
            if (!error && data) {
                setPrice({ amount: data.amount, currency: data.currency })
            }
        }
        fetchPrice()
    }, [])

    const handleSubscription = async (action: 'checkout' | 'portal' | 'recharge') => {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) return

        toast.loading('Redirection vers Stripe...')

        const { data, error } = await supabase.functions.invoke('kameo-payment', {
            body: { action }
        })

        if (error) {
            toast.error('Erreur: ' + error.message)
            return
        }

        if (data?.url) {
            window.location.href = data.url
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profil Professionnel</CardTitle>
                    <CardDescription>Informations visibles par vos clients et utilisées par l&apos;IA.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label htmlFor="business_name" className="text-sm font-medium">Nom de l&apos;entreprise</label>
                        <input
                            type="text"
                            id="business_name"
                            name="business_name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={artisan?.business_name || ''}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="business_type" className="text-sm font-medium">Type d&apos;activité</label>
                        <select
                            id="business_type"
                            name="business_type"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={artisan?.business_type || 'other'}
                        >
                            {BUSINESS_TYPES.map((type) => (
                                <option key={type} value={type.toLowerCase()}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Gérez comment vous souhaitez être alerté des nouveaux leads.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="notify_email"
                            name="notify_email"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked={artisan?.notify_email || false}
                        />
                        <label htmlFor="notify_email" className="text-sm font-medium leading-none">
                            Email
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="notify_sms"
                            name="notify_sms"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked={artisan?.notify_sms || false}
                        />
                        <label htmlFor="notify_sms" className="text-sm font-medium leading-none">
                            SMS
                        </label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tarification</CardTitle>
                    <CardDescription>Utilisé par l&apos;IA pour générer les estimations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="hourly_rate" className="text-sm font-medium">Taux horaire (€)</label>
                        <input
                            type="number"
                            id="hourly_rate"
                            name="hourly_rate"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={artisan?.hourly_rate || 50}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="ghost" type="button" onClick={() => window.location.reload()}>Annuler</Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </CardFooter>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                    <CardTitle className="text-purple-900">Crédits IA ⚡</CardTitle>
                    <CardDescription className="text-purple-700">
                        Vous avez besoin de crédits pour que l'IA réponde aux clients.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl font-bold text-purple-900">{artisan.credits || 0}</p>
                            <p className="text-sm text-purple-600">crédits disponibles</p>
                        </div>
                        <Button type="button" onClick={() => handleSubscription('recharge')} className="bg-purple-600 hover:bg-purple-700 text-white">
                            Recharger (14.99€ / 10 crédits)
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className={artisan.subscription_status === 'active' ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}>
                <CardHeader>
                    <CardTitle className={artisan.subscription_status === 'active' ? "text-green-900" : "text-blue-900"}>
                        {artisan.subscription_status === 'active' ? 'Abonnement Actif ✅' : 'Passez en Pro 🚀'}
                    </CardTitle>
                    <CardDescription className={artisan.subscription_status === 'active' ? "text-green-700" : "text-blue-700"}>
                        {artisan.subscription_status === 'active'
                            ? "Vous profitez de toute la puissance de l'IA."
                            : "Débloquez l'IA illimitée pour seulement 29€/mois."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">
                                {artisan.subscription_status === 'active' ? 'Plan Pro' : 'Plan Gratuit'}
                            </p>
                            <p className="text-sm text-gray-500">
                                {artisan.subscription_status === 'active'
                                    ? 'Renouvellement automatique.'
                                    : 'Aucun engagement.'}
                            </p>
                        </div>
                        {artisan.subscription_status === 'active' ? (
                            <Button variant="outline" type="button" onClick={() => handleSubscription('portal')}>
                                Gérer mon abonnement
                            </Button>
                        ) : (
                            <Button type="button" onClick={() => handleSubscription('checkout')}>
                                S'abonner ({price ? `${price.amount}€/mois` : 'Chargement...'})
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
