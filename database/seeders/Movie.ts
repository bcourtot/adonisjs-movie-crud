import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Movie from 'App/Models/Movie'


export default class extends BaseSeeder {
  public async run () {
    await Movie.createMany([
      {
        name: 'Jurassic Park',
        // year n'est pas un DateTime mais je n'ai pas trouvé d'autre solution pour ce problème
        year: '1993-05-30',
        genre: 'Sci-Fi',
        director: 'Steveen Spielberg',
      },
      {
        name: 'Star Wars',
        year: '2012-12-12',
        genre: 'Sci-Fi',
        director: 'Georges Lucas',
      },
    ])
  }
}
