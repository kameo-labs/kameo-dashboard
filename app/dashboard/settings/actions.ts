'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateSettings(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const hourly_rate = formData.get('hourly_rate')
    const notify_email = formData.get('notify_email') === 'on'
    const notify_sms = formData.get('notify_sms') === 'on'
    const business_name = formData.get('business_name')
    const business_type = formData.get('business_type')

    const { error } = await supabase
        .from('kameo_artisans')
        .update({
            hourly_rate: Number(hourly_rate),
            notify_email,
            notify_sms,
            business_name: String(business_name),
            business_type: String(business_type),
        })
        .eq('id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/settings')
    return { success: true }
}
