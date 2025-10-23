import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getObjectifsByUserId, createObjectif } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const objectifs = await getObjectifsByUserId(user.id);

    return NextResponse.json({ objectifs });
  } catch (error) {
    console.error('Erreur de récupération des objectifs:', error);
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

    const { titre, description, situationActuelle, dateFinEstimee } = await request.json();

    if (!titre || !situationActuelle) {
      return NextResponse.json(
        { error: 'Titre et situation actuelle requis' },
        { status: 400 }
      );
    }

    const objectif = await createObjectif({
      userId: user.id,
      titre,
      description: description || '',
      situationActuelle,
      dateDebut: new Date(),
      dateFinEstimee: dateFinEstimee ? new Date(dateFinEstimee) : new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
      progression: 0,
      statut: 'en_cours',
    });

    return NextResponse.json({ objectif });
  } catch (error) {
    console.error('Erreur de création d\'objectif:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
