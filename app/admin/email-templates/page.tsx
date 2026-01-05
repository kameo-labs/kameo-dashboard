"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Save, RefreshCw } from "lucide-react"

export default function EmailTemplatesPage() {
    const [template, setTemplate] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        fetchTemplate()
    }, [])

    async function fetchTemplate() {
        setLoading(true)
        const { data, error } = await supabase
            .rpc('get_active_email_template')

        if (data) {
            setTemplate(data)
        } else if (error) {
            console.error("Supabase Error:", error)
            toast.error(`Erreur: ${error.message}`)
            // Force error display
            const debugDiv = document.getElementById('debug-error')
            if (debugDiv) debugDiv.innerText = JSON.stringify(error, null, 2)
        }
        setLoading(false)
    }

    async function saveTemplate() {
        if (!template) return
        setSaving(true)
        const { error } = await supabase
            .from('kameo_email_templates')
            .update({
                subject: template.subject,
                html_content: template.html_content,
                updated_at: new Date().toISOString()
            })
            .eq('id', template.id)

        if (error) {
            toast.error("Erreur sauvegarde")
        } else {
            toast.success("Template sauvegardé !")
        }
        setSaving(false)
    }

    // Mock functionality for Preview
    const getPreviewHtml = () => {
        if (!template) return ""
        let html = template.html_content
        const mocks = {
            '{{business_name}}': 'Plomberie Michel',
            '{{business_type}}': 'Plombier',
            '{{dashboard_url}}': 'https://kameo.app',
            '{{url_encoded}}': 'https%3A%2F%2Fplomberie-michel.fr',
            '{{phone}}': '0123456789',
            '{{screenshot_url}}': 'https://placehold.co/600x400/e2e8f0/64748b?text=Capture+Site+Web'
        }

        Object.entries(mocks).forEach(([key, value]) => {
            html = html.replace(new RegExp(key, 'g'), value)
        })
        return html
    }

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

    if (!template) return (
        <div className="p-8 text-center">
            <p className="text-muted-foreground">Chargement des données...</p>
            <Button variant="outline" onClick={fetchTemplate} className="mt-4">Réessayer</Button>
        </div>
    )

    return (
        <div className="p-6 max-w-[1800px] mx-auto h-[calc(100vh-100px)] flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Éditeur de Template 💌
                </h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={fetchTemplate}><RefreshCw className="mr-2 h-4 w-4" /> Reset</Button>
                    <Button onClick={saveTemplate} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Sauvegarder
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 h-full">
                {/* EDITOR */}
                <Card className="flex flex-col h-full overflow-hidden">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Code HTML</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 flex-1 p-4 h-full">
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-500">Sujet de l'email</label>
                            <Input
                                value={template.subject}
                                onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
                                className="font-mono mt-1"
                            />
                        </div>
                        <div className="flex-1 min-h-0">
                            <Textarea
                                value={template.html_content}
                                onChange={(e) => setTemplate({ ...template, html_content: e.target.value })}
                                className="font-mono text-xs h-full resize-none leading-relaxed"
                                spellCheck={false}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* PREVIEW */}
                <Card className="flex flex-col h-full overflow-hidden bg-gray-100 border-none">
                    <CardHeader className="pb-2 bg-white border-b">
                        <CardTitle className="text-sm font-medium text-gray-500 flex justify-between">
                            <span>Aperçu Live</span>
                            <span className="text-xs font-normal text-gray-400">Données fictives (Plomberie Michel)</span>
                        </CardTitle>
                    </CardHeader>
                    <div className="flex-1 p-4 overflow-hidden h-full">
                        <iframe
                            srcDoc={getPreviewHtml()}
                            className="w-full h-full bg-white rounded shadow-sm border"
                            title="Preview"
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}
