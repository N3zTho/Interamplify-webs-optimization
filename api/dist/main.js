"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const authenticated_socket_adapter_1 = require("./base/adapters/authenticated-socket.adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useWebSocketAdapter(new authenticated_socket_adapter_1.AuthenticatedSocketAdapter(app));
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
    });
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.listen(3003);
}
bootstrap();
//# sourceMappingURL=main.js.map