const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Simulador de Rendimientos API',
        version: '1.0.0',
        description: 'API para gestionar bancos, tasas de interés y simulaciones de rendimientos.',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Servidor de desarrollo',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Bank: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    address: { type: 'string' },
                    contact: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            InterestRate: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    bankId: { type: 'integer' },
                    annualPercentage: { type: 'number' },
                    lastModified: { type: 'string', format: 'date-time' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    role: { type: 'string', enum: ['USER', 'ADMIN'] },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            Log: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    action: { type: 'string' },
                    userId: { type: 'integer' },
                    previousData: { type: 'string' },
                    newData: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    paths: {
        '/banks': {
            get: {
                summary: 'Obtener todos los bancos',
                tags: ['Banks'],
                responses: {
                    200: {
                        description: 'Lista de bancos',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Bank' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Crear un banco',
                tags: ['Banks'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Bank',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Banco creado',
                    },
                },
            },
        },
        '/banks/{id}': {
            get: {
                summary: 'Obtener un banco por ID',
                tags: ['Banks'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID del banco',
                        schema: { type: 'integer' },
                    },
                ],
                responses: {
                    200: {
                        description: 'Banco encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Bank' },
                            },
                        },
                    },
                    404: {
                        description: 'Banco no encontrado',
                    },
                },
            },
            put: {
                summary: 'Actualizar un banco',
                tags: ['Banks'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID del banco',
                        schema: { type: 'integer' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Bank',
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Banco actualizado',
                    },
                },
            },
            delete: {
                summary: 'Eliminar un banco',
                tags: ['Banks'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID del banco',
                        schema: { type: 'integer' },
                    },
                ],
                responses: {
                    204: {
                        description: 'Banco eliminado',
                    },
                },
            },
        },
        '/interest-rates': {
            get: {
                summary: 'Obtener todas las tasas de interés',
                tags: ['InterestRates'],
                responses: {
                    200: {
                        description: 'Lista de tasas de interés',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/InterestRate' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Crear una tasa de interés',
                tags: ['InterestRates'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/InterestRate',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Tasa de interés creada',
                    },
                },
            },
        },
        '/interest-rates/{id}': {
            get: {
                summary: 'Obtener una tasa de interés por ID',
                tags: ['InterestRates'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID de la tasa de interés',
                        schema: { type: 'integer' },
                    },
                ],
                responses: {
                    200: {
                        description: 'Tasa de interés encontrada',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/InterestRate' },
                            },
                        },
                    },
                    404: {
                        description: 'Tasa de interés no encontrada',
                    },
                },
            },
            put: {
                summary: 'Actualizar una tasa de interés',
                tags: ['InterestRates'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID de la tasa de interés',
                        schema: { type: 'integer' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/InterestRate',
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Tasa de interés actualizada',
                    },
                },
            },
            delete: {
                summary: 'Eliminar una tasa de interés',
                tags: ['InterestRates'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID de la tasa de interés',
                        schema: { type: 'integer' },
                    },
                ],
                responses: {
                    204: {
                        description: 'Tasa de interés eliminada',
                    },
                },
            },
        },

        '/users/login': {
            post: {
                summary: 'Iniciar sesión',
                tags: ['Users'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    password: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Inicio de sesión exitoso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/users/register': {
            post: {
                summary: 'Registrar usuario',
                tags: ['Users'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    password: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Usuario registrado',
                    },
                },
            },
        },
        '/simulation/simulate': {
            post: {
                summary: 'Simular rendimientos',
                tags: ['Simulation'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    bankId: { type: 'integer' },
                                    principal: { type: 'number' },
                                    years: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Simulación exitosa',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        bankId: { type: 'integer' },
                                        principal: { type: 'number' },
                                        years: { type: 'integer' },
                                        earnings: { type: 'number' },
                                        finalAmount: { type: 'number' },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Error en la simulación',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        error: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        '/logs': {
            get: {
                summary: 'Obtener todos los logs',
                tags: ['Logs'],
                responses: {
                    200: {
                        description: 'Lista de logs',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Log' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default swaggerDocument;
