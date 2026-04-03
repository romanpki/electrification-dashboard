# Donnees du tableau de bord electrification

## Sources

Les donnees utilisees dans ce tableau de bord proviennent principalement des sources suivantes :

- **SDES** (Service des donnees et etudes statistiques) - Bilan energetique de la France, edition 2023 (donnees 2022)
- **RTE** - Bilan electrique annuel
- **ADEME** - Chiffres cles de l'energie
- **Eurostat** - Bilans energetiques

## Structure des fichiers

```
data/
  raw/            # Donnees brutes telechargees (non versionnees si volumineuses)
  processed/      # Donnees transformees, pretes a l'emploi
    sectors.json        # 5 secteurs avec consommation totale et part electrique
    subsectors.json     # Sous-secteurs avec mix energetique detaille
    sankey.json         # Donnees pre-calculees pour le diagramme de Sankey
    timeseries.json     # Evolution du taux d'electrification 2015-2023
```

## Unites

| Unite | Description |
|-------|-------------|
| TWh   | Terawattheure - unite principale utilisee dans les fichiers |
| Mtep  | Million de tonnes equivalent petrole |
| %     | Pourcentages (0-100) |

**Conversion** : 1 Mtep = 11,63 TWh

## Annee de reference

Les donnees sectorielles correspondent a l'annee **2022** (derniere annee disponible au moment de la creation).

Les series temporelles couvrent la periode **2015 - 2023**.

## Mise a jour des donnees

Pour mettre a jour les donnees :

1. Telecharger les nouvelles donnees depuis le SDES : https://www.statistiques.developpement-durable.gouv.fr/
2. Placer les fichiers bruts dans `data/raw/`
3. Mettre a jour les fichiers JSON dans `data/processed/` en respectant les schemas TypeScript definis dans `src/lib/types.ts`
4. Verifier la coherence : la somme des sous-secteurs doit correspondre au total du secteur, et la somme des secteurs doit approcher le total national (~1557 TWh)

## Identifiants

Les identifiants (`id`) sont en minuscules, sans accents, avec underscores. Ils sont coherents entre tous les fichiers JSON :

**Secteurs** : `residentiel`, `tertiaire`, `industrie`, `transports`, `agriculture`

**Types d'energie** : `electricite`, `gaz_naturel`, `produits_petroliers`, `energies_renouvelables`, `charbon`, `chaleur_reseaux`, `autres`
