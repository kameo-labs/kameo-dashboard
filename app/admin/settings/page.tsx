
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { inviteAdmin, removeAdmin } from '@/utils/supabase/admin-actions'

export default async function AdminSettings() {
    const supabase = await createClient()

    // 1. Check Auth & Admin Status
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return redirect('/admin/login')

    const { data: admin } = await supabase
        .from('kameo_admins')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!admin) return redirect('/admin')

    // 2. Fetch All Admins
    const { data: admins } = await supabase
        .from('kameo_admins')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="p-8 max-w-[1000px] mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Paramètres Admin ⚙️</h1>
                <Button variant="outline" asChild><a href="/admin">Retour Dashboard</a></Button>
            </header>

            <div className="grid gap-8">
                {/* INVITE FORM */}
                <Card>
                    <CardHeader>
                        <CardTitle>Inviter un Administrateur</CardTitle>
                        <CardDescription>Ajoutez un membre à l&apos;équipe Kameo. Il pourra se connecter immédiatement via Email.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardContent>
                            <form action={async (formData) => {
                                'use server'
                                await inviteAdmin(formData)
                            }} className="flex gap-4">
                                <Input name="email" type="email" placeholder="nouveau@kameo.app" required className="max-w-md" />
                                <Button type="submit">Envoyer l&apos;Invitation</Button>
                            </form>
                        </CardContent>
                </Card>

                {/* ADMIN LIST */}
                <Card>
                    <CardHeader>
                        <CardTitle>Membres de l&apos;équipe ({admins?.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {admins?.map((a) => (
                                <div key={a.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                                    <div>
                                        <div className="font-medium">{a.email || "En attente d'inscription..."}</div>
                                        <div className="text-xs text-gray-400">Ajouté le {new Date(a.created_at).toLocaleDateString()}</div>
                                    </div>
                                    {a.id !== user.id && (
                                        <form action={async (formData) => {
                                            'use server'
                                            await removeAdmin(formData)
                                        }}>
                                            <input type="hidden" name="id" value={a.id} />
                                            <Button variant="destructive" size="sm">Révoquer</Button>
                                        </form>
                                    )}
                                    {a.id === user.id && (
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">C&apos;est vous</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
