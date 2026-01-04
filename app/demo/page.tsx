import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { Phone, CheckCircle, Clock, MapPin } from 'lucide-react'

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* --- HEADER --- */}
            <header className="bg-slate-900 text-white py-4 shadow-lg sticky top-0 z-40">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-2xl">
                            P
                        </div>
                        <span className="text-xl font-bold tracking-tight">PLOMBIER <span className="text-amber-500">EXPRESS</span></span>
                    </div>
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                        <a href="#" className="hover:text-amber-500 transition">Accueil</a>
                        <a href="#" className="hover:text-amber-500 transition">Services</a>
                        <a href="#" className="hover:text-amber-500 transition">Urgence</a>
                        <a href="#" className="hover:text-amber-500 transition">Contact</a>
                    </nav>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
                        <Phone className="w-4 h-4 mr-2" />
                        01 23 45 67 89
                    </Button>
                </div>
            </header>

            {/* --- HERO --- */}
            <section className="relative py-20 lg:py-32 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-6 border border-amber-500/20">
                            <Clock className="w-4 h-4" />
                            Intervention en 30 minutes
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            Urgence Plomberie <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">7j/7 et 24h/24</span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-8 max-w-lg">
                            Fuite d&apos;eau, évier bouché ou panne de chauffe-eau ?
                            Nos artisans certifiés interviennent chez vous en un temps record. Devis gratuit et sans surprise.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold h-12 px-8">
                                Demander un Devis
                            </Button>
                            <Button size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800 text-white h-12 px-8">
                                Voir nos Tarifs
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES --- */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Devis Transparent</h3>
                            <p className="text-slate-500">Prix annoncés à l&apos;avance. Aucune mauvaise surprise sur la facture finale.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Rapidité</h3>
                            <p className="text-slate-500">Une équipe disponible jour et nuit pour régler vos soucis d&apos;urgence.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Artisans Locaux</h3>
                            <p className="text-slate-500">Nous travaillons uniquement avec des experts certifiés de votre région.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WIDGET INJECTION --- */}
            {/*
                IMPORTANT :
                1. Remplacez DATA-ID par l'ID réel d'un artisan pour que ça marche.
                2. Le script est chargé depuis /kameo.js (hosté par Vercel).
            */}
            <Script
                src="/kameo.js"
                strategy="lazyOnload"
                // On utilise un attribut data personnalisé que notre script lit
                // Note : En React, les custom attributes doivent être passés via spread ou ref si TypeScript râle,
                // mais Next/Script gère bien les props pass-through.
                {...{
                    "data-id": "REPLACE_WITH_REAL_ARTISAN_ID", // TODO: User must set this
                    "proxy-url": process.env.NEXT_PUBLIC_SUPABASE_URL + "/functions/v1"
                }}
            />

            {/* Fallback manuel si Next/Script ne passe pas les data attributes correctement */}
            <kameo-widget
                data-id="REPLACE_WITH_REAL_ARTISAN_ID"
                proxy-url={process.env.NEXT_PUBLIC_SUPABASE_URL + "/functions/v1"}
            ></kameo-widget>

        </div>
    )
}

// Declaration pour TypeScript (si besoin)
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'kameo-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'data-id'?: string;
                'proxy-url'?: string;
            };
        }
    }
}
