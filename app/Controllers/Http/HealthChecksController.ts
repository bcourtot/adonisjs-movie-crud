import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

export default class HealthChecksController {

  public async health ({ view }: HttpContextContract) {
    const report = await HealthCheck.getReport()

    return view.render('health/status', {
      report
    })
  }

}
