---
module: 1
seance: 1
titre: "Introduction au Cloud Computing"
description: "Modèles de service, providers, économie du cloud. IaaS, PaaS, SaaS."
duree: "3h"
niveau: "fondamental"
date: 2025-02-10
outils: []
tp_associe: "tp-01-vps-deploy"
draft: false
---
Le *cloud computing* désigne la mise à disposition de ressources informatiques via Internet, à la demande et selon un modèle de facturation à l'usage.

## Modèles de déploiement
On distingue quatre modèles de déploiement selon le niveau de partage et de contrôle de l'infrastructure : public, privé, hybride et multi-cloud.

## Les trois modèles de service
### IAAS — INFRASTRUCTURE AS A SERVICE
Le fournisseur gère le matériel physique, la virtualisation et le réseau. Le client contrôle le système d'exploitation, le middleware et les applications.

```terraform
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  # Tags pour organiser les ressources
  tags = {
    Name        = "gl-cloud-demo"
    Environment = "cours"
  }
}
```

### PAAS — PLATFORM AS A SERVICE
Le fournisseur prend en charge l'infrastructure et le middleware. Le client se concentre uniquement sur le code et les données applicatives.
