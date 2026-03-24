---
module: 1
seance: 1
titre: "Statistiques et optimisation pour le Machine Learning"
description: "Ce module introduit les bases probabilistes du Machine Learning, les modèles statistiques essentiels et l’optimisation des fonctions de coût"
duree: "3h"
niveau: "fondamental"
date: 2025-02-10
outils: []
tp_associe: "tp-01-vps-deploy"
draft: false
---
Le but de cette seance est de rappeler les concepts fondamentaux de probabilités et de variables aléatoires nécessaires pour le Machine Learning.

## 1. Expérience aléatoire et Probabilités
### Définition
Une **expérience aléatoire** est une expérience dont :
- On connaît les résultats possibles.
- On ne peut pas prévoir le résultat exact à l'avance.

**Exemples :**
- Lancer une pièce
- Lancer un dé
- Mesurer la température demain
- Prédire si un email est Spam

### Espace des résultats
On note $\Omega$ l'ensemble des résultats possibles.
**Exemples :**
- Pièce : $\Omega = \{\text{Pile}, \text{Face}\}$
- Dé : $\Omega = \{1, 2, 3, 4, 5, 6\}$
- Email : $\Omega = \{\text{Spam}, \text{NonSpam}\}$

### Espace probabilisé
Un espace probabilisé est un triplet $(\Omega, \mathcal{F}, P)$ où :
- $\Omega$ : ensemble des issues = L'univers des possibilités
- $\mathcal{F}$ : ensemble des événements
- $P$ : mesure de probabilité

### Les événements
Un **événement** est un sous-ensemble de $\Omega$.
**Exemple (Lancer d'un dé) :**
- $A = \{2, 4, 6\}$ est l'événement : "obtenir un nombre pair".

### Propriétés de la probabilité
La probabilité est une fonction $P : \mathcal{F} \to [0, 1]$ qui vérifie :
1. $P(A) \ge 0$
2. $P(\Omega) = 1$
3. Si $A \cap B = \emptyset$ (événements incompatibles), alors $P(A \cup B) = P(A) + P(B)$

## 2. Probabilité Conditionnelle et Indépendance
### Probabilité conditionnelle
Si $P(B) > 0$ :
$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$
$P(A|B)$ est la probabilité de $A$ sachant que $B$ est (ou sera) réalisé. On restreint l'univers à $B$.
De cette définition, on déduit l'expression de la probabilité de l'intersection :
$$P(A \cap B) = P(A|B) \times P(B)$$

**Exemple (Dé équilibré) :**
- $A$ : "obtenir un nombre pair" $\Rightarrow A = \{2, 4, 6\}$
- $B$ : "obtenir un nombre $> 3$" $\Rightarrow B = \{4, 5, 6\}$
Alors $A \cap B = \{4, 6\}$ et $P(A|B) = \frac{2}{3}$.

### Indépendance
Deux événements $A$ et $B$ sont **indépendants** si :
$$P(A \cap B) = P(A) \times P(B)$$
Ce qui est équivalent à :
$$P(A|B) = P(A)$$
L'indépendance signifie que l'information sur la réalisation de $B$ ne change en rien la probabilité de réalisation de $A$.

**Exemple (Deux lancers de pièce) :**
- $A$ : le premier lancer est Pile
- $B$ : le deuxième lancer est Pile
$P(A \cap B) = \frac{1}{4}$ et $P(A)P(B) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$. Ils sont donc indépendants.

### Probabilité composée
Généralisation à plusieurs événements :
$$P(A_1 \cap \dots \cap A_n) = P(A_1) \prod_{i=2}^n P(A_i | A_1, \dots, A_{i-1})$$

### Théorème des probabilités totales
Soit $\{C_1, C_2, \dots, C_n\}$ une partition de l'univers $\Omega$ ($C_i \cap C_j = \emptyset$ pour $i \ne j$ et $\bigcup_{i=1}^n C_i = \Omega$). Alors pour tout événement $A$ :
$$P(A) = \sum_{i=1}^n P(A \cap C_i) = \sum_{i=1}^n P(A|C_i)P(C_i)$$

### Théorème de Bayes
$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$
Où :
- $P(A)$ : probabilité *a priori*
- $P(A|B)$ : probabilité *a posteriori*
- $P(B)$ : constante de normalisation

**Exemple d'application (Test médical) :**
- Une maladie touche 1% de la population : $P(M) = 0.01$
- Sensibilité (vrais positifs) : $P(+ | M) = 0.9$
- Faux positifs : $P(+ | \bar{M}) = 0.05$

On cherche $P(M | +)$ :
1. Calcul de $P(+)$ via les probabilités totales :
   $P(+) = P(+ | M)P(M) + P(+ | \bar{M})P(\bar{M}) = 0.9 \times 0.01 + 0.05 \times 0.99 = 0.009 + 0.0495 = 0.0585$
2. Application du théorème de Bayes :
   $P(M | +) = \frac{0.9 \times 0.01}{0.0585} = \frac{0.009}{0.0585} \approx 15.4\%$

## 3. Application au Machine Learning : Naive Bayes
### Cas discret général
Pour une partition $(C_1, \dots, C_K)$ représentant des classes et une observation vectorielle $X$ :
$$P(C_k | X) = \frac{P(X|C_k)P(C_k)}{\sum_{j=1}^K P(X|C_j)P(C_j)}$$
La règle de décision consiste à choisir la classe qui maximise cette probabilité :
$$\hat{y} = \arg\max_k P(X|C_k)P(C_k)$$

### Hypothèse d'indépendance conditionnelle (Naive Bayes)
Pour des caractéristiques $X = (X_1, \dots, X_d)$, le modèle *Naive Bayes* fait l'hypothèse très forte que les variables sont indépendantes sachant la classe $C_k$ :
$$P(X|C_k) = \prod_{i=1}^d P(Xi | C_k)$$
La règle de décision finale devient :
$$\hat{y} = \arg\max_k \left( P(C_k) \prod_{i=1}^d P(X_i | C_k) \right) = \arg\max_k \text{Score}(C_k)$$

### Exemple : Classification Spam
On souhaite classifier un message contenant les mots "gratuit" ($X_1$) et "promotion" ($X_2$). On dispose des statistiques d'entraînement :
- $P(\text{Spam}) = 0.4$ et $P(\text{NonSpam}) = 0.6$
- $P(\text{gratuit} | \text{Spam}) = 0.8$ et $P(\text{promotion} | \text{Spam}) = 0.7$
- $P(\text{gratuit} | \text{NonSpam}) = 0.1$ et $P(\text{promotion} | \text{NonSpam}) = 0.2$

**Calcul des scores :**
- $\text{Score(Spam)} = 0.4 \times 0.8 \times 0.7 = 0.224$
- $\text{Score(NonSpam)} = 0.6 \times 0.1 \times 0.2 = 0.012$
Puisque le score du Spam est plus élevé, le classifieur prédit $\hat{y} = \text{Spam}$.

---

## 4. Variables Aléatoires
### Définition
Une **variable aléatoire** est une application $X : \Omega \to \mathbb{R}$ qui associe à chaque issue possible un nombre réel. Le Machine Learning travaille toujours avec des variables numériques.

### Variable aléatoire discrète
$X$ prend un nombre fini ou dénombrable de valeurs $X(\Omega) = \{x_1, \dots, x_i\}$. La loi de probabilité est définie par $P(X = x_i)$ avec $\sum_i P(X = x_i) = 1$.

### Variable aléatoire continue et Densité
Une variable continue admet une **densité de probabilité** $f : \mathbb{R} \to \mathbb{R}$ qui vérifie :
- $f(x) \ge 0 \quad \forall x \in \mathbb{R}$
- $\int_{-\infty}^{+\infty} f(x) dx = 1$

La probabilité qu'une valeur se trouve dans un intervalle est donnée par l'aire sous la courbe :
$$P(a \le X \le b) = \int_{a}^{b} f(x) dx$$

### Espérance (Moyenne théorique)
- Discret : $\mathbb{E}[X] = \sum_i x_i P(X = x_i)$
- Continu : $\mathbb{E}[X] = \int_{-\infty}^{+\infty} x f(x) dx$

**Linéarité de l'espérance** : $\mathbb{E}(aX + bY) = a\mathbb{E}(X) + b\mathbb{E}(Y)$

### Variance et Écart-type
La variance mesure la dispersion des données autour de la moyenne. C'est fondamental pour comprendre le risque de *surapprentissage* (overfitting).
$$\text{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$$
L'écart-type est $\sigma_X = \sqrt{\text{Var}(X)}$.

**Propriétés de la variance** :
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$
- $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ (si $X$ et $Y$ sont indépendantes)

### Covariance et Corrélation
La covariance mesure la variation conjointe entre $X$ et $Y$ :
$$\text{Cov}(X,Y) = \mathbb{E}[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])]$$
- $\text{Cov}(X,Y) > 0$ : relation croissante
- $\text{Cov}(X,Y) < 0$ : relation décroissante

