import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle("Это урок по теме: Не должно тебя ебать")
        .setDescription("Документация по API: Не должно тебя ебать")
        .setVersion("1.0.0")
        .addTag('JONI GANDON TV')
        .build()
    const documet = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup("/api/docs", app, documet)

    await app.listen(PORT, () => {
        console.log(`Server started on port = ${PORT}`);
    })
}

start()