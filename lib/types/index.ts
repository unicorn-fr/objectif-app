// Types pour l'application

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Objectif {
  id: string;
  userId: string;
  titre: string;
  description: string;
  situationActuelle: string;
  dateDebut: Date;
  dateFinEstimee: Date;
  progression: number;
  statut: 'en_cours' | 'termine' | 'abandonne';
  createdAt: Date;
  updatedAt: Date;
}

export interface Tache {
  id: string;
  objectifId: string;
  titre: string;
  description?: string;
  estComplete: boolean;
  priorite: 'basse' | 'moyenne' | 'haute';
  dateEcheance?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Statistique {
  totalObjectifs: number;
  objectifsTermines: number;
  objectifsEnCours: number;
  totalTaches: number;
  tachesCompletes: number;
  tauxReussite: number;
  joursActifs: number;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}
