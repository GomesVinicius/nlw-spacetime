import cors from '@fastify/cors'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(memoriesRoutes)

app.register(cors, {
  origin: true,
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('👩‍💻 Server')
  })
