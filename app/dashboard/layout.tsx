import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, MessageSquare, Settings, Shield, Code, LogOut } from 'lucide-react';
import { SignOutButton } from '@/components/sign-out-button';
import { ModeToggle } from '@/components/mode-toggle';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    // --- FIX: Redirect Admins to /admin immediately ---
    const { data: isAdmin } = await supabase
        .from('kameo_admins')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

    if (isAdmin) {
        return redirect('/admin');
    }

    // Fetch the artisan profile
    const { data: artisan, error } = await supabase
        .from('kameo_artisans')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

    if (error || !artisan) {
        return redirect('/onboarding');
    }

    if (!artisan.business_type) {
        return redirect('/onboarding');
    }

    return (
        <div className="flex min-h-screen bg-muted/40 font-sans">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center px-6 border-b">
                    <Shield className="h-6 w-6 text-primary mr-2" />
                    <span className="text-lg font-bold tracking-tight">Kameo</span>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/dashboard/leads">
                        <Button variant="ghost" className="w-full justify-start">
                            <Users className="mr-2 h-4 w-4" />
                            Mes Leads
                        </Button>
                    </Link>
                    <Link href="/dashboard/install">
                        <Button variant="ghost" className="w-full justify-start">
                            <Code className="mr-2 h-4 w-4" />
                            Intégration
                        </Button>
                    </Link>
                    <Link href="/dashboard/settings">
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Paramètres
                        </Button>
                    </Link>
                </nav>
                <div className="mt-auto p-4 border-t">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium">{user.email?.substring(0, 2).toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium truncate w-32">{artisan.business_name || 'Artisan'}</span>
                            <span className="text-xs text-muted-foreground capitalize">{artisan.business_type}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <ModeToggle />
                        <SignOutButton />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-64">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-6 sm:hidden">
                    <span className="font-bold">Kameo Dashboard</span>
                </header>

                <div className="p-4 sm:px-6 sm:py-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
