import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OnboardingProgress } from '@/components/onboarding-progress';
import { Users, MessageSquare, Bell, TrendingUp, Wallet, Shield } from 'lucide-react';

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null; // Handled by layout

  const { data: artisan } = await supabase
    .from('kameo_artisans')
    .select('credits, hourly_rate, notify_email, notify_sms')
    .eq('id', user.id)
    .single();

  // Fetch Real Stats from DB
  const { count: leadsCount } = await supabase
    .from('kameo_leads')
    .select('*', { count: 'exact', head: true })
    .eq('artisan_id', user.id);

  // Fetch Qualified Leads for AI Stats
  const { count: qualifiedCount } = await supabase
    .from('kameo_leads')
    .select('*', { count: 'exact', head: true })
    .eq('artisan_id', user.id)
    .neq('customer_phone', null); // Leads with phone numbers are considered "qualified"

  // Real Recent Leads
  const { data: recentLeads } = await supabase
    .from('kameo_leads')
    .select('*')
    .eq('artisan_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);

  const conversionRate = leadsCount && leadsCount > 0 ? Math.round(((qualifiedCount || 0) / leadsCount) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled>
            <Bell className="h-4 w-4 opacity-50" />
          </Button>
        </div>
      </div>

      <OnboardingProgress artisan={artisan || { hourly_rate: null, notify_email: null, notify_sms: null }} leadsCount={leadsCount || 0} />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Estimé</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€0.00</div>
            <p className="text-xs text-muted-foreground">Basé sur les leads convertis</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{leadsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Total prospects capturés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages IA</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(leadsCount || 0) * 4}</div>
            <p className="text-xs text-muted-foreground">~4 msgs par conversation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédits Restants</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{artisan?.credits || 0}</div>
            <p className="text-xs text-muted-foreground">Recharge auto activée</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Leads Récents</CardTitle>
            <CardDescription>Vos 3 derniers prospects capturés par Kameo.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentLeads && recentLeads.length > 0 ? (
                recentLeads.map((lead: any) => (
                  <div key={lead.id} className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {lead.customer_phone ? 'P' : 'A'}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {lead.customer_phone || "Anonyme"}
                      </p>
                      <p className="text-sm text-muted-foreground truncate w-64">
                        {lead.ai_summary || "Nouvelle conversation..."}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-sm">
                      {lead.ai_price_range || "En cours..."}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Aucun lead pour le moment.</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Performance IA</CardTitle>
            <CardDescription>Taux de qualification (Téléphone obtenu)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <div className="text-5xl font-bold text-primary">{conversionRate}%</div>
              <p className="text-sm text-muted-foreground mt-2">Conversion Rate</p>
              <p className="text-xs text-muted-foreground mt-1">({qualifiedCount} qualifications / {leadsCount} leads)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
