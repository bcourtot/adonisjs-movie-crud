import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from 'App/Models/Movie'


export default class MoviesController {

  async index ({ view, auth }: HttpContextContract) {
    const movies = await Movie.all()

    await auth.use('web').authenticate()

    // ✅ Request authenticated
    console.log(auth.user!)

    return view.render('movies/index', {
      movies
    })
  }

  async show ({ params, view }: HttpContextContract) {
    const movie = await Movie.findOrFail(params.id)

    return view.render('movies/show', {
      movie
    })
  }

  async create ({ view }) {
    return view.render('movies/create')
  }

  async store ({ request, response }) {
    const movie = new Movie()

    movie.name = request.input('name'),
    movie.genre = request.input('genre'),
    movie.year = request.input('year'),
    movie.director = request.input('director'),

    await movie.save()

    return response.redirect().toRoute('home')
  }

  async edit ({ params, view }) {
    const movie = await Movie.find(params.id)


    return view.render('movies/edit', {
      movie
    })
  }

  async update ({ params, request, response }) {
    const movie = await Movie.findOrFail(params.id)

    movie.name = request.input('name'),
    movie.genre = request.input('genre'),
    movie.year = request.input('year'),
    movie.director = request.input('director'),

    await movie.save()

    return response.redirect().toRoute('home')
  }

  async destroy ({ params, response }: HttpContextContract) {
    const movie = await Movie.findOrFail(params.id)
    await movie.delete()

    return response.redirect().toRoute('home')
  }
}
