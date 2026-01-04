import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, MessageSquare, Phone, Star } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-32 lg:pt-24 lg:pb-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 max-w-2xl lg:text-left text-center">
                        <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
                            L&apos;IA pour les artisans du bâtiment
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
                            Votre secrétariat <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                intelligent & 24/7.
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Kameo répond au téléphone, qualifie vos chantiers sur votre site web et remplit votre agenda.
                            Ne ratez plus jamais un client pendant que vous êtes sur l&apos;échelle.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/login?mode=signup">
                                <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200">
                                    Essayer gratuitement
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>Installation en 2 min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>Sans engagement</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Mockup - Chat Interface */}
                    <div className="flex-1 w-full max-w-[500px] lg:max-w-none relative">
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-gradient-to-br from-indigo-100 to-purple-50 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-gradient-to-tr from-purple-100 to-pink-50 rounded-full blur-3xl opacity-50"></div>

                        <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                            {/* Browser Window Header */}
                            <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="ml-4 flex-1 bg-white h-6 rounded-md border border-slate-200 text-[10px] flex items-center px-2 text-slate-400 font-mono">
                                    kameo.app/demo
                                </div>
                            </div>

                            {/* Chat Content */}
                            <div className="p-6 space-y-6 bg-slate-50/50 min-h-[400px]">
                                {/* Message 1 (AI) */}
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%]">
                                        <p className="text-sm text-slate-700 leading-relaxed">Bonjour ! Je suis l&apos;assistant de <strong>Plomberie Martin</strong>. Comment puis-je vous aider aujourd&apos;hui ?</p>
                                    </div>
                                </div>

                                {/* Message 2 (User) */}
                                <div className="flex gap-4 flex-row-reverse">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                                        U
                                    </div>
                                    <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none shadow-md max-w-[85%]">
                                        <p className="text-sm text-white">J&apos;ai une fuite d&apos;eau urgente sous mon évier.</p>
                                    </div>
                                </div>

                                {/* Message 3 (AI) */}
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[90%] space-y-4">
                                        <p className="text-sm text-slate-700">Je comprends l&apos;urgence. Pour vous donner une estimation :</p>

                                        <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-100">
                                            <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                                                </div>
                                                Intervention: Fuite Standard
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                                                <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                                    <Star className="h-3 w-3 text-yellow-600 fill-yellow-600" />
                                                </div>
                                                Estimation: 80€ - 120€
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <div className="flex gap-2">
                                                <input
                                                    type="tel"
                                                    placeholder="06 12 34 56 78"
                                                    className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 h-10 px-4 shrink-0 transition-all font-medium">
                                                    <Phone className="h-4 w-4 mr-2" /> Réserver
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce duration-[3000ms]">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">+200 Artisans</div>
                                <div className="text-xs text-slate-500">nous font confiance</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
