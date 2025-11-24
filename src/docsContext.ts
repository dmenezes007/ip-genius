// src/docsContext.ts
import { knowledgeBase } from './knowledge';

/**
 * Returns the knowledge base content.
 * This is an async function to align with potential future implementations 
 * where fetching context might be an asynchronous operation (e.g., from a remote API).
 */
export const getDocumentsContext = async (): Promise<string> => {
  return Promise.resolve(knowledgeBase);
};
