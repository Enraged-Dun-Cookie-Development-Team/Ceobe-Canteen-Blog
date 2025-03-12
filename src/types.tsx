export interface CeobeResponseType<T> {
  code: string
  message: string
  data: T
}

export interface DataSourceType {
  nickname: string
  avatar: string
  unique_id: string
  jump_url: string
  platform: string
  datasource: string
  db_unique_key: string
}
