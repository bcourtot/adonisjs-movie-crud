import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'


export default class AuthController {

  async registerShow({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  async login({ auth, request, response }: HttpContextContract) {

    const email = request.input('email')
    const password = request.input('password')


    await auth.use('web').attempt(email, password)

    return response.redirect().toRoute('home')
  }

  async register({ auth, request, response }: HttpContextContract) {

    const validations = schema.create({
      email: schema.string([
        rules.email()
      ]),
      password: schema.string([
        rules.confirmed(),
        rules.minLength(4)
      ])})

    try {
      /**
       * Step 2 - Validate request body against
       *          the schema
       */
      const payload = await request.validate({
        schema: validations
      })

      await User.create(payload)
      await auth.use('web').attempt(payload.email, payload.password)

      return response.redirect().toRoute('home')
    } catch (error) {
      /**
       * Step 3 - Handle errors
       */
      response.badRequest(error.messages)
    }
  }

  public async logout({ auth, response }: HttpContextContract) {

    await auth.use('web').logout()
    response.redirect().toRoute('home')
  }


}


