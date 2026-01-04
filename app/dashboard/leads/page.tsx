import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

export default async function LeadsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: leads } = await supabase
        .from('kameo_leads')
        .select('*')
        .eq('artisan_id', user.id)
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold tracking-tight">Mes Leads</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historique des Conversations</CardTitle>
                    <CardDescription>
                        Tous les prospects qui ont interagi avec votre assistant Kameo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Statut</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Téléphone</TableHead>
                                <TableHead>Résumé IA</TableHead>
                                <TableHead>Estimation Donnée</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads && leads.length > 0 ? (
                                leads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell>
                                            {lead.customer_phone ? (
                                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                    Qualifié
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                                                    <AlertCircle className="h-3 w-3 mr-1" />
                                                    Incomplet
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {new Date(lead.created_at).toLocaleDateString()} {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {lead.status === 'locked' ? (
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className="font-mono text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                                                        {lead.customer_phone.substring(0, 4)} ** ** **
                                                    </span>
                                                    <Badge variant="destructive" className="text-[10px] h-4">🔒 Verrouillé</Badge>
                                                </div>
                                            ) : lead.customer_phone ? (
                                                <a href={`tel:${lead.customer_phone}`} className="flex items-center hover:text-blue-600">
                                                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    {lead.customer_phone}
                                                </a>
                                            ) : (
                                                <span className="text-muted-foreground italic">Non renseigné</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-md truncate" title={lead.ai_summary}>
                                            {lead.ai_summary}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono">
                                                {lead.ai_price_range || '-'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                        Aucun lead trouvé. Installez le widget pour commencer !
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
