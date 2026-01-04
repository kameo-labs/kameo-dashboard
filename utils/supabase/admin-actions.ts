
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Adds a new email to the kameo_admins whitelist.
 * This does not create a Supabase Auth user, it just authorizes the email.
 * The user must sign up/login themselves.
 */
export async function inviteAdmin(formData: FormData) {
    const email = formData.get('email') as string

    if (!email || !email.includes('@')) {
        return { error: "Email invalide" }
    }

    const supabase = await createClient()

    // check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Non authentifié" }

    // check if requester is admin
    const { data: requester } = await supabase.from('kameo_admins').select('id').eq('id', user.id).single()
    if (!requester) return { error: "Accès refusé" }

    const { error } = await supabase
        .from('kameo_admins')
        .insert([{ email, created_at: new Date() }])

    if (error) {
        if (error.code === '23505') return { error: "Cet admin existe déjà" }
        return { error: error.message }
    }

    revalidatePath('/admin/settings')
    return { success: true }
}

export async function removeAdmin(formData: FormData) {
    const id = formData.get('id') as string
    const supabase = await createClient()

    // Safety check: Don't let them remove themselves? (Optional)
    const { data: { user } } = await supabase.auth.getUser()
    if (user && user.id === id) {
        // return { error: "Vous ne pouvez pas vous supprimer vous-même." }
    }

    const { error } = await supabase.from('kameo_admins').delete().eq('id', id)
    if (error) return { error: error.message }

    revalidatePath('/admin/settings')
    return { success: true }
}
