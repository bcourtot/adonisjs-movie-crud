/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'MoviesController.index').as('home')
Route.get('/health', 'HealthChecksController.health').as('health')

Route.get('/register', 'AuthController.registerShow').as('register')
Route.post('/register', 'AuthController.register').as('auth.register')
Route.get('/login', 'AuthController.loginShow').as('login')
Route.post('/login', 'AuthController.login').as('auth.login')
Route.get('/logout', 'AuthController.logout').as('logout')

Route.group(() => {
  Route.group(() => {
    Route.get('/create', 'MoviesController.create').as('movie.create')
    Route.post('/store', 'MoviesController.store').as('movie.store')
    Route.get('/edit/:id/', 'MoviesController.edit').as('movie.edit')
    Route.post('/update/:id/', 'MoviesController.update').as('movie.update')
    Route.get('/delete/:id/', 'MoviesController.destroy').as('movie.destroy')
}).middleware('auth:web')
  Route.get('/show/:id/', 'MoviesController.show').as('movie.show')
}).prefix('/movies')



