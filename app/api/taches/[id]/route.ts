import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updateTache, db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const data = await request.json();

    const tache = db.taches.find(t => t.id === id);

    if (!tache) {
      return NextResponse.json(
        { error: 'Tâche non trouvée' },
        { status: 404 }
      );
    }

    const objectif = db.objectifs.find(o => o.id === tache.objectifId && o.userId === user.id);

    if (!objectif) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 403 }
      );
    }

    const updatedTache = await updateTache(id, data);

    return NextResponse.json({ tache: updatedTache });
  } catch (error) {
    console.error('Erreur de mise à jour de tâche:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
