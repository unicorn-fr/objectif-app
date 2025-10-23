import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getTachesByObjectifId, createTache, db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const objectifId = searchParams.get('objectifId');

    if (!objectifId) {
      return NextResponse.json(
        { error: 'ObjectifId requis' },
        { status: 400 }
      );
    }

    const objectif = db.objectifs.find(o => o.id === objectifId && o.userId === user.id);

    if (!objectif) {
      return NextResponse.json(
        { error: 'Objectif non trouvé' },
        { status: 404 }
      );
    }

    const taches = await getTachesByObjectifId(objectifId);

    return NextResponse.json({ taches });
  } catch (error) {
    console.error('Erreur de récupération des tâches:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { objectifId, titre, description, priorite, dateEcheance } = await request.json();

    if (!objectifId || !titre) {
      return NextResponse.json(
        { error: 'ObjectifId et titre requis' },
        { status: 400 }
      );
    }

    const objectif = db.objectifs.find(o => o.id === objectifId && o.userId === user.id);

    if (!objectif) {
      return NextResponse.json(
        { error: 'Objectif non trouvé' },
        { status: 404 }
      );
    }

    const tache = await createTache({
      objectifId,
      titre,
      description,
      priorite: priorite || 'moyenne',
      estComplete: false,
      dateEcheance: dateEcheance ? new Date(dateEcheance) : undefined,
    });

    return NextResponse.json({ tache });
  } catch (error) {
    console.error('Erreur de création de tâche:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
