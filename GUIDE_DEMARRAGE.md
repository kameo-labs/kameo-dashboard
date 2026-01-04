# 🚀 KAMEO - Guide de Démarrage Complet

Félicitations ! Le projet Kameo est fonctionnel. Ce guide vous explique comment lancer tous les composants et tester le flux de A à Z par vous-même.

## 1. Vue d'Ensemble

Le projet est composé de 3 parties :
1.  **Backend (`kameo-backend`)** : Base de données Supabase, Auth, et l'IA (Edge Functions).
2.  **Dashboard (`kameo-dashboard`)** : L'interface pour les artisans (Next.js).
3.  **Widget (`kameo-widget`)** : La bulle de chat à installer sur les sites clients.

---

## 2. Lancer le Backend (Supabase)

C'est le cœur du système. Il doit tourner pour que tout fonctionne.

1.  Ouvrez un terminal dans `kameo-backend`.
2.  Lancez Supabase (Docker doit être démarré) :
    ```bash
    npx supabase start
    ```
3.  Lancez la Fonction "Cerveau" (IA) :
    ```bash
    npx supabase functions serve kameo-process --no-verify-jwt --env-file .env
    ```
    *(Gardez ce terminal ouvert, c'est lui qui écoute les messages du widget)*.

*Note : Vos emails envoyés par l'IA arriveront sur [http://127.0.0.1:54324](http://127.0.0.1:54324) (Mailpit).*

---

## 3. Lancer le Dashboard (Interface Utilisateur)

C'est là que vous allez créer votre compte et voir vos leads.

1.  Ouvrez un **nouveau terminal** dans `kameo-dashboard`.
2.  Lancez le serveur de développement :
    ```bash
    npm run dev
    ```
3.  Ouvrez votre navigateur sur **[http://localhost:3000](http://localhost:3000)**.

---

## 4. Test Complet (Scénario "Alice")

Voici comment tester comme un vrai utilisateur :

### Étape A : Inscription (Connexion par Lien Magique)
1.  Allez sur [http://localhost:3000](http://localhost:3000).
2.  Cliquez sur **"Commencer gratuitement"**.
3.  Entrez votre email (ex: `moi@test.com`) et validez.
4.  **Important** : Comme nous sommes en local, l'email de connexion n'est pas envoyé sur Gmail, mais dans votre boîte locale.
5.  Ouvrez un nouvel onglet sur **[http://127.0.0.1:54324](http://127.0.0.1:54324)** (Mailpit).
6.  Ouvrez le mail "Magic Link" et cliquez sur le lien.
7.  Vous êtes redirigé vers l'Onboarding. Remplissez :
    - Nom : "Mon Entreprise"
    - Métier : "Plombier"
    - Cliquez sur "Commencer".

### Étape B : Configuration (Dashboard)
Vous êtes sur le Dashboard.
1.  Regardez la carte **"Configuration de Kameo"**. Elle doit être à 25% (Compte créé).
2.  Cliquez sur **"Définir votre taux horaire"**.
3.  Mettez `50` €/h. Cochez **Email**. Enregistrez.
4.  La barre de progression doit avancer.

### Étape C : Simuler un Client (Le Test Ultime)
Pour tester que l'IA vous répond et vous notifie, on va simuler un message venant d'un site client.

1.  Ouvrez un **3ème terminal**.
2.  Il nous faut votre `ID` utilisateur. Le plus simple est de le copier depuis l'URL de la page **Intégration** sur le Dashboard, OU d'utiliser le script de test rapide qui utilise votre ID connecté (si on avait fait un script UI, mais ici on va utiliser CURL).
    
    *Astuce :* Dans le Dashboard, allez dans **Intégration**. Copiez la ligne `data-id="XXXXXXXX-XXXX-..."`. C'est votre ID.

3.  Envoyez une requête (remplacez `VOTRE_ID` ci-dessous) :
    ```bash
    curl -X POST http://127.0.0.1:54321/functions/v1/kameo-process \
      -H "Content-Type: application/json" \
      -d '{"message": "Bonjour, j ai une fuite urgente, mon tel est 0612345678", "artisan_id": "51d0fbfd-0ae3-417e-885a-e0afb70f97d8"}'
    ```

### Étape D : Vérification
1.  **CURL** : Vous devez voir la réponse JSON de l'IA ("Bonjour, je peux vous aider...").
2.  **Email** : Allez sur [http://127.0.0.1:54324](http://127.0.0.1:54324). Vous devez voir un email "🚀 Nouveau Lead Qualifié !".
3.  **Dashboard** : Rafraîchissez la page **Mes Leads**. Le prospect doit apparaître ! 🎉, et la barre de progression doit être à 100%.

---

## 5. Tester avec le Widget Visuel (Optionnel)

Si vous voulez voir la "bulle" de chat :
1.  Allez dans le dossier `kameo-widget`.
2.  Ouvrez le fichier `test-local.html` dans votre navigateur (Double-clic).
3.  (Il faudra peut-être éditer ce fichier pour y mettre votre ID si vous voulez tester avec votre compte, par défaut il a un ID de test).

**C'est tout ! Vous avez les clés du camion. 🚛**

---

## 6. Passage en Production (Emails)

Par défaut, les emails restent en local (Mailpit).
Pour envoyer de VRAIS emails (via **Resend**) :

1.  Créez un compte sur [Resend.com](https://resend.com) et obtenez une clé API.
2.  Ajoutez cette clé dans le fichier `.env` du backend :
    ```env
    RESEND_API_KEY=re_123456...
    ```
3.  Redémarrez la fonction Supabase :
    ```bash
    npx supabase functions serve kameo-process --no-verify-jwt --env-file .env
    ```
    
Désormais, Kameo enverra de vrais mails ! 📧
