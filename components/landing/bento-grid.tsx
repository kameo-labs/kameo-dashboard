
import { Zap, MessageCircle, Wallet, PaintBucket, Lock, Smartphone } from 'lucide-react'

export function BentoGrid() {
    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Tout ce dont vous avez besoin pour grandir.
                    </h2>
                    <p className="text-lg text-slate-600">
                        Kameo n&apos;est pas juste un chatbot. C&apos;est une suite complète d&apos;outils conçue spécifiquement pour les artisans indépendants.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">

                    {/* Card 1: Speed (Large) */}
                    <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Réponse Instantanée</h3>
                                <p className="text-slate-600 max-w-md">
                                    L&apos;IA répond en moins de 3 secondes. Ne laissez plus jamais un client partir chez la concurrence parce que vous ne pouviez pas décrocher.
                                </p>
                            </div>
                            {/* Visual representation of speed */}
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 w-fit mt-auto">
                                <div className="text-2xl font-mono font-bold text-slate-900">0.8s</div>
                                <div className="text-xs text-slate-500 text-right">Temps de réponse<br />moyen</div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Revenue */}
                    <div className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-sm border border-slate-800 hover:shadow-md transition-all">
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white mb-6">
                                    <Wallet className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Zéro Commission</h3>
                                <p className="text-slate-400">
                                    Gardez 100% de vos devis. Nous facturons un abonnement fixe, point final.
                                </p>
                            </div>
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mt-auto">
                                100% <span className="text-sm text-slate-500 font-normal">pour vous</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Chameleon */}
                    <div className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
                                    <PaintBucket className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Effet Caméléon</h3>
                                <p className="text-slate-600">
                                    Le widget détecte automatiquement les couleurs de votre site web pour s&apos;intégrer parfaitement.
                                </p>
                            </div>
                            {/* Color dots */}
                            <div className="flex gap-2 mt-auto">
                                <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
                                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                                <div className="w-6 h-6 rounded-full bg-black border-2 border-white shadow-sm"></div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Integration (Large) */}
                    <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 to-white p-8 shadow-sm border border-indigo-100 hover:shadow-md transition-all">
                        <div className="relative z-10 h-full flex flex-row items-center justify-between gap-8">
                            <div className="max-w-xs">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                                    <Smartphone className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">SMS & Email</h3>
                                <p className="text-slate-600">
                                    Recevez des notifications instantanées. L&apos;IA vous envoie un résumé complet : coordonnées, problème, photos.
                                </p>
                            </div>
                            {/* Fake Notification UI */}
                            <div className="flex-1 bg-white rounded-xl shadow-lg border border-slate-100 p-4 max-w-xs hidden sm:block rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white text-xs font-bold">K</div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900">Nouveau Lead (Urgent)</div>
                                        <div className="text-[10px] text-slate-500">il y a 2 min</div>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded">
                                    "Fuite d'eau, client à 5km..."
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
