import { Router, Request, Response } from 'express';

const router = Router();

export const OPENAPI_SPEC = {
  openapi: '3.0.3',
  info: {
    title: 'SHERO: The Safety Quest API',
    version: '1.0.0',
    description:
      'Backend REST API for SHERO: The Safety Quest, a branching 12-mission women\'s safety and empowerment educational game.'
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local Development Server'
    }
  ],
  paths: {
    '/api/v1/players/guest': {
      post: {
        summary: 'Create or restore an anonymous guest session',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  guestToken: { type: 'string' },
                  displayName: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Guest player profile created or retrieved' }
        }
      }
    },
    '/api/v1/players/me': {
      get: {
        summary: 'Get current player profile',
        responses: { '200': { description: 'Player profile' } }
      },
      patch: {
        summary: 'Update current player display name',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['displayName'],
                properties: { displayName: { type: 'string' } }
              }
            }
          }
        },
        responses: { '200': { description: 'Updated profile' } }
      }
    },
    '/api/v1/missions': {
      get: {
        summary: 'List all 12 canonical missions with localized metadata and player progress',
        parameters: [
          { name: 'lang', in: 'query', schema: { type: 'string', enum: ['en', 'hi'] } }
        ],
        responses: { '200': { description: 'List of missions' } }
      }
    },
    '/api/v1/missions/{idOrSlug}': {
      get: {
        summary: 'Get detailed mission specification and ordered scene outlines',
        parameters: [
          { name: 'idOrSlug', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'lang', in: 'query', schema: { type: 'string', enum: ['en', 'hi'] } }
        ],
        responses: { '200': { description: 'Mission details' } }
      }
    },
    '/api/v1/gameplay/start': {
      post: {
        summary: 'Start or resume a mission and retrieve the first interactive scene',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['missionId'],
                properties: {
                  missionId: { type: 'string' },
                  lang: { type: 'string', enum: ['en', 'hi'] }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Initial scene and mission context' } }
      }
    },
    '/api/v1/gameplay/choice': {
      post: {
        summary: 'Submit a branching decision choice and receive consequence feedback',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['missionId', 'sceneId', 'choiceId'],
                properties: {
                  missionId: { type: 'string' },
                  sceneId: { type: 'string' },
                  choiceId: { type: 'string' },
                  lang: { type: 'string', enum: ['en', 'hi'] }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Consequence, feedback, and next scene' } }
      }
    },
    '/api/v1/progress': {
      get: {
        summary: 'Retrieve overall player progress, badges, and unlocked achievements',
        parameters: [
          { name: 'lang', in: 'query', schema: { type: 'string', enum: ['en', 'hi'] } }
        ],
        responses: { '200': { description: 'Player progress summary' } }
      }
    },
    '/api/v1/settings': {
      get: {
        summary: 'Retrieve player audio, language, and accessibility preferences',
        responses: { '200': { description: 'Current settings' } }
      },
      put: {
        summary: 'Update preferences',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  language: { type: 'string', enum: ['en', 'hi'] },
                  soundEnabled: { type: 'boolean' },
                  sfxVolume: { type: 'number' },
                  bgmVolume: { type: 'number' },
                  textSpeed: { type: 'string', enum: ['slow', 'normal', 'fast'] }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Updated settings' } }
      }
    },
    '/api/v1/resources': {
      get: {
        summary: 'Retrieve verified emergency and domestic support helplines',
        parameters: [
          { name: 'lang', in: 'query', schema: { type: 'string', enum: ['en', 'hi'] } },
          { name: 'category', in: 'query', schema: { type: 'string' } },
          { name: 'query', in: 'query', schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'List of verified resources' } }
      }
    }
  }
};

// GET /api/v1/docs/openapi.json
router.get('/openapi.json', (req: Request, res: Response) => {
  res.json(OPENAPI_SPEC);
});

// GET /api/v1/docs (Swagger UI)
router.get('/', (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>SHERO API Documentation</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
    body { margin: 0; background: #0f172a; color: #f8fafc; }
    .topbar { display: none !important; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function() {
      SwaggerUIBundle({
        url: '/api/v1/docs/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ]
      });
    }
  </script>
</body>
</html>`);
});

export default router;
