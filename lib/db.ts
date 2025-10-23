// Simulation de base de données en mémoire
// Dans une vraie app, utilisez Prisma, MongoDB, PostgreSQL, etc.

import bcrypt from 'bcryptjs';
import { User, Objectif, Tache } from './types';

// Base de données simulée
export const db = {
  users: [] as (User & { password: string })[],
  objectifs: [] as Objectif[],
  taches: [] as Tache[],
};

// Utilisateur de test
const hashedPassword = bcrypt.hashSync('password123', 10);
db.users.push({
  id: '1',
  email: 'demo@objectif.app',
  name: 'Utilisateur Demo',
  password: hashedPassword,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Fonctions utilitaires
export async function findUserByEmail(email: string) {
  return db.users.find(u => u.email === email);
}

export async function createUser(email: string, name: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: Math.random().toString(36).substring(7),
    email,
    name,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  db.users.push(user);
  return user;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function getObjectifsByUserId(userId: string) {
  return db.objectifs.filter(o => o.userId === userId);
}

export async function createObjectif(data: Omit<Objectif, 'id' | 'createdAt' | 'updatedAt'>) {
  const objectif: Objectif = {
    ...data,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  db.objectifs.push(objectif);
  return objectif;
}

export async function updateObjectif(id: string, data: Partial<Objectif>) {
  const index = db.objectifs.findIndex(o => o.id === id);
  if (index !== -1) {
    db.objectifs[index] = { ...db.objectifs[index], ...data, updatedAt: new Date() };
    return db.objectifs[index];
  }
  return null;
}

export async function deleteObjectif(id: string) {
  const index = db.objectifs.findIndex(o => o.id === id);
  if (index !== -1) {
    db.objectifs.splice(index, 1);
    return true;
  }
  return false;
}

export async function getTachesByObjectifId(objectifId: string) {
  return db.taches.filter(t => t.objectifId === objectifId);
}

export async function createTache(data: Omit<Tache, 'id' | 'createdAt' | 'updatedAt'>) {
  const tache: Tache = {
    ...data,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  db.taches.push(tache);
  return tache;
}

export async function updateTache(id: string, data: Partial<Tache>) {
  const index = db.taches.findIndex(t => t.id === id);
  if (index !== -1) {
    db.taches[index] = { ...db.taches[index], ...data, updatedAt: new Date() };
    return db.taches[index];
  }
  return null;
}
