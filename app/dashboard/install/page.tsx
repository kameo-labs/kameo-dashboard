import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default async function Install() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null; // Layout handles redirect

    const scriptCode = `<script src="https://kameo-widget-gtpzb6eq0-aghiles.vercel.app/kameo.js" data-id="${user.id}"></script>`

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold tracking-tight">Installation</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Widget Script</CardTitle>
                    <CardDescription>
                        Copiez le code ci-dessous et collez-le dans le fichier <code>index.html</code> de votre site web,
                        juste avant la balise fermante <code>&lt;/body&gt;</code>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative rounded-md bg-slate-950 p-4">
                        <code className="block overflow-x-auto text-sm text-blue-300 font-mono">
                            {scriptCode}
                        </code>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
