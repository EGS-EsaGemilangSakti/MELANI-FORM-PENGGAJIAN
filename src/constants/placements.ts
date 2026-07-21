export const PLACEMENTS = ['SHOPEE EXPRESS', 'WAHANA EXPRESS'] as const;

export const WAHANA_EMPLOYMENT_STATUSES = ['Daily Worker', 'DWO', 'DEDICATED'] as const;
export const SHOPEE_EMPLOYMENT_STATUSES = ['Daily Worker (DW)', 'Dedicated'] as const;
export const SHOPEE_POSITIONS = [
  'OPERATOR DEDICATED',
  'TRACER ADMIN',
  'OPERATOR CACHE',
  'OPERATOR EHA',
  'MM ADMIN',
  'ADMIN SPV',
  'SHIFTLEAD/HUBLEAD/CAPTAIN',
  'SPRINTER DROP OFF',
  'DELIVERY SUPPORT ADMIN',
  'TRACER ADMIN EHA',
  'CT MONITORING ADMIN',
  'SPG',
  'MM ADMIN SUPPORT',
  'TEAM MAINTENANCE POOL OFFICER',
  'MM COORDINATOR',
  'VEHICLE MAINTENANCE & LAKA',
  'DRIVER INTRAHUB',
  'Daily Worker',
] as const;
export const WAHANA_POSITIONS = ['Shorter'] as const;
export const EMPLOYMENT_STATUSES = [...WAHANA_EMPLOYMENT_STATUSES, ...SHOPEE_EMPLOYMENT_STATUSES] as const;
export const POSITIONS = [...WAHANA_POSITIONS, ...SHOPEE_POSITIONS] as const;
export const DIVISIONS = ['LM', 'FM', 'SOC', 'MM', 'INV', 'DS', 'SM', 'RETURN', 'FLEET', 'SERVICE POINT'] as const;
export const OWNERSHIP_STATUSES = ['PRIBADI', 'ORANG LAIN'] as const;
export const EMERGENCY_RELATIONSHIPS = ['Saudara Kandung', 'Saudara', 'Ibu', 'Ayah'] as const;
