import { Redis } from '@upstash/redis';

/**
 * Professional Note: 
 * UPSTASH_REDIS_REST_URL  UPSTASH_REDIS_REST_TOKEN
 */

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  if (process.env.NODE_ENV === 'development') {
    console.warn("⚠️ Redis variables are missing. Caching will not work locally.");
  }
}

export const redis = Redis.fromEnv();

