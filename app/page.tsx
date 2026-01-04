import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { getURL } from '@/utils/get-url';
import { Hero } from '@/components/landing/hero';
import { BentoGrid } from '@/components/landing/bento-grid';
import { Pricing } from '@/components/landing/pricing';

export default async function LandingPage(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const code = searchParams?.code;

    if (code) {
        // 🚨 SAFETY NET: Forward to canonical URL (localhost) to ensure cookies match!
        const canonicalUrl = `${getURL()}/auth/callback?code=${code}`;
        console.log("🪂 Forwarding auth code to:", canonicalUrl);
        redirect(canonicalUrl);
    }

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // If logged in, redirect to dashboard (or admin if applicable, handled by middleware/layout)
    if (user) {
        redirect('/dashboard');
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans selection:bg-blue-100">
            {/* Navbar */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <Shield className="h-5 w-5" />
                        </div>
                        <span>Kameo</span>
                    </div>
                    <nav className="flex gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">Connexion</Button>
                        </Link>
                        <Link href="/login?mode=signup">
                            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200">Commencer</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                <Hero />
                <BentoGrid />
                <Pricing />

                {/* FAQ / Trust Section (Simple text for now) */}
                <section className="py-24 bg-slate-900 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">Vos questions, nos réponses.</h2>
                        <div className="max-w-3xl mx-auto text-left space-y-6">
                            <div className="pb-6 border-b border-slate-800">
                                <h3 className="font-bold text-lg mb-2">Est-ce que je suis engagé ?</h3>
                                <p className="text-slate-400">Non. Vous pouvez résilier votre abonnement à tout moment depuis votre tableau de bord. L'arrêt est immédiat.</p>
                            </div>
                            <div className="pb-6 border-b border-slate-800">
                                <h3 className="font-bold text-lg mb-2">Comment installer le chat sur mon site ?</h3>
                                <p className="text-slate-400">C'est une simple ligne de code à copier-coller (comme Google Analytics). Si vous ne savez pas faire, notre support le fait pour vous gratuitement.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white border-t border-slate-100 py-12">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4 sm:px-6">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span>Kameo</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        © 2024 Kameo. Fait avec ❤️ pour les artisans.
                    </p>
                    <nav className="flex gap-6">
                        <Link className="text-sm text-slate-500 hover:underline" href="#">Mentions Légales</Link>
                        <Link className="text-sm text-slate-500 hover:underline" href="#">CGV</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}

