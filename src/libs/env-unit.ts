import * as dotenv from 'dotenv';
import * as path from 'path';

console.log('__dirname: ', __dirname);
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.resolve(__dirname, '../../src/.env') });
} else {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

/**
 * 格式化环境变量
 * @param key 环境变量的键值
 * @param defaultValue 默认值
 * @param callback 格式化函数
 */
const formatValue = <T>(
  key: string,
  defaultValue: T,
  callback: (value: string) => T,
): T => {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  return callback(value);
};

export const env = (key: string, defaultValue = ''): string =>
  formatValue(key, defaultValue, (value) => value);

export const envNumber = (key: string, defaultValue = 0): number =>
  formatValue(key, defaultValue, (value) => Number(value));

export const envBoolean = (key: string, defaultValue = false): boolean =>
  formatValue(key, defaultValue, (value) => value === 'true');
