import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updateObjectif, deleteObjectif, db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { id } = params;
    const data = await request.json();

    const objectif = db.objectifs.find(o => o.id === id && o.userId === user.id);

    if (!objectif) {
      return NextResponse.json(
        { error: 'Objectif non trouvé' },
        { status: 404 }
      );
    }

    const updatedObjectif = await updateObjectif(id, data);

    return NextResponse.json({ objectif: updatedObjectif });
  } catch (error) {
    console.error('Erreur de mise à jour d\'objectif:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { id } = params;

    const objectif = db.objectifs.find(o => o.id === id && o.userId === user.id);

    if (!objectif) {
      return NextResponse.json(
        { error: 'Objectif non trouvé' },
        { status: 404 }
      );
    }

    await deleteObjectif(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur de suppression d\'objectif:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
