
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/admin/data-table'
import { columns } from '@/components/admin/columns'
import { Briefcase, Settings } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

export default async function AdminDashboard() {
    const supabase = await createClient()

    // 1. Check Auth & Admin Status
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return redirect('/admin/login')
    }

    const { data: admin } = await supabase
        .from('kameo_admins')
        .select('*')
        .eq('id', user.id)
        .single()

    // --- ACCESS DENIED (Clean Version) ---
    if (!admin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">🚫</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès Restreint</h1>
                    <p className="text-gray-600 mb-6">
                        Ce compte (<strong>{user.email}</strong>) n&apos;a pas les droits d&apos;administration.
                    </p>
                    <div className="grid gap-4">
                        <Button className="w-full" variant="default" asChild>
                            <a href="mailto:support@kameo.app?subject=Admin%20Access%20Request">Demander un accès</a>
                        </Button>
                        <form action="/auth/signout" method="post">
                            <Button variant="outline" className="w-full">Se déconnecter</Button>
                        </form>
                    </div>
                    <p className="mt-8 text-xs text-gray-400">
                        Si c&apos;est votre première installation, lancez le script de setup dans votre terminal serveur.
                    </p>
                </div>
            </div>
        )
    }

    // 2. Fetch Prospects
    const { data: prospects } = await supabase
        .from('kameo_prospects')
        .select('*')
        .order('created_at', { ascending: false })



    return (
        <div className="p-8 max-w-[1600px] mx-auto">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Kameo Tower 🗼
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">Centre de contrôle des Leads ({prospects?.length || 0})</p>
                </div>
                <div className="flex gap-4 items-center">
                    <ModeToggle />
                    <Button variant="ghost" asChild>
                        <a href="/admin/settings" className="flex items-center gap-2"><Settings className="h-4 w-4" /> Paramètres</a>
                    </Button>
                    <div className="h-6 w-px bg-border"></div>
                    <span className="text-sm font-medium bg-muted px-3 py-1 rounded-full text-muted-foreground">{admin.email}</span>
                    <form action="/auth/signout" method="post">
                        <Button variant="outline" size="sm">Déconnexion</Button>
                    </form>
                </div>
            </header>

            <div className="grid gap-6">
                <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-1">
                    <DataTable columns={columns} data={prospects || []} />
                </div>
            </div>
        </div>
    )
}
