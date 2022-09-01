import { DateTime } from 'luxon'
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'


export default class Movie extends BaseModel {


  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public genre: string

  @column()
  public director: string

  @column.dateTime({
    serialize: (value) => value.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  })
  public year: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
