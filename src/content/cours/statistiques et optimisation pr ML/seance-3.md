---
module: 1
seance: 3
titre: "Statistiques et Optimisation pour Machine Learning - Séance 3"
description: "Notes de cours sur les probabilités, les variables aléatoires, l'échantillonnage et l'estimation (Maximum de vraisemblance, Intervalles de confiance)."
duree: "2h"
niveau: "fondamental"
date: 2026-03-25
outils: []
draft: false
---

# Statistiques et Optimisation pour Machine Learning
**Zouhir ERRAJI**

## Objectifs du module
- Comprendre les bases probabilistes du Machine Learning
- Maîtriser les modèles statistiques fondamentaux
- Comprendre l'optimisation des fonctions de coût

---

## 1. Probabilités Fondamentales

### Expérience aléatoire
**Définition** : Une expérience aléatoire est une expérience dont on connaît les résultats possibles, mais dont on ne peut pas prévoir le résultat exact à l'avance.
**Exemples** : Lancer une pièce, lancer un dé, mesurer la température demain, prédire si un email est un spam.

### Espace des résultats
On note $\Omega$ l'ensemble des résultats possibles.
- Pièce : $\Omega = \{\text{Pile}, \text{Face}\}$
- Dé : $\Omega  =\{1, 2, 3, 4, 5, 6\}$
- Email : $\Omega = \{\text{Spam}, \text{Non Spam}\}$

### Espace probabilisé
Un espace probabilisé est un triplet $(\Omega, \mathcal{F}, P)$, où :
- $\Omega$ : ensemble des issues (univers des possibles)
- $\mathcal{F}$ : ensemble des événements
- $P$ : mesure de probabilité

### Les événements
Un événement est un sous-ensemble de $\Omega$.
- *Exemple (dé)* : $A = \{2, 4, 6\}$, événement "obtenir un nombre pair".

### Propriétés de la probabilité
La probabilité est une fonction $P: \mathcal{F} \rightarrow [0, 1]$ qui vérifie :
1. $P(A) \ge 0$
2. $P(\Omega) = 1$
3. Si $A \cap B = \emptyset$, alors $P(A \cup B) = P(A) + P(B)$

### Probabilité conditionnelle
**Définition** : Si $P(B) > 0$, alors $P(A | B) = \frac{P(A \cap B)}{P(B)}$
$P(A|B)$ est la probabilité de $A$ sachant que $B$ est (sera) réalisé. On restreint l'univers à $B$. L'intersection s'exprime par : $P(A \cap B) = P(A|B)P(B)$.

*Exemple (dé équilibré)* :
$A$ : "nombre pair" = $\{2, 4, 6\}$ ; $B$ : "nombre > 3" = $\{4, 5, 6\}$
$P(A|B) = \frac{2}{3}$

### Indépendance
Deux événements $A$ et $B$ sont indépendants si $P(A \cap B) = P(A)P(B)$.
Équivalent à $P(A|B) = P(A)$.
L'information sur $B$ ne change rien sur $A$.

*Exemple d'indépendance* : Deux lancers de pièce.
$A$ : premier lancer = Pile, $B$ : deuxième lancer = Pile.
$P(A \cap B) = \frac{1}{4}$
$P(A)P(B) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$. Donc indépendants.

### Probabilité composée
La probabilité composée exprime la probabilité de l'intersection de deux événements $A$ et $B$ :
$P(A \cap B) = P(A) \cdot P(B|A) = P(B) \cdot P(A|B)$

Généralisation :
$P(A_1 \cap \dots \cap A_n) = P(A_1) \prod_{i=2}^n P(A_i | A_1, \dots, A_{i-1})$

### Théorème des probabilités totales
Soit $\{C_1, C_2, \dots, C_n\}$ une partition de l'univers $\Omega$.
Alors, pour tout événement $A$ :
$P(A) = \sum_{i=1}^n P(A \cap C_i) = \sum_{i=1}^n P(A | C_i) P(C_i)$

### Théorème de Bayes
$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$
Où $P(A)$ est la probabilité a priori, $P(A|B)$ est la probabilité a posteriori, et $P(B)$ la constante de normalisation.

*(Exemple : Test médical sensible à 90% pour une maladie touchant 1% de la population ; calcul de $P(M|+)$)*.

### Application en Machine Learning : Naive Bayes
Cas discret général (pour une partition $C_1, \dots, C_K$) :
$$P(C_k | X) = \frac{P(X|C_k)P(C_k)}{\sum_{j=1}^K P(X|C_j)P(C_j)}$$
Règle de décision : $\hat{y} = \arg\max_k P(X|C_k)P(C_k)$

**Hypothèse d'indépendance conditionnelle (Naive Bayes)** :
Pour $X = (X_1, \dots, X_d)$, on suppose :
$$P(X|C_k) = \prod_{i=1}^d P(X_i | C_k)$$

Types de Naive Bayes :
- *Bernoulli NB* : variables binaires
- *Multinomial NB* : texte (fréquences de mots)
- *Gaussian NB* : variables continues, avec $P(X_j | Y=y) = \frac{1}{\sqrt{2\pi\sigma_y^2}} \exp\left(-\frac{(x_j - m_y)^2}{2\sigma_y^2}\right)$

