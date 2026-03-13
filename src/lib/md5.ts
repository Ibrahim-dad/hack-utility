// Wrapper around md5 package
import md5 from "md5";

export function generateMd5(input: string): string {
  return md5(input);
}
