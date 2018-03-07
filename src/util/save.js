// @flow

import path from 'path';
import fs from 'fs';
import type { Product } from '../types';

export default function saveInventory(inventory: Array<Product>): boolean {
  const outpath = path.join(__dirname, '..', '..', 'data', 'products.json');
  if (process.env.NODE_ENV === 'test') {
    return false;
  }

  try {
    fs.writeFileSync(outpath, JSON.stringify(inventory, null, '\t'));
    return true;
  } catch (error) {
    return false;
  }
}

export function genId(prod: Product, inv: Array<Product>): number {
  let maxId: number | typeof undefined = inv[0].id;
  inv.slice(1).forEach((item: any = {}) => {
    if (item.id && item.id > maxId) maxId = item.id;
  });
  return maxId + 1;
}
