'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface OnboardingProgressProps {
    artisan: {
        hourly_rate: number | null;
        notify_email: boolean | null;
        notify_sms: boolean | null;
    };
    leadsCount: number;
}

export function OnboardingProgress({ artisan, leadsCount }: OnboardingProgressProps) {
    const steps = [
        {
            id: 'account',
            label: 'Compte créé',
            done: true, // Always done if viewing this
            link: null
        },
        {
            id: 'pricing',
            label: 'Définir votre taux horaire',
            done: artisan.hourly_rate !== null && artisan.hourly_rate > 0,
            link: '/dashboard/settings'
        },
        {
            id: 'notifications',
            label: 'Activer les notifications',
            done: artisan.notify_email === true || artisan.notify_sms === true,
            link: '/dashboard/settings'
        },
        {
            id: 'first_lead',
            label: 'Recevoir votre premier lead',
            done: leadsCount > 0,
            link: '/dashboard/install' // Link to install guide as receiving lead implies installing
        }
    ];

    const completedCount = steps.filter(s => s.done).length;
    const progress = Math.round((completedCount / steps.length) * 100);

    if (progress === 100) {
        // Option: hide it, or show a success message.
        // Let's show a collapsed success message.
        return (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 mb-6">
                <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <PartyPopper className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Configuration terminée !</h3>
                            <p className="text-sm text-blue-700">Votre assistant Kameo est pleinement opérationnel.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="mb-6 border-blue-200 shadow-sm relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-blue-50/50 blur-3xl" />

            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Configuration de Kameo</CardTitle>
                    <span className="text-sm font-medium text-muted-foreground">{progress}% complété</span>
                </div>
                <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={cn(
                                "flex flex-col gap-2 p-3 rounded-lg border text-sm transition-colors",
                                step.done ? "bg-green-50/50 border-green-100" : "bg-white border-dashed hover:border-blue-300"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {step.done ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                    <Circle className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className={cn(
                                    "font-medium",
                                    step.done ? "text-green-900" : "text-muted-foreground"
                                )}>
                                    {step.label}
                                </span>
                            </div>
                            {!step.done && step.link && (
                                <Button variant="link" className="h-auto p-0 text-xs text-blue-600 justify-start pl-6" asChild>
                                    <Link href={step.link}>
                                        Configurer &rarr;
                                    </Link>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
