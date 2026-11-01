import { queryAll } from '../db';
import { cacheService } from './cacheService';

export interface VerifiedResourceDto {
  id: string;
  code: string;
  category: string;
  phone: string;
  secondaryPhone?: string;
  smsNumber?: string;
  website?: string;
  availableHours: string;
  isVerified: boolean;
  nationalPriority: number;
  name: string;
  description: string;
  address?: string;
  stepsToAccess: string;
}

export function getVerifiedResources(lang = 'en', category?: string, query?: string): VerifiedResourceDto[] {
  const cacheKey = `resources_${lang}_${category || 'all'}_${query || 'all'}`;
  const cached = cacheService.get<VerifiedResourceDto[]>(cacheKey);
  if (cached) return cached;

  const rows = queryAll<any>(
    `SELECT r.id, r.code, r.category, r.phone, r.secondary_phone as secondaryPhone,
            r.sms_number as smsNumber, r.website, r.available_hours as availableHours,
            r.is_verified as isVerified, r.national_priority as nationalPriority,
            t.name, t.description, t.address, t.steps_to_access as stepsToAccess
     FROM safety_resources r
     LEFT JOIN safety_resource_translations t ON t.resource_id = r.id AND t.lang = ?
     ORDER BY r.national_priority ASC, r.code ASC`,
    [lang]
  );

  let results: VerifiedResourceDto[] = rows.map(r => ({
    id: r.id,
    code: r.code,
    category: r.category,
    phone: r.phone,
    secondaryPhone: r.secondaryPhone || undefined,
    smsNumber: r.smsNumber || undefined,
    website: r.website || undefined,
    availableHours: r.availableHours,
    isVerified: Boolean(r.isVerified),
    nationalPriority: Number(r.nationalPriority),
    name: r.name || r.code,
    description: r.description || '',
    address: r.address || undefined,
    stepsToAccess: r.stepsToAccess || ''
  }));

  if (category) {
    results = results.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.phone.includes(q)
    );
  }

  cacheService.set(cacheKey, results, 10 * 60 * 1000);
  return results;
}
