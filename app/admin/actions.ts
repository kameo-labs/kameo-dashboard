"use server"

import { createClient } from "@/utils/supabase/server"
import { Resend } from "resend"

// const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOutreachEmails(prospectIds: string[]) {
  if (!prospectIds || prospectIds.length === 0) return { success: false, message: "Aucun prospect sélectionné" }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY missing")
    return { success: false, message: "Configuration email manquante (API Key)" }
  }
  const resend = new Resend(apiKey)

  const supabase = await createClient()

  // 1. Fetch Prospects
  const { data: prospects, error } = await supabase
    .from("kameo_prospects")
    .select("*")
    .in("id", prospectIds)

  if (error || !prospects) {
    console.error("Error fetching prospects", error)
    return { success: false, message: "Erreur lors de la récupération des prospects" }
  }

  let successCount = 0
  let failureCount = 0

  // 2. Loop & Send
  for (const prospect of prospects) {
    if (!prospect.email) {
      failureCount++
      continue
    }

    try {
      await resend.emails.send({
        from: "Kameo <onboarding@resend.dev>", // Or your verified domain
        to: prospect.email,
        subject: `Une opportunité pour ${prospect.business_name} ? 🦎`,
        html: generateEmailTemplate(prospect)
      })

      // 3. Update Status
      await supabase
        .from("kameo_prospects")
        .update({ hunt_status: "contacted", contacted_at: new Date().toISOString() })
        .eq("id", prospect.id)

      successCount++
    } catch (err) {
      console.error(`Failed to send email to ${prospect.email}`, err)
      failureCount++
    }
  }

  return {
    success: true,
    message: `${successCount} emails envoyés avec succès (${failureCount} échecs).`
  }
}

export async function updateProspectStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("kameo_prospects")
    .update({ hunt_status: status })
    .eq("id", id)

  if (error) return { success: false, message: error.message }

  // Revalidate via refresh (handled by client usually, or revalidatePath if on page)
  return { success: true }
}

export async function deleteProspects(ids: string[]) {
  if (!ids || ids.length === 0) return { success: false, message: "Aucun prospect sélectionné" }
  const supabase = await createClient()
  const { error } = await supabase
    .from("kameo_prospects")
    .delete()
    .in("id", ids)

  if (error) return { success: false, message: error.message }
  return { success: true, message: `${ids.length} prospects supprimés` }
}

export async function bulkUpdateStatus(ids: string[], status: string) {
  if (!ids || ids.length === 0) return { success: false, message: "Aucun prospect sélectionné" }
  const supabase = await createClient()
  const { error } = await supabase
    .from("kameo_prospects")
    .update({ hunt_status: status })
    .in("id", ids)

  if (error) return { success: false, message: error.message }
  return { success: true, message: `${ids.length} statuts mis à jour` }
}

function generateEmailTemplate(prospect: any) {
  const screenshotUrl = prospect.demo_screenshot_url || "https://placehold.co/600x400/e2e8f0/64748b?text=Votre+Site+Web"
  const dashboardUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kameo.app" // Adjust for Production

  // PROFESSIONAL & CLEAN TEMPLATE
  // Note: Inline CSS is required for emails.
  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f9; color: #333; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); padding: 30px; text-align: center; color: white; }
  .logo { font-size: 24px; font-weight: bold; letter-spacing: -0.5px; display: inline-flex; align-items: center; gap: 8px; }
  .title { margin-top: 10px; font-size: 18px; opacity: 0.9; font-weight: 300; }
  .content { padding: 40px 30px; line-height: 1.6; font-size: 16px; color: #4b5563; }
  .highlight { font-weight: 600; color: #111827; }
  .image-wrapper { margin: 25px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
  .screenshot { width: 100%; display: block; height: auto; }
  .cta-section { text-align: center; margin-top: 35px; margin-bottom: 20px; }
  .button { background-color: #2563eb; color: #ffffff !important; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; transition: background 0.2s; }
  .footer { padding: 30px; text-align: center; font-size: 12px; color: #9ca3af; background-color: #f9fafb; border-top: 1px solid #e5e7eb; }
  .unsubscribe { color: #9ca3af; text-decoration: underline; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🦎 Kameo</div>
      <div class="title">L'Intelligence Artificielle pour les Artisans</div>
    </div>
    <div class="content">
      <p>Bonjour <span class="highlight">${prospect.business_name || 'Artisan'}</span>,</p>
      
      <p>Imaginez un assistant qui répond au téléphone et aux messages pour vous, 24h/24 et 7j/7, qualifie vos clients et prend vos rendez-vous pendant que vous êtes sur chantier.</p>
      
      <p>Nous avons créé une simulation sur votre site web pour vous montrer la puissance de Kameo :</p>

      <div class="image-wrapper">
        <a href="${dashboardUrl}/demo?url=${encodeURIComponent(prospect.url || '')}&phone=${prospect.phone || ''}">
            <img src="${screenshotUrl}" alt="Votre Site avec Kameo" class="screenshot" />
        </a>
      </div>

      <p>Votre assistant virtuel <strong>${prospect.business_type || 'Kameo'}</strong> est déjà prêt. Il peut :</p>
      <ul style="padding-left: 20px; margin-bottom: 30px;">
        <li>Répondre instantanément à vos visiteurs.</li>
        <li>Filtrer les curieux et qualifier les vrais chantiers.</li>
        <li>Estimer le prix des interventions standards.</li>
      </ul>

      <div class="cta-section">
        <a href="${dashboardUrl}/onboarding" class="button">Activer mon Assistant</a>
      </div>
      
      <p style="text-align: center; font-size: 14px; margin-top: 30px;">
        Essayez-le gratuitement pendant 7 jours. Sans engagement.
      </p>
    </div>
    
    <div class="footer">
      <p>© 2024 Kameo. Tous droits réservés.</p>
      <p>123 Avenue de l'Innovation, Paris, France.</p>
      <p><a href="#" class="unsubscribe">Se désinscrire</a></p>
    </div>
  </div>
</body>
</html>
    `
}
