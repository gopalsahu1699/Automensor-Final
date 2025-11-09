// lib/appwrite.js
"use client";

import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // e.g., 'https://fra.cloud.appwrite.io/v1'
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database IDs
export const PRODUCT_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_DATABASE_ID;
export const PRODUCT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID;
export const MARKET_NEED_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const MARKET_NEED_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

// Fetch products
export async function getProducts() {
  try {
    const response = await databases.listDocuments(
      PRODUCT_DATABASE_ID,
      PRODUCT_COLLECTION_ID
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Fetch market needs
export async function getMarketNeeds() {
  try {
    const response = await databases.listDocuments(
      MARKET_NEED_DATABASE_ID,
      MARKET_NEED_COLLECTION_ID
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching market needs:', error);
    throw error;
  }
}

export default client;
