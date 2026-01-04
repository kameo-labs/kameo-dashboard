import { createClient } from '@/utils/supabase/server'
import { SettingsForm } from './settings-form'

export default async function Settings() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null;

    // Fetch current settings
    const { data: artisan } = await supabase
        .from('kameo_artisans')
        .select('hourly_rate, notify_email, notify_sms, business_name, business_type, subscription_status, credits')
        .eq('id', user.id)
        .single()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
            </div>

            <SettingsForm artisan={artisan || {
                hourly_rate: 50,
                notify_email: false,
                notify_sms: false,
                business_name: '',
                business_type: 'other',
                subscription_status: 'none',
                credits: 0
            }} />
        </div>
    )
}
