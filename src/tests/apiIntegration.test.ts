/**
 * SHERO: The Safety Quest — API Integration Test Suite
 * Validates REST v1 endpoints, security headers, guest session flow, and admin guards
 * using Node.js native fetch.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Server } from 'http';
import app from '../../server/src/index';
import { initDatabase } from '../../server/src/db';

let server: Server;
let baseUrl: string;

describe('REST API v1 Integration Tests', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await initDatabase();
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const addr = server.address();
        if (addr && typeof addr === 'object') {
          baseUrl = `http://localhost:${addr.port}`;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  describe('GET /api/health', () => {
    it('returns health check status ok and security headers', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('ok');
      expect(data.game).toBe('SHERO: The Safety Quest');
      expect(res.headers.get('x-content-type-options')).toBe('nosniff');
      expect(res.headers.get('x-frame-options')).toBe('SAMEORIGIN');
    });
  });

  describe('GET /api/v1/docs/openapi.json', () => {
    it('returns OpenAPI 3.0 specification JSON', async () => {
      const res = await fetch(`${baseUrl}/api/v1/docs/openapi.json`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.openapi).toBe('3.0.3');
      expect(data.info.title).toContain('SHERO');
      expect(data.paths['/api/v1/missions']).toBeDefined();
      expect(data.paths['/api/v1/gameplay/start']).toBeDefined();
    });
  });

  describe('Player Guest Lifecycle: /api/v1/players', () => {
    let guestToken: string;
    let playerId: string;

    it('POST /guest creates an anonymous session', async () => {
      const res = await fetch(`${baseUrl}/api/v1/players/guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: 'Devi' })
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.player.displayName).toBe('Devi');
      expect(data.player.guestToken).toBeTruthy();

      guestToken = data.player.guestToken;
      playerId = data.player.id;
    });

    it('GET /me retrieves profile using x-guest-token header', async () => {
      const res = await fetch(`${baseUrl}/api/v1/players/me`, {
        headers: { 'x-guest-token': guestToken }
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.player.id).toBe(playerId);
      expect(data.player.displayName).toBe('Devi');
    });

    it('PATCH /me updates display name', async () => {
      const res = await fetch(`${baseUrl}/api/v1/players/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-token': guestToken
        },
        body: JSON.stringify({ displayName: 'Ananya Defender' })
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.player.displayName).toBe('Ananya Defender');
    });
  });

  describe('Missions Directory: /api/v1/missions', () => {
    it('GET / returns 12 published missions in English and Hindi', async () => {
      const resEn = await fetch(`${baseUrl}/api/v1/missions?lang=en`);
      expect(resEn.status).toBe(200);
      const dataEn = await resEn.json();
      expect(dataEn.count).toBe(12);
      expect(dataEn.missions[0].title).toBe('The Last Bus Stop');

      const resHi = await fetch(`${baseUrl}/api/v1/missions?lang=hi`);
      expect(resHi.status).toBe(200);
      const dataHi = await resHi.json();
      expect(dataHi.count).toBe(12);
      expect(dataHi.missions[0].title).toBe('अंतिम बस स्टॉप');
    });

    it('GET /:idOrSlug returns mission details and scene outlines', async () => {
      const res = await fetch(`${baseUrl}/api/v1/missions/the-last-bus-stop?lang=en`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.mission.number).toBe(1);
      expect(data.mission.scenes.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Gameplay Flow: /api/v1/gameplay', () => {
    it('POST /start initiates mission and returns formatted scene with token interpolation', async () => {
      const guestRes = await fetch(`${baseUrl}/api/v1/players/guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: 'Meera' })
      });
      const guestData = await guestRes.json();
      const token = guestData.player.guestToken;

      const startRes = await fetch(`${baseUrl}/api/v1/gameplay/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-token': token
        },
        body: JSON.stringify({ missionId: 'the-last-bus-stop', lang: 'en' })
      });

      expect(startRes.status).toBe(200);
      const startData = await startRes.json();
      expect(startData.scene.narrativeText).toContain('Meera');
      expect(startData.scene.choices.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Settings & Resources: /api/v1/settings & /api/v1/resources', () => {
    it('GET & PUT /api/v1/settings updates user sound and language preferences', async () => {
      const guestRes = await fetch(`${baseUrl}/api/v1/players/guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: 'Kavya' })
      });
      const guestData = await guestRes.json();
      const token = guestData.player.guestToken;

      const putRes = await fetch(`${baseUrl}/api/v1/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-token': token
        },
        body: JSON.stringify({ language: 'hi', sfxVolume: 90, soundEnabled: true })
      });

      expect(putRes.status).toBe(200);
      const putData = await putRes.json();
      expect(putData.settings.language).toBe('hi');
      expect(putData.settings.sfxVolume).toBe(90);
    });

    it('GET /api/v1/resources returns verified directory', async () => {
      const res = await fetch(`${baseUrl}/api/v1/resources?lang=en`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.count).toBeGreaterThanOrEqual(8);
      const res112 = data.resources.find((r: any) => r.phone === '112');
      expect(res112).toBeDefined();
    });
  });

  describe('Admin Guard: /api/v1/admin', () => {
    it('rejects access without valid x-admin-key', async () => {
      const res = await fetch(`${baseUrl}/api/v1/admin/missions`);
      expect(res.status).toBe(403);
    });

    it('grants access with valid x-admin-key', async () => {
      const res = await fetch(`${baseUrl}/api/v1/admin/missions`, {
        headers: { 'x-admin-key': 'shero_admin_secret_key_2026' }
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.count).toBe(12);
    });
  });
});