---

## 2. Variables Aléatoires

**Définition** : Une variable aléatoire $X$ est une application $X: \Omega \rightarrow \mathbb{R}$ qui associe à chaque issue $\omega \in \Omega$ un nombre réel.

### Variables discrètes
$X$ est discrète si elle prend un nombre fini ou dénombrable de valeurs $X(\Omega) = \{x_1, x_2, \dots \}$.
Loi de probabilité : $P(X = x_i)$ avec $\sum_i P(X = x_i) = 1$.

### Variables continues
$X$ est continue si elle admet une densité de probabilité $f: \mathbb{R} \rightarrow \mathbb{R}$ vérifiant :
1. $f(x) \ge 0 \quad \forall x \in \mathbb{R}$
2. $\int_{-\infty}^{+\infty} f(x) dx = 1$
3. $P(a \le X \le b) = \int_a^b f(x) dx$

### Espérance et Variance
- **Espérance (moyenne théorique)** : 
  - Cas discret : $E[X] = \sum_i x_i P(X = x_i)$
  - Cas continu : $E[X] = \int_{-\infty}^{+\infty} x f(x) dx$
  - Linéarité : $E[aX + bY] = aE[X] + bE[Y]$
- **Variance (dispersion autour de la moyenne)** :
  - $Var(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$
  - $Var(aX+b) = a^2 Var(X)$
- **Écart-type** : $\sigma_X = \sqrt{Var(X)}$

### Covariance et Corrélation
- **Covariance** : $Cov(X, Y) = E[(X - E[X])(Y - E[Y])]$
- **Corrélation** : $\rho(X, Y) = \frac{Cov(X, Y)}{\sigma_X \sigma_Y}$ (mesure la relation linéaire, $\rho \in [-1, 1]$).
Très utilisé en ML pour la sélection de variables (feature selection) et la réduction de dimension (PCA).

---

## 3. Lois Classiques

### Loi de Bernoulli $B(p)$
Variable binaire $X \in \{0, 1\}$ avec $P(X=1) = p$ et $P(X=0) = 1-p$.
$E[X] = p$, $Var(X) = p(1-p)$. (Utilisé en classification binaire / régression logistique).

### Loi Binomiale $B(n, p)$
Nombre de succès dans une série de $n$ expériences de Bernoulli indépendantes.
$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$
$E[X] = np$, $Var(X) = np(1-p)$.

### Loi Normale (Gaussienne) $\mathcal{N}(\mu, \sigma^2)$
Densité : $f_X(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left(-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2\right)$
$E[X] = \mu$, $Var(X) = \sigma^2$.

**Loi normale centrée réduite $\mathcal{N}(0, 1)$** :
Si $X \sim \mathcal{N}(\mu, \sigma^2)$, alors $Z = \frac{X-\mu}{\sigma} \sim \mathcal{N}(0, 1)$.

---

## 4. Échantillonnage et Estimation

### Estimateurs
- **Moyenne empirique** : $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$. C'est un estimateur non biaisé de la moyenne: $E[\bar{X}] = m$.
- **Variance empirique** : 
  $S_n^2 = \frac{1}{n} \sum_{i=1}^n (X_i - \bar{X})^2$ est biaisé ($E[S_n^2] = \frac{n-1}{n}\sigma^2$).
  Pour avoir un estimateur sans biais, on divise par $n-1$.

### Maximum de Vraisemblance (MLE)
Quelle valeur du paramètre $\theta$ rend les données observées les plus probables ?
Vraisemblance : $L(\theta) = \prod_{i=1}^n f(X_i | \theta)$
Log-vraisemblance : $\ell(\theta) = \sum_{i=1}^n \log f(X_i | \theta)$
**Estimateur MLE** : $\hat{\theta}_{MLE} = \arg\max_\theta \ell(\theta)$

Pour la loi normale (maximisation de $\ell(m)$) : $\hat{m}_{MLE} = \bar{X}$.

### Intervalles de Confiance
Encadrer la vraie valeur du paramètre avec une probabilité fixée (ex: $1-\alpha = 95\%$).
Si $X_i \sim \mathcal{N}(m, \sigma^2)$, alors $Z = \frac{\bar{X} - m}{\sigma / \sqrt{n}} \sim \mathcal{N}(0, 1)$.
Intervalle de confiance pour $m$ :
$$IC_{1-\alpha} = \left[ \bar{X} - z_{\alpha/2}\frac{\sigma}{\sqrt{n}}, \bar{X} + z_{\alpha/2}\frac{\sigma}{\sqrt{n}} \right]$$

### Tests d'Hypothèses
Permet de décider entre une hypothèse nulle $H_0$ et alternative $H_1$.
Étapes d'un test :
1. Formuler $H_0$ et $H_1$
2. Choisir le niveau $\alpha$
3. Calculer la statistique de test
4. Déterminer la région critique
5. Prendre une décision (rejeter ou ne pas rejeter $H_0$)
