# 🧪 Guide de Test Manuel Complet (Kameo V1)

Ce guide vous accompagne pas à pas pour tester l'intégralité du système : du Widget jusqu'à la notification WhatsApp sur votre téléphone.

## 🏁 Prérequis

Ouvrez **3 terminaux** différents :
1.  Pour le Backend (`kameo-backend`).
2.  Pour le Dashboard (`kameo-dashboard`).
3.  Pour le Widget (`kameo-widget`).

---

## Etape 1 : Lancer le "Cerveau" (Backend) 🧠

Dans le terminal **`kameo-backend`** :

1.  Assurez-vous que Supabase tourne :
    ```bash
    npx supabase start
    ```
2.  Lancez la fonction avec les nouvelles clés (Twilio/Resend) :
    ```bash
    npx supabase functions serve kameo-process --no-verify-jwt --env-file .env
    ```
    *Laissez ce terminal tourner. Vous devriez voir "Watching..."*

---

## Etape 2 : Préparer l'Artisan (Dashboard) 👷‍♂️

Dans le terminal **`kameo-dashboard`** :

1.  Lancez le site :
    ```bash
    npm run dev
    ```
2.  Ouvrez [http://localhost:3000/dashboard/settings](http://localhost:3000/dashboard/settings).
3.  **Vérifiez vos infos** :
    *   **Email** : Doit être votre email vérifié sur Resend (ex: celui de votre compte).
    *   **Téléphone** : Doit être **exactement** celui utilisé pour la Sandbox Twilio.
    *   **Crédits** : Vérifiez que vous avez > 0 crédits (ou cliquez sur "Recharger").
4.  **Récupérez votre ID** :
    *   Allez dans l'onglet **"Intégration"** du dashboard.
    *   Copiez la valeur de `data-id` (ex: `e43f...-....`).

---

## Etape 3 : Configurer le Widget 💬

Dans le terminal **`kameo-widget`** :

1.  Ouvrez le fichier `index.html` (à la racine).
2.  Remplacez `TEST_DEV_ID` par votre **VRAI ID** copié à l'étape précédente.
3.  Sauvegardez.
4.  Lancez le widget :
    ```bash
    npm run dev
    ```
5.  Ouvrez le lien qui s'affiche (ex: `http://localhost:5173`).

---

## Etape 4 : Le Scénario de Test 🎬

C'est le moment de vérité ! Sur la page du widget :

1.  **Ouvrez la bulle** en bas à droite.
2.  **Envoyez un message** "flou" :
    *   *"J'ai un problème de fuite d'eau dans ma cuisine."*
3.  **Observez** :
    *   L'IA doit réfléchir ("Analyse...").
    *   Elle doit répondre et afficher la **Carte d'Estimation** (ex: 80€ - 150€).
    *   L'input téléphone doit apparaître.
4.  **Réservez** :
    *   Entrez un numéro (ex: `0612345678`).
    *   Cliquez sur **Réserver**.
    *   Le widget doit confirmer ("Parfait !...").

---

## Etape 5 : Vérification des Résultats ✅

Si tout a fonctionné :

1.  **📱 WhatsApp** : Regardez votre VRAI téléphone. Vous avez reçu un message de la Sandbox Twilio ?
    > "🚀 Nouveau Lead Kameo ! Client: 0612345678..."
2.  **📧 Email** : Regardez votre boîte mail. Vous avez reçu un mail de "Kameo" (via Resend) ?
3.  **💻 Dashboard** : Allez sur [http://localhost:3000/dashboard/leads](http://localhost:3000/dashboard/leads). Le lead doit être listé !

---

### ❌ En cas de problème

*   **"Artisan not found"** : Vous n'avez pas mis le bon ID dans `index.html`.
*   **Pas de WhatsApp** : Vérifiez que le numéro dans `/settings` est bien formaté (ex: `+336...`) et correspond à celui inscrit dans la Sandbox.
*   **Erreur 500 dans le widget** : Regardez le terminal du Backend pour voir l'erreur précise.