La **corrélation** normalise cette mesure pour refléter la force de la relation :
$$\rho(X,Y) = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$$
($\rho \in [-1, 1]$, où $\approx 1$ indique une très forte corrélation). En Machine Learning, ces concepts sont essentiels pour la sélection de variables (feature selection) ou la réduction de dimensionnalité (ex: PCA).

## 5. Lois de probabilité classiques
### Loi de Bernoulli $\mathcal{B}(p)$
Pour une classification binaire $X \in \{0, 1\}$ avec probabilité de succès $p$.
- $\mathbb{E}[X] = p$
- $\text{Var}(X) = p(1-p)$

### Loi Binomiale $\mathcal{B}(n, p)$
Somme de $n$ variables de Bernoulli indépendantes (nombre de succès sur $n$ essais).
- $\mathbb{E}[X] = np$
- $\text{Var}(X) = np(1-p)$

### Loi Normale (Gaussienne) $\mathcal{N}(\mu, \sigma^2)$
Loi continue fondamentale en forme de cloche, définie par la moyenne $\mu$ et l'écart-type $\sigma$.
$$f_X(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2\right)$$

**Loi normale centrée réduite $\mathcal{N}(0,1)$**
Si $X \sim \mathcal{N}(\mu, \sigma^2)$, alors la transformation $Z = \frac{X - \mu}{\sigma}$ nous donne une loi centrée sur 0 et de variance 1. C'est essentiel pour ramener les calculs de probabilités sur certaines plages de valeurs (ex : standardisation des données `StandardScaler` en ML).
